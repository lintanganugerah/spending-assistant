const express = require("express");
const JWTmidw = require("@middleware/jwtToken.middleware");
const router = express.Router();

const chatRouter = express.Router();

const controller = require("@controller/userQuery/chat.controller");

// router.use(JWTmidw.verifyAccessToken);
router.use("", chatRouter);

chatRouter.get("/:id", controller.getChatRoom);
chatRouter.post("", controller.processChatPrompt);

module.exports = router;
