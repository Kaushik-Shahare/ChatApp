import React from "react";
import { useSocketContext } from "../context/SocketContext";
import img from "../assets/images/profile.png";

const Conversation = ({ conversation, changeConversation, conversationId }) => {
  const username = conversation.username;
  const isSelected = conversation._id === conversationId;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers ? onlineUsers.includes(conversation._id) : false;

  const handleConversationChange = () => {
    changeConversation(conversation._id, username);
  };

  return (
    <div
      className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 ${
        isSelected ? "bg-sky-600" : ""
      }`}
      onClick={handleConversationChange}
    >
      <div className="relative">
        <img
          src={img}
          alt="profile"
          className="w-10 h-10 rounded-full absolute"
        />
        <div className="w-10 h-10 rounded-full bg-gray-500">
          <div
            className={`h-3 w-3 ml-8 rounded-full relative ${
              isOnline ? "bg-green-500" : "bg-gray-600"
            }`}
          ></div>
        </div>
      </div>
      <div className="pl-2 text-white">
        <p>{username}</p>
      </div>
    </div>
  );
};

export default Conversation;
