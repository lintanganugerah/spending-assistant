const OpenAI = require("openai");
const config = require("@config/index.config");
const sendEvent = require("@utils/sendEventSSE.utils");
const logger = require("@library/logger/logger.library");
const { v4: uuidv4 } = require("uuid");

const client = new OpenAI({
  baseURL: config.ai.url,
  apiKey: config.ai.apiKey,
  timeout: 15000, //15s or 15k ms,
  provider: {
    sort: "price",
    data_collection: "deny",
  },
});

async function streamResponseModel(
  res,
  chatID,
  agentModel,
  agentName,
  systemPrompt,
  structureOutput = null,
  userPrompt
) {
  let finalMessage,
    chunkMessage,
    finalReasoning,
    chunkReasoning,
    sentEventStatus = false;
  const responseID = uuidv4();

  const timeout = setTimeout(() => {
    throw new Error("Model Timedout");
  }, 15000);

  try {
    const completionStream = await client.chat.completions.create({
      model: agentModel,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: structureOutput,
      usage: {
        include: true,
      },
      reasoning: {
        include_reasoning: true,
        max_tokens: 600,
      },
      stream: true,
    });

    sendEvent(res, "start", {
      agent: agentName,
      type: "agent_process",
      message: "Message Successfully Sent. Waiting Agents to response",
    });

    logger.info(
      `ID ${responseID} | Chat_ID : ${chatID} | Message sent. Waiting ${agentName} agent to response`
    );

    for await (const chunk of completionStream) {
      const content = chunk.choices[0]?.delta?.content || "";
      const reasoning = chunk.choices[0]?.delta?.reasoning || "";
      if (!content && !reasoning) continue;

      finalMessage += content;
      finalReasoning += reasoning;
      chunkReasoning += reasoning;

      if (chunk.usage) {
        logger.info(
          `ID ${responseID} | Chat_ID : ${chatID} | Usage Statistics: \nTotal Tokens: ${chunk.usage.total_tokens} \n Prompt Tokens: ${chunk.usage.prompt_tokens} \n Completion Tokens: ${chunk.usage.completion_tokens} \nCost: ${chunk.usage.cost} credits`
        );
      }

      if (agentName === "main") {
        chunkMessage += content;

        if (chunkMessage.length >= 10) {
          sendEvent(res, "progress_update", {
            agent: agentName,
            type: "response",
            done: false,
            message: `Streaming main agent's response`,
            content: chunkMessage,
          });
          chunkMessage = "";
          clearTimeout(timeout);
        }
      } else if (!sentEventStatus && finalMessage.length > 1) {
        sendEvent(res, "progress_update", {
          agent: agentName,
          type: "response",
          done: false,
          message: `Got the response. Waiting agents to finish streaming response`,
        });
        sentEventStatus = true;
        clearTimeout(timeout);
      }

      if (chunkReasoning.length >= 5) {
        sendEvent(res, "progress_update", {
          agent: agentName,
          type: "reasoning",
          done: false,
          message: `Reasoning Part`,
          content: chunkReasoning,
        });
        chunkReasoning = "";
        clearTimeout(timeout);
      }
    }

    finalMessage = cleanUndefined(finalMessage);
    finalReasoning = cleanUndefined(finalReasoning);

    sendEvent(res, "progress_update", {
      agent: agentName,
      type: "response",
      done: true,
      message: "Response Finished.",
      content: finalMessage,
      reasoning: finalReasoning,
    });
    if (finalReasoning)
      logger.info(
        `ID ${responseID} | Chat_ID : ${chatID} | ${agentName} REASONING : ${finalReasoning}`
      );

    logger.info(
      `ID ${responseID} | Chat_ID : ${chatID} | ${agentName} AGENTS FINAL RESPONSE : ${finalMessage}`
    );

    return finalMessage;
  } catch (error) {
    const abortController = new AbortController();
    abortController.abort();

    if (!res.writableEnded) {
      sendEvent(res, "stop", {
        type: "error",
        message: "Internal Server Error",
        agent: agentName,
      });
      res.end();
    }
    console.error(error);
    throw error;
  }
}

//Dynamicly extract the json from model or ai response.
function extractResponseJson(response) {
  let jsonStr = "";

  //Some models start with ```json. Get just the json format of the response
  if (response.includes("```json")) {
    const start = response.indexOf("```json") + 7;
    const end = response.indexOf("```", start);
    jsonStr = response.substring(start, end).trim();
  } else if (response.includes("{") && response.includes("}")) {
    const start = response.indexOf("{");
    const end = response.lastIndexOf("}");
    jsonStr = response.substring(start, end + 1);
  }

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Gagal parse JSON:", e);
    return null;
  }
}

//LLM response sometimes contain "undefined" in every conversation
function cleanUndefined(response) {
  if (!response) return;
  if (response.startsWith("undefined")) {
    response = response.slice("undefined".length).trim();
  }
  return response;
}

module.exports = { extractResponseJson, streamResponseModel };
