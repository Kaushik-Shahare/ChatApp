import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/profile.png";

const ProfilePicture = () => {
  const navigator = useNavigate();
  const navigateToHome = () => {
    navigator("/home");
  };

  return (
    <div className="flex flex-col justify-center text-center h-1/3">
      <button
        className="absolute top-0 left-0 h-12 w-12  rounded-full"
        onClick={navigateToHome}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
          fill="gray"
        >
          <path d="M12,2.1L1,12h3v9h7v-6h2v6h7v-9h3L12,2.1z M18,19h-3v-6H9v6H6v-8.8l6-5.4l6,5.4V19z"></path>
        </svg>
      </button>
      <div className="m-auto w-40 h-40 rounded-full bg-gray-500">
        <img
          src={img}
          alt="profile"
          className="w-full h-full rounded-full border border-white"
        />
      </div>
      <h1 className="text-white">Profile Picture</h1>
    </div>
  );
};

export default ProfilePicture;
