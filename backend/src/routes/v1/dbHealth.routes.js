const express = require("express");
const router = express.Router();
const controller = require("@controller/dbHealth.controller");

router.get("", controller.getDbHealth);

module.exports = router;
