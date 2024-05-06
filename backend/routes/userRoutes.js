const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const { getUsersForSidebar } = require("../controllers/userController");

userRouter.get("/", auth, getUsersForSidebar);

module.exports = userRouter;
