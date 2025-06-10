/**
 * Responsibility : Analize user's prompt what is their emotions. Is user purchase product impulsively or not?
 * Models : Fast thinking capabilites, yet excel at analyzing implicit user prompt emotions. Gemini 2.5 fast / gpt-o3-mini
 */

const config = require("@config/index.config");
const sendEvent = require("@utils/sendEventSSE.utils");
const {
  streamResponseModel,
  extractResponseJson,
} = require("@utils/responseModel.utils");
const { EmotionAgentSchema } = require("@schema/agentResponse.schema");
const logger = require("@library/logger/logger.library");

const emotionsAgentsPrompt = config.prompt.EMOTION_AGENTS.system;
const emotionsAgentsOutput = config.prompt.EMOTION_AGENTS.structured_output;
const emotionsAgentsModel = config.ai.emotionAgentsModel || config.ai.baseModel;

async function getReasoning(chatID, data, res) {
  try {
    let userPrompt = buildUserPrompt(data);

    let attempt = 0;
    const maxTries = config.ai.maxTries;

    while (attempt <= maxTries) {
      attempt++;
      const response = await streamResponseModel(
        res,
        chatID,
        emotionsAgentsModel,
        "emotions",
        emotionsAgentsPrompt,
        emotionsAgentsOutput,
        userPrompt
      );
      const cleaned = extractResponseJson(response);
      // validasi response AI dalam bentuk JSON apakah properti sudah sesuai
      const { value: validated, error } = EmotionAgentSchema.validate(cleaned);

      if (!error) {
        return validated;
      }

      logger.warn(`EMOTIONS AGENTS RESPONSE ERROR : ${error}`);
      userPrompt = `Response anda memiliki error : ${error}. Perbaiki response anda ini dalam JSON format yang sama. Ini adalah reponse anda sebelumnya : ${response}`;
    }

    sendEvent(res, "Stop", {
      type: "error",
      message: `Failed to get valid AI response after ${config.ai.maxTries} attempts.`,
    });

    return res.status(500).end();
  } catch (error) {
    sendEvent(res, "Stop", {
      type: "error",
      message: "Inernal Server Error Occured.",
    });
    console.error(error);
    return res.status(500).end();
  }
}

function buildUserPrompt(data) {
  return `User ingin membeli barang "${data.product}" dengan alasan "${data.purchaseReason}"`;
}

module.exports = { getReasoning };
