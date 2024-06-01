import React, { useEffect, useState } from "react";

const Message = ({ message, changeSender, sender }) => {
  const [username, setUsername] = useState("");
  const username1 = localStorage.getItem("username");
  const localUsername = username1 ? username1.replace(/['"]+/g, "") : "";
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    if (message.sender === undefined) return;
    if (sender[message.sender]) {
      setUsername(sender[message.sender]);
    } else {
      changeSender(message.sender);
    }
  }, [message.sender, sender]);

  return (
    <div
      className={`flex space-x-4 pb-3 ${
        username === localUsername ? "justify-end" : "justify-start"
      } , ${message.shouldShake ? "shake" : ""}`}
    >
      {username !== localUsername && (
        <div className="pt-3">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
            className="h-10 w-10 rounded-full "
          />
        </div>
      )}
      <div>
        <div
          className={`inline-flex flex-col  space-x-4 rounded-xl px-2 max-w-xl ${
            username === localUsername ? "bg-gray-800" : "bg-gray-500"
          }`}
        >
          <div>
            <p className="font-bold text-white pb-2">{username}</p>
            <p className="break-words text-white pl-2">{message.message}</p>
          </div>
        </div>
        <div
          className={`text-white flex ${
            username === localUsername ? "justify-end" : "justify-start"
          }`}
        >
          {time}
        </div>
      </div>
      {username === localUsername && (
        <div className="pt-3">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
            className="h-10 w-10 rounded-full "
          />
        </div>
      )}
    </div>
  );
};

export default Message;
