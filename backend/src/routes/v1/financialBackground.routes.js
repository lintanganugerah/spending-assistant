const express = require("express");
const JWTmidw = require("@middleware/jwtToken.middleware");
const router = express.Router();

const financialBackgroundRouter = express.Router();
const fController = require("@controller/userQuery/financialBackground.controller");

router.use(JWTmidw.verifyAccessToken);
router.use("", financialBackgroundRouter);

financialBackgroundRouter.get("", fController.getFinancialBackground);
financialBackgroundRouter.post("", fController.setFinancialBackground);

module.exports = router;
