import React, { useEffect, useState } from "react";
import axios from "axios";

const Message = ({ userId, message }) => {
  const [username, setUsername] = useState("");
  const username1 = localStorage.getItem("username");
  const localUsername = username1 ? username1.replace(/['"]+/g, "") : "";

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/users/${userId}`, {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token").split('"')[1],
          },
        })
        .then((response) => {
          setUsername(response.data.username);
        });
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  return (
    <div
      className={`flex space-x-4 pb-3 ${
        username === localUsername ? "justify-end" : "justify-start"
      }`}
    >
      {username !== localUsername && (
        <div className="pt-3">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
            className="h-10 w-10 rounded-full "
          />
        </div>
      )}
      <div
        className={`inline-flex flex-col  space-x-4 rounded-xl px-2 max-w-xl ${
          username === localUsername ? "bg-blue-500" : "bg-sky-500"
        }`}
      >
        <div>
          <p className="font-bold">{username}</p>
          <p className="break-words">{message}</p>
        </div>
        <div className="">time</div>
      </div>
      {username === localUsername && (
        <div className="pt-3">
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
            className="h-10 w-10 rounded-full "
          />
        </div>
      )}
    </div>
  );
};

export default Message;
