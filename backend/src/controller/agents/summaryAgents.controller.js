/**
 * Responsibility : Give max 1000 tokens summary about user and AI chatting.
 * Models : LLAMA 3.3 70B or other fast yet intelligence models
 */

const config = require("@config/index.config");
const sendEvent = require("@utils/sendEventSSE.utils");
const { streamResponseModel } = require("@utils/responseModel.utils");
const logger = require("@library/logger/logger.library");

const summaryAgentsPrompt = config.prompt.SUMMARY_AGENTS.system;
const summaryAgentsOutput = config.prompt.SUMMARY_AGENTS.structured_output;
const summaryAgentsModel = config.ai.summaryAgentsModel || config.ai.baseModel;

async function getReasoning(chatID, data, mainAgentsResponse, res) {
  try {
    const userPrompt = buildUserPrompt(data, mainAgentsResponse);

    const response = await streamResponseModel(
      res,
      chatID,
      summaryAgentsModel,
      "summary",
      summaryAgentsPrompt,
      summaryAgentsOutput,
      userPrompt
    );

    return response;
  } catch (error) {
    sendEvent(res, "Stop", {
      type: "error",
      message: "Inernal Server Error Occured.",
    });
    console.error(error);
    return res.status(500).end();
  }
}

function buildUserPrompt(data, mainAgentsResponse) {
  if (data.lastChatSummary) {
    return `Summary Chat Sebelumnya : ${data.lastChatSummary}. \n\n Ini adalah percakapan User dan Agents AI : \n\nMessage User : "${data.message}". \n\nResponse Agents AI: "${mainAgentsResponse}"`;
  } else {
    return `Message User : "Barang adalah ${data.product} dengan harga ${
      data.productPrice || "Tidak disertakan user"
    } yang akan dibeli dengan duit dari ${
      data.fundSource
    }. Ini adalah percakapan User dan Agents AI :
    
    \n\nAlasan user ingin membeli barang tersebut : ${
      data.purchaseReason
    }".\n\nResponse Agents AI: ${mainAgentsResponse}`;
  }
}

module.exports = { getReasoning };
