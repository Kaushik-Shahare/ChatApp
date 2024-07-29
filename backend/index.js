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

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const saltRounds = 10;

dotenv.config();

app.use(express.json());

app.use(passport.initialize());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://kaushik-shahare-chatapp.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Find or create user in the database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const hashedPassword = await bcrypt.hash(
            "defaultPassword",
            saltRounds
          );

          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            username: profile.emails[0].value.split("@")[0],
            password: hashedPassword,
            profilePicture: profile.photos[0].value,
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        // Pass the token to the callback
        return cb(null, { token, user });
      } catch (error) {
        return cb(error, null);
      }
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
