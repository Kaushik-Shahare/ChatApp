import React from "react";

const IncomingCallNotification = ({ onAccept, onReject }) => (
  <div
    style={{
      position: "fixed",
      top: "10px",
      right: "10px",
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px",
      borderRadius: "5px",
    }}
  >
    <h3>Incoming Call...</h3>
    <button onClick={onAccept} style={{ marginRight: "10px" }}>
      Accept
    </button>
    <button onClick={onReject}>Reject</button>
  </div>
);

export default IncomingCallNotification;
