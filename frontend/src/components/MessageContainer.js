import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import VideoCall from "./VideoCall"; // Import the VideoCall component
import IncomingCallNotification from "./IncomingCallNotification"; // Import the new notification component
import { useSocketContext } from "../context/SocketContext";
import "./MessageContainer.css";

const MessageContainer = ({ conversationId, conversationUsername, userId }) => {
  const [sendMessage, setSendMessage] = useState({});
  const {
    incomingCall,
    callInProgress,
    callAccepted,
    makeCall,
    acceptCall,
    rejectCall,
  } = useSocketContext();
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    if (callAccepted || callInProgress) {
      setCalling(true);
    } else {
      setCalling(false);
    }
  }, [callAccepted, callInProgress]);

  const SendMessage = (message) => {
    setSendMessage(message);
  };

  const noChatSelected = conversationId === "";

  const handleCall = () => {
    if (!callInProgress && !calling) {
      makeCall(conversationId, userId); // Initiate call with socket context
    }
  };

  const handleEndCall = () => {
    setCalling(false);
    // Notify server or clean up peer connections if needed
  };

  const handleAcceptCall = () => {
    acceptCall();
  };

  return (
    <div className="md:min-w-[450px] w-full flex flex-col relative">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          {incomingCall && !callInProgress && (
            <IncomingCallNotification
              onAccept={handleAcceptCall}
              onReject={() => rejectCall()}
            />
          )}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
            <span className="text-white font-bold">{conversationUsername}</span>
            <button
              className="bg-blue-400 rounded w-20 border-black"
              onClick={handleCall}
              disabled={callInProgress || calling} // Disable button if a call is in progress
            >
              Call
            </button>
          </div>
          <Messages conversationId={conversationId} sendMessage={sendMessage} />
          <MessageInput
            conversationId={conversationId}
            SendMessage={SendMessage}
          />
          {callInProgress && (
            <div className="video-call-overlay">
              <VideoCall receiverId={conversationId} userId={userId} />
              <button onClick={handleEndCall} className="end-call-button">
                End Call
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageContainer;
