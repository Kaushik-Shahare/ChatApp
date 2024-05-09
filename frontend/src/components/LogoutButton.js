import React from "react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        window.location.href = "/signin";
      }}
      className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
