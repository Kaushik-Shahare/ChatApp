const express = require("express");
const chatsRouter = express.Router();
const auth = require("../middlewares/auth");
const {
  chat,
  sendMessage,
  getMessages,
} = require("../controllers/chatsController");

chatsRouter.get("/chat", chat);
chatsRouter.get("/:id", auth, getMessages);
chatsRouter.post("/send/:id", auth, sendMessage);

module.exports = chatsRouter;
