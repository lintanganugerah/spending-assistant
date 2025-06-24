const jwt = require("jsonwebtoken");
const config = require("@config/index.config");
const { extractToken, verifyJWT } = require("@utils/jwtToken.utils");

function verifyAccessToken(req, _, next) {
  if (req.identity.role == "user") {
    const token = extra(req.headers["Authorization"]);
    const payload = verifyJWT(token);
    req.identity.id = payload.userId;
  }
  next();
}

function verifyRefreshToken(req, _, next) {
  const token = extractToken(req.body.refreshToken);
  const payload = verifyJWT(token);
  req.JWTPayload = payload;
  next();
}

module.exports = { verifyAccessToken, verifyRefreshToken };
