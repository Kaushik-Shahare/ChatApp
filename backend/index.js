const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const chatsRouter = require("./routes/chatsRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const { app } = require("./socket/socket");

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://kaushik-shaharechatapp-kaushik-shahares-projects.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

try {
  mongoose.connect(process.env.MONGO_DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error while connecting to MongoDB", error);
}
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/auth", authRouter);

app.use("/chats", chatsRouter);

app.use("/users", userRouter);

server.listen(3001, () => {
  console.log("listening on *:3001");
});
