import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import VideoCall from "./VideoCall"; // Import the VideoCall component
import { useSocketContext } from "../context/SocketContext";

const MessageContainer = ({ conversationId, conversationUsername, userId }) => {
  const [sendMessage, setSendMessage] = useState({});
  const { incomingCall, callInProgress, callAccepted, makeCall, acceptCall } =
    useSocketContext(); // Use the socket context
  const [calling, setCalling] = useState(false);

  const SendMessage = (message) => {
    setSendMessage(message);
  };

  const noChatSelected = conversationId === "";

  // Handle starting a video call
  const handleCall = () => {
    makeCall(conversationId, userId); // Initiate call with socket context
    setCalling(true);
  };

  // Handle ending the call
  const handleEndCall = () => {
    setCalling(false);
  };

  return (
    <div className="md:min-w-[450px] w-full flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : callInProgress || calling ? (
        <div className="video-call-container">
          <VideoCall receiverId={conversationId} userId={userId} />
          <button
            onClick={handleEndCall}
            className="bg-red-500 text-white p-2 mt-2 rounded"
          >
            End Call
          </button>
        </div>
      ) : (
        <>
          {incomingCall && !callInProgress && (
            <div className="incoming-call-container bg-green-500 p-4 rounded mb-4 text-white">
              <h3>{incomingCall.from} is calling you...</h3>
              <button
                onClick={acceptCall}
                className="bg-blue-500 p-2 rounded mr-4"
              >
                Accept
              </button>
              <button
                onClick={handleEndCall}
                className="bg-red-500 p-2 rounded"
              >
                Reject
              </button>
            </div>
          )}
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between">
            <span className="text-white font-bold">{conversationUsername}</span>
            <button
              className="bg-blue-400 rounded w-20 border-black"
              onClick={handleCall} // Start the call when button is clicked
            >
              Call
            </button>
          </div>
          <Messages conversationId={conversationId} sendMessage={sendMessage} />
          <MessageInput
            conversationId={conversationId}
            SendMessage={SendMessage}
          />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
