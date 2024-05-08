import React from "react";

const Conversation = ({ conversation, changeConversation }) => {
  const isOnline = true;
  const username = conversation.username;

  const handleConversationChange = () => {
    changeConversation(conversation._id);
  };

  return (
    <div
      className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1"
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
