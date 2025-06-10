const express = require("express");
const { initCSRF } = require("@controller/Auth/csrf.controller");
const router = express.Router();

router.get("/init", initCSRF);

module.exports = router;
