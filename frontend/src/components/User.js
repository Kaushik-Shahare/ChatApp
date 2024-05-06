import React from "react";

const User = ({ user }) => {
  return (
    <div className="flex flex-col space-y-4 justify-around">
      <div className="flex bg-blue-500 space-x-4 h-16 w-1/1 items-center">
        <img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          alt="avatar"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="text-lg font-bold">{user.username}</p>
          <p className="text-gray-630">Here is last chat</p>
        </div>
      </div>
    </div>
  );
};

export default User;
