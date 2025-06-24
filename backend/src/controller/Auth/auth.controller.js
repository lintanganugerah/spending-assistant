const { v4: uuidv4 } = require("uuid");
const config = require("@config/index.config");
const jwt = require("jsonwebtoken");
const { isTokenExpired } = require("../../utils/jwtToken.utils");

function initializeToken(_, res) {
  const jwtid = uuidv4();
  const key = jwt.sign(
    {
      id: jwtid,
    },
    config.jwt.secret,
    {
      expiresIn: 5,
    }
  );

  return res.status(200).send({
    success: true,
    token: key,
  });
}

async function checkExpiryToken(req, res) {
  const token = req.body.token;
  if (!token) {
    return res.status(422).send({
      success: false,
      message: "Token not found in request",
    });
  }
  const isExpired = isTokenExpired(token);

  return res.status(200).send({
    expired: isExpired,
  });
}

module.exports = { initializeToken, checkExpiryToken };
