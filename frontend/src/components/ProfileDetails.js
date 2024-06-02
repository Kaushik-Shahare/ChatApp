import React from "react";
import axios from "axios";

const ProfileDetails = ({
  username,
  fullName,
  email,
  handleUsernameChange,
  handleFullNameChange,
  handleEmailChange,
  change,
  updateChange,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId").split('"')[1];
    try {
      axios.put(
        `https://kaushik-shahare-chatapp.onrender.com/users/profile/${id}`,
        {
          username,
          email,
          fullName,
        },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token").split('"')[1],
          },
        }
      );
      updateChange();
    } catch (error) {
      console.error("Error Updating data: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full w-80 m-auto">
      <form className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-white">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="rounded-lg p-2 bg-transparent text-white border-b border-l border-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-white">
            Full Name:
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            value={fullName}
            onChange={handleFullNameChange}
            className="rounded-lg p-2 bg-transparent text-white border-b border-l border-white"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-white">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="rounded-lg p-2 bg-transparent text-white border-b border-l border-white"
          />
        </div>
      </form>
      {change && (
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white rounded-lg p-2"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default ProfileDetails;
