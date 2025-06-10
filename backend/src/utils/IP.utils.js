const crypto = require("@library/crypto/crypto.library");
const config = require("@config/index.config");

function getIP(req) {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress
  );
}

function getEncIP(req) {
  const encrypted = crypto.encrypt(
    getIP(req),
    crypto.getCryptKey(config.cryptKey)
  );
  return encrypted;
}

module.exports = { getIP, getEncIP };
