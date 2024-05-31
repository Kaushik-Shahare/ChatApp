import React, { useState } from "react";
import axios from "axios";

const MessageInput = ({ conversationId, SendMessage }) => {
  const [messageInput, setMessageInput] = useState("");

  const handleChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageInput === "") return;
    try {
      await axios
        .post(
          `http://localhost:3001/chats/send/${conversationId}`,
          {
            message: messageInput,
          },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("token").split('"')[1],
            },
          }
        )
        .then((response) => {
          SendMessage(response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
    setMessageInput("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message"
          value={messageInput}
          onChange={handleChange}
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
