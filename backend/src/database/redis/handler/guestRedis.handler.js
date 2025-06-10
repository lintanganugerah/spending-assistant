const { guestRedis } = require("@database/redis/redis.database");

const GUEST_EXPIRY = 60 * 15;
async function setGuestFinancialBackground(uid, value, expiredSecond = null) {
  await guestRedis.set(
    `guest:financialbg:${uid}`,
    checkAndConvertToJSON(value),
    "EX",
    GUEST_EXPIRY
  );
}

async function getGuestFinancialBackground(uid) {
  const data = parseToJSON(await guestRedis.get(`guest:financialbg:${uid}`));
  return data;
}

function checkAndConvertToJSON(value) {
  if (typeof value != null && typeof value == "object")
    value = JSON.stringify(value);
  return value;
}

function parseToJSON(value) {
  return JSON.parse(value);
}

async function saveChatHistory(uid, chatID, value) {
  //All guest chat history default set expiry to 15 minutes
  await guestRedis.set(
    `guest:chat:${uid}:${chatID}`,
    checkAndConvertToJSON(value),
    "EX",
    GUEST_EXPIRY
  );
}

async function getChatHistory(uid, chatID) {
  const data = parseToJSON(
    await guestRedis.get(`guest:chat:${uid}:${chatID}`, value)
  );
  return data;
}

async function checkGuestValid(uid) {
  return await guestRedis.get(`guest:key:${uid}`);
}

module.exports = {
  setGuestFinancialBackground,
  getGuestFinancialBackground,
  saveChatHistory,
  getChatHistory,
  checkGuestValid,
};
