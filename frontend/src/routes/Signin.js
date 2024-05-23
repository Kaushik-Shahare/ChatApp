import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signin logic here
    axios
      .post(
        "https://chat-app-api-theta.vercel.app/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.user.username)
        );
        localStorage.setItem("userId", JSON.stringify(response.data.user._id));
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data.message === "User not found"
        ) {
          alert("User doesnot exist");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-gray-500">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 my-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={handleEmailChange}
              name="email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 my-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={handlePasswordChange}
              name="password"
            />
          </div>
          <a className="text-gray-500" href="/signup">
            Don't have an account?
          </a>
          <div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
