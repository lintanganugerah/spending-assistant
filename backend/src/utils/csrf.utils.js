const crypto = require("crypto");
const config = require("@config/index.config");

function initNewCSRF() {
  const rawCSRF = generateCSRFToken();
  const signedCSRF = signCSRF(rawCSRF);
  return { rawCSRF, signedCSRF };
}

function signCSRF(token) {
  return crypto
    .createHmac("sha256", config.CSRF_SECRET)
    .update(token)
    .digest("hex");
}

function generateCSRFToken() {
  return crypto.randomBytes(32).toString("hex");
}

function verifyCheckCSRF(rawToken, signedToken) {
  if (!rawToken || !signedToken) return false;

  const expectedSignature = signCSRF(rawToken);

  // Use timingSafeEqual to prevent timing attacks
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const receivedBuffer = Buffer.from(signedToken, "hex");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

module.exports = {
  initNewCSRF,
  signCSRF,
  generateCSRFToken,
  verifyCheckCSRF,
};
