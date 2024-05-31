import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import axios from "axios";
import { SocketContextProvider } from "../context/SocketContext";

const Home = () => {
  // Check if the user is authenticated by checking if the token is present in the local storage
  const navigator = useNavigate();
  const [conversations, setConversations] = useState([]);

  const [conversationUsername, setConversationUsername] = useState("");
  const [conversationId, setConversationId] = useState("");

  const changeConversation = (id, username) => {
    setConversationId(id);
    setConversationUsername(username);
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      axios
        .get("http://localhost:3001/users", {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token").split('"')[1],
          },
        })
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigator("/signin");
    }
  });

  return (
    <SocketContextProvider>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar
          conversations={conversations}
          conversationId={conversationId}
          changeConversation={changeConversation}
        />
        <MessageContainer
          conversationUsername={conversationUsername}
          conversationId={conversationId}
        />
      </div>
    </SocketContextProvider>
  );
};

export default Home;
