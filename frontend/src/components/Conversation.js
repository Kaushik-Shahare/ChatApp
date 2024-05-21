import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

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
        isSelected ? "bg-sky-500" : ""
      }`}
      onClick={handleConversationChange}
    >
      <div>
        <div className="w-10 h-10 rounded-full bg-gray-500">
          <div
            className={`h-3 w-3 ml-8 rounded-full relative ${
              isOnline ? "bg-green-500" : "bg-gray-600"
            }`}
          ></div>
        </div>
      </div>
      <div className="pl-2">
        <p>{username}</p>
      </div>
    </div>
  );
};

export default Conversation;
