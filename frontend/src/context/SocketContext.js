import { createContext, useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import notificationSound from "../assets/sounds/notification.mp3";

const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState({});
  const [incomingCall, setIncomingCall] = useState(null); // State for incoming calls
  const [callAccepted, setCallAccepted] = useState(false); // State for accepting a call
  const [callInProgress, setCallInProgress] = useState(false); // State to track ongoing calls
  const peerConnection = useRef(null); // Use a ref to keep track of the WebRTC peer connection
  const socket = useRef(null); // Use a ref to persist socket connection across renders

  useEffect(() => {
    socket.current = io("https://kaushik-shahare-chatapp.onrender.com", {
      query: {
        userId: localStorage.getItem("userId").split('"')[1],
      },
    });

    const pc = new RTCPeerConnection({
      // Your STUN/TURN server configuration
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current = pc;

    // Handling online users
    socket.current.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Handling new messages
    socket.current.on("message", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setSocketMessage(newMessage);
    });

    // Handling incoming call
    socket.current.on("callUser", async ({ from, signal }) => {
      setIncomingCall({ from, signal });

      // Set up the peer connection and add the incoming stream
      await pc.setRemoteDescription(new RTCSessionDescription(signal));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.current.emit("answerCall", { to: from, signal: answer });
    });

    // Handling call accepted
    socket.current.on("callAccepted", async (signal) => {
      setCallAccepted(true);
      setCallInProgress(true);
      await pc.setRemoteDescription(new RTCSessionDescription(signal));
    });

    // Handling ICE candidates
    socket.current.on("iceCandidate", async ({ candidate }) => {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Handling end call
    socket.current.on("endCall", () => {
      setCallInProgress(false);
      setCallAccepted(false);
      setIncomingCall(null);
      pc.close();
    });

    // Handling ICE candidate gathering
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("iceCandidate", {
          candidate: event.candidate,
          to: incomingCall?.from,
        });
      }
    };

    // Handling track events
    pc.ontrack = (event) => {
      const remoteStream = new MediaStream();
      remoteStream.addTrack(event.track);
      // Handle remote stream
      // You might need to handle this stream in a separate component
    };

    return () => {
      socket.current.disconnect();
      pc.close();
    };
  }, [incomingCall]);

  const makeCall = async (userId, signalData) => {
    const pc = peerConnection.current;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.current.emit("callUser", {
      userToCall: userId,
      signalData: offer,
      from: localStorage.getItem("userId").split('"')[1],
    });
    setCallInProgress(true);
  };

  const acceptCall = async () => {
    if (peerConnection.current && incomingCall) {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(incomingCall.signal)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answerCall", {
        signal: answer,
        to: incomingCall.from,
      });
      setCallAccepted(true);
      setCallInProgress(true);
    }
  };

  const endCall = () => {
    if (socket.current) {
      socket.current.emit("endCall");
    }
    setCallInProgress(false);
    setCallAccepted(false);
    setIncomingCall(null);
    peerConnection.current.close();
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
        endCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
