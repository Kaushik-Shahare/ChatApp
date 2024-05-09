import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ conversations, changeConversation, conversationId }) => {
  return (
    <div className="flex flex-col justify-between">
      <div>
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
      </div>
      <div className="w-full">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
