const express = require("express");
const router = express.Router();
const { limiters } = require("@middleware/rateLimiter.middleware");

const authController = require("@controller/Auth/auth.controller");

router.get("/init", limiters.keyGenerate, authController.initializeToken);
router.post("/expired", authController.checkExpiryToken);

module.exports = router;
