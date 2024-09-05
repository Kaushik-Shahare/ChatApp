import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useSocketContext } from "../context/SocketContext";

const VideoCall = ({ receiverId, userId }) => {
  const { incomingCall, callAccepted, makeCall, acceptCall } =
    useSocketContext();
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("callUser", ({ from, signal }) => {
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
    });

    socket.on("callAccepted", (signal) => {
      setCallInProgress(true);
      connectionRef.current.signal(signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: userId,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  return (
    <div>
      <div>
        <video ref={myVideo} autoPlay playsInline style={{ width: "300px" }} />
        {callAccepted && (
          <video
            ref={userVideo}
            autoPlay
            playsInline
            style={{ width: "300px" }}
          />
        )}
      </div>
      <div>
        {!callAccepted && !receivingCall && (
          <button onClick={() => callUser(receiverId)}>Call User</button>
        )}
        {receivingCall && !callAccepted && (
          <div>
            <h1>{caller} is calling you...</h1>
            <button onClick={answerCall}>Answer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
