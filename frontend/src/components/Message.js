import React from "react";

const Message = ({ username }) => {
  const username1 = localStorage.getItem("username");
  const localUsername = username1 ? username1.replace(/['"]+/g, "") : "";

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
          <p className="break-words">
            Hello this is a demo chat and this is the paragraph to test if the
            paragraph starts with next line if this excides certain limit of
            this line
          </p>
        </div>
        <div className="">
          <a>time</a>
        </div>
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
