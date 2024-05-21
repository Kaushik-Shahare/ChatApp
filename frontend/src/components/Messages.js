import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import { useSocketContext } from "../context/SocketContext";

const Messages = ({ conversationId, sendMessage }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();
  const { socketMessage } = useSocketContext();

  useEffect(() => {
    if (socketMessage) {
      setMessages((messages) => [...messages, socketMessage]);
    }
  }, [socketMessage]);

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
            time={`${new Date(message.createdAt).getHours()}:${new Date(
              message.createdAt
            ).getMinutes()}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Messages;
