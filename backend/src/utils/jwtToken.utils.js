const jwt = require("jsonwebtoken");
const config = require("@config/index.config");

function extractToken(token) {
  if (!token)
    throw Object.assign(new Error("Please Login First or provide auth token"), {
      status: 401,
    });
  return token.replace("Bearer ", "");
}

function verifyJWT(token) {
  return jwt.verify(token, config.jwt.secret);
}

function isTokenExpired(token) {
  try {
    verifyJWT(token); // otomatis cek exp dari verify.
    return false; // valid dan belum expired
  } catch (err) {
    return true; // invalid atau expired
  }
}

module.exports = { extractToken, verifyJWT, isTokenExpired };
