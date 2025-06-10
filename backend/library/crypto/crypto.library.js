const crypto = require("crypto");

function getCryptKey(secret) {
  return crypto.createHash("sha256").update(secret).digest(); // 32 bytes
}

function encrypt(plaintext, key) {
  const iv = crypto.randomBytes(12); // GCM IV biasanya 12 bytes
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  // Format: [iv][ciphertext][authTag]
  const result = Buffer.concat([iv, encrypted, tag]).toString("base64url");
  return result;
}

function decrypt(text, key) {
  const payload = Buffer.from(text, "base64url");
  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(payload.length - 16);
  const ciphertext = payload.subarray(12, payload.length - 16);

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

module.exports = { getCryptKey, encrypt, decrypt };
