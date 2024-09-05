import React, { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";

const getMediaStreamFromSignal = async (signal) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN server configuration
  });

  // Create a new MediaStream object
  const remoteStream = new MediaStream();

  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  };

  await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  return { peerConnection, remoteStream };
};

const VideoCall = () => {
  const { incomingCall, callAccepted } = useSocketContext();
  const videoRef = useRef();

  useEffect(() => {
    const setupStream = async () => {
      if (incomingCall && !callAccepted) {
        try {
          const { peerConnection, remoteStream } =
            await getMediaStreamFromSignal(incomingCall.signal);

          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
          }

          // Handle cleanup
          return () => {
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
            peerConnection.close();
          };
        } catch (error) {
          console.error("Error getting media stream:", error);
        }
      }
    };

    const cleanup = setupStream();

    return () => {
      if (cleanup) cleanup();
    };
  }, [incomingCall, callAccepted]);

  useEffect(() => {
    const setupLocalStream = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        // Assuming you want to show local video as well
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
      } catch (error) {
        console.error("Error accessing local media devices:", error);
      }
    };

    setupLocalStream();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        id="remoteVideo"
        style={{ width: "100%" }} // Adjust as needed
      />
    </div>
  );
};

export default VideoCall;
