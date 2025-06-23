const express = require("express");
const router = express.Router();
const { limiters } = require("@middleware/rateLimiter.middleware");

const authController = require("@controller/Auth/auth.controller");

router.get("/init", limiters.keyGenerate, authController.initializeToken);

module.exports = router;
