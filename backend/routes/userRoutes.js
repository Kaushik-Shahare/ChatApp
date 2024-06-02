const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const {
  getUsersForSidebar,
  getUsernameById,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

userRouter.get("/", auth, getUsersForSidebar);
userRouter.get("/:id", auth, getUsernameById);
userRouter.get("/profile/:id", auth, getUserProfile);
userRouter.put("/profile/:id", auth, updateUserProfile);

module.exports = userRouter;
