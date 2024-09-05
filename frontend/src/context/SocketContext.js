export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState({});
  const [incomingCall, setIncomingCall] = useState(null); // State for incoming calls
  const [callAccepted, setCallAccepted] = useState(false); // State for accepting a call
  const [callInProgress, setCallInProgress] = useState(false); // State to track ongoing calls

  let socket;

  useEffect(() => {
    socket = io("https://kaushik-shahare-chatapp.onrender.com", {
      query: {
        userId: localStorage.getItem("userId").split('"')[1],
      },
    });

    if (localStorage.getItem("token")) {
      // Handling online users
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Handling new messages
      socket.on("message", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setSocketMessage(newMessage);
      });

      // Handling incoming call
      socket.on("callUser", ({ from, signal }) => {
        setIncomingCall({ from, signal });
      });

      // Handling call accepted by the recipient
      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
      });

      return () => {
        socket.disconnect(); // Use disconnect instead of close
      };
    }
  }, []);

  const makeCall = (userId, signalData) => {
    if (socket) {
      socket.emit("callUser", {
        userToCall: userId,
        signalData,
      });
      setCallInProgress(true);
    }
  };

  const acceptCall = () => {
    if (socket && incomingCall) {
      setCallInProgress(true);
      setCallAccepted(true);
      socket.emit("answerCall", { signal: incomingCall.signal });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socketMessage,
        onlineUsers,
        incomingCall,
        callAccepted,
        callInProgress,
        makeCall,
        acceptCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
