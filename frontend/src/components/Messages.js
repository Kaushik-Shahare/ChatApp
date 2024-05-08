import React, { useEffect, useState } from "react";
import Message from "./Message";
import axios from "axios";

const Messages = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(conversationId);
    try {
      axios
        .get(`http://localhost:3001/chats/${conversationId}`, {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token").split('"')[1],
          },
        })
        .then((response) => {
          console.log(response.data);
          setMessages(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [conversationId]);

  return (
    <div className="flex flex-col p-4 space-y-2 overflow-auto">
      {messages.map((message) => (
        <Message
          key={message._id}
          message={message.message}
          userId={message.sender}
        />
      ))}
    </div>
  );
};

export default Messages;
