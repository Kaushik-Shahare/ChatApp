import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="flex flex-col p-4 space-y-2 overflow-auto">
      <Message username="kaushik" />
      <Message username="kaushik" />
      <Message username="Ankit" />
      <Message username="Ankit" />
      <Message username="kaushik" />
      <Message username="kaushik" />
      <Message username="kaushik" />
      <Message username="kaushik" />
      <Message username="Ankit" />
      <Message username="Ankit" />
      <Message username="Ankit" />
      <Message username="Ankit" />
    </div>
  );
};

export default Messages;
