import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="text-grau-900 font-bold">Kaushik</span>
        </div>
        <Messages />
        <MessageInput />
      </>
    </div>
  );
};

export default MessageContainer;
