const path = require("path");
const dotenv = require("dotenv");
const Joi = require("joi");
const crypto = require("crypto");
const fs = require("fs");
const customCrypto = require("../library/crypto/crypto.library");

dotenv.config();
const encPath = path.join(__dirname, "promptEnc.config.json");

const ENV_SCHEMA = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_ENV: Joi.string()
    .lowercase()
    .valid("development", "production")
    .required(),
  APP_PORT: Joi.number().default(3000),
  APP_URL: Joi.string().required(),
  APP_SECRET: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_RETRY_STRATEGY_MULTIPLIER_IN_MS: Joi.string().default(1000),

  FRONTEND_URL: Joi.string().uri().optional().allow(""),
  COOKIE_SECRET: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_MINUTES: Joi.number().required(),

  AI_KEY_1: Joi.string().required(),
  AI_URL: Joi.string().uri().required(),
  AI_BASE_MODEL: Joi.string().required(),
  AI_FINANCIAL_MODEL: Joi.string().optional().allow(""),
  AI_EMOTION_MODEL: Joi.string().optional().allow(""),
  AI_MAIN_MODEL: Joi.string().optional().allow(""),
  AI_SUMMARY_MODEL: Joi.string().optional().allow(""),
  AI_MAX_TRIES: Joi.number().default(1).required(),

  CRYPT_KEY: Joi.string()
    .default(`${crypto.randomBytes(128).toString("hex")}`)
    .required(),

  CSRF_SECRET: Joi.string().required(),
  CSRF_TTL_IN_SEC: Joi.string().required(),
  CSRF_BITS: Joi.number().required(),

  LOG_DIR: Joi.string().optional().allow(""),
  LOG_LEVEL: Joi.string()
    .valid("debug", "info", "verbose", "http", "warn", "error")
    .required(),
  LOG_MAX_SIZE_IN_MB: Joi.number().required(),
  LOG_MAX_AGE_IN_DAYS: Joi.number().required(),
  LOG_ZIPPED: Joi.boolean().default(false),
  LOG_FREQUENCY: Joi.string().valid("daily", "hourly").required(),
}).unknown();

const { value: env, error } = ENV_SCHEMA.validate(process.env);
if (error) throw new Error(`Config Validation error: ${error.message}`);

const encryptedData = fs.readFileSync(encPath, "utf-8");
if (!encryptedData)
  throw new Error(
    "EncryptedData Empty. Make sure prompt encPath is valid or promptEnc.config.json exist. You could NPM run encryptPrompt first to generate encrypted system prompt"
  );

const decryptedString = JSON.parse(
  customCrypto.decrypt(encryptedData, customCrypto.getCryptKey(env.CRYPT_KEY))
);

const config = {
  env: env.APP_ENV,
  port: env.APP_PORT,
  appName: env.APP_NAME,
  appUrl: env.APP_URL,
  appSecret: env.APP_SECRET,
  cryptKey: env.CRYPT_KEY,
  log: {
    directory: env.LOG_DIR,
    level: env.LOG_LEVEL,
    maxSize: env.LOG_MAX_SIZE_IN_MB,
    maxAge: env.LOG_MAX_AGE_IN_DAYS,
    zipped: env.LOG_ZIPPED,
    freq: env.LOG_FREQUENCY,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiration: env.JWT_EXPIRATION_MINUTES,
  },
  ai: {
    apiKey: env.AI_KEY_1,
    url: env.AI_URL,
    baseModel: env.AI_BASE_MODEL,
    finacialAgentsModel: env.AI_FINANCIAL_MODEL,
    emotionAgentsModel: env.AI_EMOTION_MODEL,
    mainAgentsModel: env.AI_MAIN_MODEL,
    summaryAgentsModel: env.AI_SUMMARY_MODEL,
    maxTries: env.AI_MAX_TRIES,
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    retryMultiplier: env.REDIS_RETRY_STRATEGY_MULTIPLIER_IN_MS,
  },
  cors: {
    frontend: env.FRONTEND_URL,
  },
  cookie: {
    secret: env.COOKIE_SECRET,
  },
  csrf: {
    secret: env.CSRF_SECRET,
    ttl: env.CSRF_TTL_IN_SEC,
    bits: env.CSRF_BITS,
  },
  prompt: decryptedString,
};

module.exports = config;
