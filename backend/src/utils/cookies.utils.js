const config = require("@config/index.config");

const setCookie = (res, cookieName, cookieValue, options = {}) => {
  const defaultOptions = {
    maxAge: 1000 * 60 * 5, // Default 5 minutes
    httpOnly: true,
    secure: config.env.toLowerCase() == "production",
    sameSite: "lax",
    signed: true,
  };
  res.cookie(cookieName, cookieValue, { ...defaultOptions, ...options });
};

const cookiesAlias = {
  csrf_raw_token: "CSRT",
  csrf_signed_token: "CSST",
};

module.exports = { setCookie, cookiesAlias };
