const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const {
  getUsersForSidebar,
  getUsernameById,
} = require("../controllers/userController");

userRouter.get("/", auth, getUsersForSidebar);
userRouter.get("/:id", auth, getUsernameById);

module.exports = userRouter;
