import React, { useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = ({ conversationId, conversationUsername }) => {
  let noChatSelected = true;
  const [sendMessage, setSendMessage] = useState({});

  const SendMessage = (message) => {
    setSendMessage(message);
  };

  if (conversationId !== "") {
    noChatSelected = false;
  }

  return (
    <div className="md:min-w-[450px] w-full flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="text-white font-bold">{conversationUsername}</span>
          </div>
          <Messages conversationId={conversationId} sendMessage={sendMessage} />
          <MessageInput
            conversationId={conversationId}
            SendMessage={SendMessage}
          />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
