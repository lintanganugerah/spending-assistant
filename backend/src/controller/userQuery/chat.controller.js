const {
  UserNewChatSchema,
  UserContinueChatSchema,
} = require("@schema/chat.schema");
const checkReqBody = require("@utils/checkReqBody.utils");
const financialAgents = require("@controller/agents/financialAgents.controller");
const emotionsAgents = require("@controller/agents/emotionAgents.controller");
const mainAgents = require("@controller/agents/mainAgents.controller");
const summaryAgents = require("@controller/agents/summaryAgents.controller");
const sendEvent = require("@utils/sendEventSSE.utils");
const { v4: uuidv4 } = require("uuid");
const { guestRedis } = require("@database/redis/redis.database");

async function getChatRoom(req, res) {
  //Jika user membuka history chat, maka sertakan id session chat room. Akan mengembalikan semua history chat nya
}

//Akan mengembalikan message hasil AI, dan summary dari chat sebelum + sekarang
async function processChatPrompt(req, res) {
  const dataBody = checkReqBody(req.body);

  let schema, isNew;
  //Sertakan Id chat & summary history sebelumnya jikalau melanjutkan chat. Akan buat baru jika tidak ada summary, dan harus ada product info.
  if (
    (dataBody.chatID && dataBody.lastChatSummary) ||
    dataBody.lastChatSummary
  ) {
    schema = UserContinueChatSchema;
    isNew = false;
  } else [(schema = UserNewChatSchema), (isNew = true)];

  console.log(`${isNew}`);

  const validated = await schema.validateAsync(dataBody, {
    abortEarly: false,
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (isNew) {
    newChatControlFlow(validated, res);
  } else {
    continueChatControlFlow(validated, res);
  }
}

async function newChatControlFlow(data, res) {
  try {
    console.log("Masuk! NewCHAT");
    const chatID = uuidv4();
    sendEvent(res, "start", {
      type: "connection",
      chatID: chatID,
      message: "Connection Established. Processing Agents",
    });
    const [financialAgentsResponse, emotionsAgentsResponse] = await Promise.all(
      [
        financialAgents.getReasoning(chatID, data, res),
        emotionsAgents.getReasoning(chatID, data, res),
      ]
    );
    data = {
      ...data,
      financialAgents: { ...financialAgentsResponse },
      emotionsAgents: { ...emotionsAgentsResponse },
    };
    const mainAgentsResponse = await mainAgents.getReasoning(chatID, data, res);
    const summaryAgentsResponse = await summaryAgents.getReasoning(
      chatID,
      data,
      mainAgentsResponse,
      res
    );
    await guestRedis.set(
      `guest:chat:${chatID}:${data.userID}`,
      `${summaryAgentsResponse}`,
      "EX",
      60 * 60 * 15
    );
    sendEvent(res, "Stop", {
      type: "[[DONE]]",
      message: "All Agents Already Answered",
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
}

async function continueChatControlFlow(data, res) {
  console.log("Masuk! Continue Chat!");
  res.status(200).send({
    success: true,
  });
}
module.exports = { processChatPrompt, getChatRoom };
