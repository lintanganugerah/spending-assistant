const { cookiesAlias } = require("@utils/cookies.utils");
const { initNewCSRF } = require("@utils/csrf.utils");

function initCSRF(_, res) {
  const { rawToken, signedToken } = initNewCSRF();

  res.cookie(cookiesAlias["csrf_raw_token"], rawToken, {
    maxAge: 1000 * 60 * 10,
    secure: config.env.toLowerCase() == "production",
    sameSite: "lax",
  });

  res.cookie(cookiesAlias["csrf_signed_token"], signedToken, {
    maxAge: 1000 * 60 * 10,
    secure: config.env.toLowerCase() == "production",
    sameSite: "lax",
    httpOnly: true,
    signed: true,
  });

  return res.status(200).send({
    success: true,
  });
}

module.exports = {
  initCSRF,
};
