const express = require("express");
const router = express.Router();
const { limiters } = require("@middleware/rateLimiter.middleware");

const authController = require("@controller/Auth/auth.controller");
const { protectedCSRF } = require("@middleware/csrf.middleware");

router.get(
  "/init",
  limiters.keyGenerate,
  protectedCSRF,
  authController.generateGuestID
);

module.exports = router;
