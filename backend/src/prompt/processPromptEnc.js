const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cryptoLibrary = require("../../library/crypto/crypto.library");

dotenv.config();

const promptPath = path.join(__dirname, "prompt.json");
const outputPath = path.join(__dirname, "../../config/promptEnc.config.json");

// Pastikan CRYPT_KEY tersedia
if (!process.env.CRYPT_KEY) {
  console.error("CRYPT_KEY not found in .env");
  process.exit(1);
}

const key = cryptoLibrary.getCryptKey(process.env.CRYPT_KEY);

try {
  // Load dan parse file plaintext
  const promptContent = fs.readFileSync(promptPath, "utf-8");
  const parsedContent = JSON.parse(promptContent);

  console.log("Prompt Content: ", parsedContent);

  // Serialize dan enkripsi
  const stringified = JSON.stringify(parsedContent);
  const encrypted = cryptoLibrary.encrypt(stringified, key);

  // Simpan kembali dalam bentuk terenkripsi (overwrite file)
  fs.writeFileSync(outputPath, encrypted, "utf-8");
  console.log("Prompt.json encrypted successfully.");
} catch (err) {
  console.error("Error encrypting prompt.json:", err.message);
  process.exit(1);
}
