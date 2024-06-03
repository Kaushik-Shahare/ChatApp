import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import { useSocketContext } from "../context/SocketContext";

const Messages = ({ conversationId, sendMessage }) => {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const lastMessageRef = useRef();
  const { socketMessage } = useSocketContext();
  const [sender, setSender] = useState({});

  const changeSender = (senderId) => {
    try {
      axios
        .get(`https://kaushik-shahare-chatapp.onrender.com/users/${senderId}`, {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token").split('"')[1],
          },
        })
        .then((response) => {
          setSender({ ...sender, [senderId]: response.data.username });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      socketMessage &&
      participants.includes(socketMessage.sender) &&
      participants.includes(socketMessage.receiver)
    ) {
      setMessages((messages) => [...messages, socketMessage]);
    }
  }, [socketMessage]);

  useEffect(() => {
    if (sendMessage) {
      if (messages) {
        setMessages((messages) => [...messages, sendMessage]);
      } else {
        setMessages([sendMessage]);
      }
    }
  }, [sendMessage]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://kaushik-shahare-chatapp.onrender.com/chats/${conversationId}`,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("token").split('"')[1],
            },
          }
        )
        .then((response) => {
          setMessages(response.data.messages);
          setParticipants(response.data.participants);
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
    <div className="flex flex-col p-4 space-y-2 overflow-auto h-full">
      {messages &&
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>
            <Message
              key={message._id}
              message={message}
              changeSender={changeSender}
              sender={sender}
            />
          </div>
        ))}
    </div>
  );
};

export default Messages;
