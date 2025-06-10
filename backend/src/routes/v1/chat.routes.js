const express = require("express");
const JWTmidw = require("@middleware/jwtToken.middleware");
const router = express.Router();

const chatRouter = express.Router();

const cController = require("@controller/userQuery/chat.controller");

router.use(JWTmidw.verifyAccessToken);
router.use("", chatRouter);

chatRouter.get("/:id", cController.getChatRoom);
chatRouter.post("", cController.processChatPrompt);

module.exports = router;
