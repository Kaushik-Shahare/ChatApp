const Chat = require("../models/chat");
const Message = require("../models/message");
const { getReceiverSocketId } = require("../socket/socket");

const chat = async (req, res) => {
  try {
    if (!req.query.participants) {
      return res
        .status(400)
        .json({ message: "Missing participants query parameter" });
    }

    const participants = req.query.participants.split(",");

    const chats = await Chat.find({
      participants: { $all: participants },
    });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    // the {} is the object that we are destructuring into the message variable and its a string
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const sender = req.userId;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [sender, receiverId] },
    });

    if (!chat) {
      let chat = await Chat.create({
        participants: [sender, receiverId],
      });
    }

    let newMessage = await Message.create({
      sender: sender,
      receiver: receiverId,
      message: message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await Promise.all([chat.save(), newMessage.save()]);

    // socket.io code here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to only sends the message to the specific socketId/client
      io.to(receiverSocketId).emit("message", newMessage);
    }

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.log("Error in sendMessage controller: ", err.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    // populate will populate the messages field in the chat model
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages"); // NOT REFERENCE but the actual message
    // const chat = await Chat.findOne({
    //   _id: receiverId,
    // }).populate("messages");

    if (!chat) {
      return res.status(200).json([]);
    }

    res.status(200).json(chat.messages);
  } catch (err) {
    console.log("Error in getMessages controller: ", err.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
module.exports = { chat, sendMessage, getMessages };
