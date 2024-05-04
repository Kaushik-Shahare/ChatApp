const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb+srv://Kaushik:1231231234@cluster0.8cuhk3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error while connecting to MongoDB", error);
}

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  message: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { User, Chat };
