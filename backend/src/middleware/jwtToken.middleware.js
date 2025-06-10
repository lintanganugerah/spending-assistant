const jwt = require("jsonwebtoken");
const config = require("@config/index.config");

function verifyAccessToken(req, res, next) {
  if (req.identity.role == "user") {
    const token = extractToken(req.headers["Authorization"]);
    const payload = verifyJWT(token);
    req.identity.id = payload.userId;
  }
  next();
}

function verifyRefreshToken(req, res, next) {
  const token = extractToken(req.body.refreshToken);
  const payload = verifyJWT(token);
  req.JWTPayload = payload;
  next();
}

function extractToken(token) {
  if (!token)
    throw Object.assign(new Error("Please Login First or provide auth token"), {
      status: 401,
    });
  return token.replace("Bearer ", "");
}

async function verifyJWT(token) {
  const payload = jwt.verify(token, config.jwt.secret);
  return payload;
}

module.exports = { verifyAccessToken, verifyRefreshToken };
