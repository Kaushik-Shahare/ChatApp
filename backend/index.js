const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const chatsRouter = require("./routes/chatsRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const { app } = require("./socket/socket");
const _dirname = path.resolve();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

try {
  mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("Connected to MongoDB");
  });
} catch (error) {
  console.log("Error while connecting to MongoDB", error);
}
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(
  "/auth1/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://kaushik-shahare-chatapp.onrender.com/auth1/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("profile", profile);
    }
  )
);

app.use("/auth", authRouter);

app.use("/chats", chatsRouter);

app.use("/users", userRouter);

app.use(express.static(path.join(_dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname + "/frontend/build/index.html"));
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
