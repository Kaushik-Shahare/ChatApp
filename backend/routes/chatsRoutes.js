const express = require("express");
const chatsRouter = express.Router();
const auth = require("../middlewares/auth");
const {
  chat,
  createChat,
  sendMessage,
  getMessages,
} = require("../controllers/chatsController");

chatsRouter.get("/chat", chat);
chatsRouter.post("/create", auth, createChat);
chatsRouter.get("/:id", auth, getMessages);
chatsRouter.post("/send/:id", auth, sendMessage);

module.exports = chatsRouter;
