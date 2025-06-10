/**
 * Responsibility : Main brain of all agents. Give insight and make final decision. This agents query information are supplied by financial agents and emotion agents
 * Models : Excel at Thinking capabilities. Mainly google gemini 2.5 pro
 */

const config = require("@config/index.config");
const sendEvent = require("@utils/sendEventSSE.utils");
const { streamResponseModel } = require("@utils/responseModel.utils");
const logger = require("@library/logger/logger.library");

const mainAgentsPrompt = config.prompt.MAIN_AGENTS.system;
const mainAgentsOutput = config.prompt.MAIN_AGENTS.structured_output;
const mainAgentsModel = config.ai.mainAgentsModel || config.ai.baseModel;

async function getReasoning(chatID, data, res) {
  try {
    const userPrompt = buildUserPrompt(data);

    const response = await streamResponseModel(
      res,
      chatID,
      mainAgentsModel,
      "main",
      mainAgentsPrompt,
      mainAgentsOutput,
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

function buildUserPrompt(data) {
  if (data.lastChatSummary) {
    return `Summary Chat Sebelumnya : ${data.lastChatSummary}. Message User : "${data.message}"`;
  } else {
    return `Data Finansial dari Agents : ${JSON.stringify(
      data.financialAgents
    )}. Data Emosi dari Agents : ${JSON.stringify(
      data.emotionsAgents
    )}. \n\n Barang adalah ${data.product} dengan harga ${
      data.productPrice || "Tidak disertakan user"
    } yang akan dibeli/sewa/kontrak/keputusan finansial dengan duit dari ${
      data.fundSource
    }`;
  }
}

module.exports = { getReasoning };
