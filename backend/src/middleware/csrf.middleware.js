const cookiesAlias = require("@utils/cookies.utils");
const { verifyCheckCSRF } = require("../utils/csrf.utils");

function protectedCSRF(req, res, next) {
  // Cek token CSRF valid atau tidak, jika valid lanjutkan ke handler berikutnya
  const rawToken = req.headers["Authorization"];
  const signedToken = req.signedCookies[cookiesAlias["csrf_signed_token"]];

  const valid = verifyCheckCSRF(rawToken, signedToken);
  if (!valid) {
    res.status(403).send({
      success: false,
    });
  }

  next();
}

module.exports = { protectedCSRF };
