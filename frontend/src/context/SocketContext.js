import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import notificationSound from "../assets/sounds/notification.mp3";
const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const socket = io("https://kaushik-shahare-chatapp.onrender.com", {
        query: {
          userId: localStorage.getItem("userId").split('"')[1],
        },
      });

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.on("message", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setSocketMessage(newMessage);
      });

      return () => socket.close();
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socketMessage, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
