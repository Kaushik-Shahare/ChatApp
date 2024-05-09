const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const chatsRouter = require("./routes/chatsRoutes");
const userRouter = require("./routes/userRoutes");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const { app } = require("./socket/socket");

dotenv.config();

app.use(express.json());
app.use(cors({ origin: true }));

server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
module.exports = { getReceiverSocketId };

const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("New client connected");

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  //io.emit is used to send message to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

try {
  mongoose.connect(process.env.MONGO_DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error while connecting to MongoDB", error);
}

app.use("/auth", authRouter);

app.use("/chats", chatsRouter);

app.use("/users", userRouter);

server.listen(3001, () => {
  console.log("listening on *:3001");
});
