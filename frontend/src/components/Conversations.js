import React from "react";
import Conversation from "./Conversation";

const Conversations = ({
  conversations,
  changeConversation,
  conversationId,
}) => {
  return (
    <div className="py-2 flex flex-col overflow-auto h-full">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          conversationId={conversationId}
          changeConversation={changeConversation}
        />
      ))}
    </div>
  );
};

export default Conversations;
