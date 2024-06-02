import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/profile.png";

const UserSidebar = () => {
  const navigator = useNavigate();
  const username = localStorage.getItem("username").split('"')[1];
  return (
    <div className="flex justify-between ">
      <div>
        <div className="flex items-center justify-center">
          <img
            src={img}
            alt="profile"
            className="w-16 h-16 rounded-full border border-white cursor-pointer"
            onClick={() => {
              navigator("/profile");
            }}
          />
          <h1 className="text-white ml-5">{username}</h1>
        </div>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          window.location.href = "/signin";
        }}
        className=" text-white px-4 py-2 rounded-lg "
      >
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H6zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default UserSidebar;
