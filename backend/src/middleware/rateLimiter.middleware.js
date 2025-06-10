const rateLimit = require("express-rate-limit");
const { getIP } = require("@utils/IP.utils");
const config = require("@config/index.config");

function createRateLimiter(options = {}) {
  const defaultOptions = {
    windowMs: 10 * 60 * 1000, // 10 minutes by default
    max: 50, // Limit each IP to 50 requests by default per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      error: "Too Many Requests",
      message: "You have exceeded the rate limit. Please try again later.",
    },
    handler: (req, res, next, options) => {
      const error = Object.assign(new Error(options.message.message), {
        status: 403,
        error: options.message.error,
      });
      next(error);
    },
    keyGenerator: (req) => getIP(req),
  };

  const limiterOptions = { ...defaultOptions, ...options };

  return rateLimit(limiterOptions);
}

const limiters = {
  // Public general rate limiter
  public: createRateLimiter({
    max: 60,
    windowMs: 60 * 60 * 1000,
  }),

  // Private endpoints general rate limiter
  protected: createRateLimiter({
    max: 120,
    windowMs: 60 * 60 * 1000,
  }),

  // Auth endpoints rate limiter
  auth: createRateLimiter({
    max: 3, // 3 requests per 10 minutes
    message: {
      error: "Too Many Requests",
      message: "You have to many attempt to send magic link.",
    },
  }),

  keyGenerate: createRateLimiter({
    max: config.env == "production" ? 3 : 99,
    windowMs: 5 * 60 * 1000, // 3 request every 5 minutes
  }),

  // Limit use by Network or user IP to use public AI
  ipLimiter: createRateLimiter({
    max: 10,
    windowMs: 24 * 60 * 60 * 1000, // 10 request every 24 hours
    message: {
      error: "Too Many Requests",
      message: "Your network has exceeded rate limit.",
    },
  }),

  // Limit use by User UUID to access public AI
  guestKeyIdLimiter: createRateLimiter({
    max: 5,
    windowMs: 24 * 60 * 60 * 1000, // 5 request every 24 hours
    message: {
      error: "Too Many Requests",
      message: "You has exceeded rate limit.",
    },
    keyGenerator: (req) => {
      const key = req.identity.id;
      return key;
    },
  }),

  // Limit use by Logged User to access private AI
  PrivateAI: createRateLimiter({
    max: 50,
    windowMs: 24 * 60 * 60 * 1000, // 50 request every 24 hours
    message: {
      error: "Too Many Requests",
      message:
        "Hi! Apologize, every user has limited request every 24 hours 'cause dev can't handle expensive billing xD.",
    },
    keyGenerator: (req) => {
      const key = req.identity.id;
      return key;
    },
  }),

  queryAI: createRateLimiter({
    max: 7,
    windowMs: 60 * 1000, // 7 request in 1 minutes. 1 Request every 8.5 seconds
    message: {
      error: "Too Many Requests",
      message: "You are sending message to fast. Calm down bro.",
    },
  }),
};

module.exports = {
  limiters,
  createRateLimiter,
};
