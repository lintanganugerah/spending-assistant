const express = require("express");
const router = express.Router();
const identityMidw = require("@middleware/identity.middleware");

const chat = require("@routes/v1/chat.routes");
const dbHealth = require("@routes/v1/dbHealth.routes");
const auth = require("@routes/v1/auth.routes");
const financialBackground = require("@routes/v1/financialBackground.routes");
const csrf = require("@routes/v1/csrf.routes");

router.use("/auth", auth);
router.use("/csf", csrf);
router.use("/dbHealth", dbHealth);
router.get("", (_, res) => {
  res.status(200).send({
    message: "V1 Endpoint Running",
  });
});

//Private Route ini harus diakses sebelum Init. Sehingga harus ada keyID dan CSRF yang diterima dari /init
const protectedRoute = express.Router();
router.use("", identityMidw.identifyUser, protectedRoute);
protectedRoute.use("/chat", chat);
protectedRoute.use("/financialbackground", financialBackground);
protectedRoute.use("/auth", auth);

module.exports = router;
