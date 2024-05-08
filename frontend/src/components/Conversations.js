import React, { useState, useEffect } from "react";
import Conversation from "./Conversation";
import axios from "axios";

const Conversations = ({ conversations, changeConversation }) => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          changeConversation={changeConversation}
        />
      ))}
    </div>
  );
};

export default Conversations;
