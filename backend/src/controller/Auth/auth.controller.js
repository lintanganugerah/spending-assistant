const { v4: uuidv4 } = require("uuid");
const config = require("@config/index.config");
const jwt = require("jsonwebtoken");

async function initializeToken(_, res) {
  const jwtid = uuidv4();
  const key = jwt.sign(
    {
      id: jwtid,
    },
    config.jwt.secret,
    {
      expiresIn: "24h",
    }
  );

  return res.status(200).send({
    success: true,
    token: key,
  });
}

module.exports = { initializeToken };
