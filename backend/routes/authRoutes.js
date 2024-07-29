const express = require("express");
const authRouter = express.Router();
const { signup, signin } = require("../controllers/authController");
const passport = require("passport");

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token, user } = req.user;
    // Successful authentication, redirect home with token
    const redirectUrl = `https://kaushik-shahare-chatapp.onrender.com/signin?token=${token}&username=${user.username}&userId=${user._id}`;
    res.redirect(redirectUrl);
  }
);

module.exports = authRouter;
