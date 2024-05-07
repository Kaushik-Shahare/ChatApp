import React from "react";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
        />
        <button className="bg-slate-500 text-white  rounded-lg pt-2 pl-2 absolute inset-y-0 end-0 flex pe-3">
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
