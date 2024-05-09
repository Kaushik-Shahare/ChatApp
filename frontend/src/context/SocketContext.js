import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const socket = io("http://localhost:3001", {
        query: {
          userId: localStorage.getItem("userId"),
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.disconnect();
      }
      setSocket(null);
    }
  }, [socket, onlineUsers]);

  return (
    <SocketContext.Provider value={(socket, onlineUsers)}>
      {children}
    </SocketContext.Provider>
  );
};
