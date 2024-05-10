import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import { useSocketContext } from "../context/SocketContext";

const Messages = ({ conversationId, sendMessage }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();
  const { socket } = useSocketContext();

  console.log("socket", socket);
  useEffect(() => {
    if (socket) {
      socket?.on("message", (newMessage) => {
        console.log("newMessage", newMessage);
        setMessages((messages) => [...messages, newMessage]);
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
    if (sendMessage) {
      setMessages((messages) => [...messages, sendMessage]);
    }
  }, [sendMessage]);

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
      {messages.map((message, index) => (
        <div key={index} ref={lastMessageRef}>
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
