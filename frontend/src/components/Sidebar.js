import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import UserSidebar from "./UserSidebar";

const Sidebar = ({ conversations, changeConversation, conversationId }) => {
  return (
    <div className="flex flex-col justify-between border-r border-gray-600">
      <SearchInput
        conversations={conversations}
        changeConversation={changeConversation}
      />
      <hr className="border-t border-gray-300 mx-3 my-4" />
      <Conversations
        conversations={conversations}
        conversationId={conversationId}
        changeConversation={changeConversation}
      />
      <div className="w-full">
        <UserSidebar />
      </div>
    </div>
  );
};

export default Sidebar;
