import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import axios from "axios";

const MessageContainer = ({ conversationId }) => {
  let noChatSelected = true;
  if (conversationId !== "") {
    noChatSelected = false;
  }

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="text-gray-900 font-bold">Kaushik</span>
          </div>
          <Messages conversationId={conversationId} />
          <MessageInput conversationId={conversationId} />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
