import React from "react";
import Chat from "./Chat";

const Chats = () => {
  return (
    <div className="bg-red-500 w-2/3 p-2">
      <Chat username="Ankit" />
      <Chat username="kaushik" />
      <Chat username="Ankit" />
      <Chat username="Ankit" />
      <Chat username="kaushik" />
    </div>
  );
};

export default Chats;
