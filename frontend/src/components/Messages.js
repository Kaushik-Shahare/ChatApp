import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import { useSocketContext } from "../context/SocketContext";

const Messages = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();
  const { socket } = useSocketContext();

  console.log("socket", socket);
  useEffect(() => {
    if (socket) {
      socket?.on("message", (newMessage) => {
        console.log("newMessage", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    // Cleanup function
    return () => {
      if (socket) {
        socket?.off("newMessage");
      }
    };
  }, [socket]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/chats/${conversationId}`, {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token").split('"')[1],
          },
        })
        .then((response) => {
          setMessages(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [conversationId]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="flex flex-col p-4 space-y-2 overflow-auto">
      {messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message
            key={message._id}
            message={message.message}
            userId={message.sender}
          />
        </div>
      ))}
    </div>
  );
};

export default Messages;
