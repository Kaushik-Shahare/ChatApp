import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    axios
      .post(
        "https://kaushik-shahare-chatapp.onrender.com/auth/signup",
        {
          username: username,
          fullName: fullname,
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
        console.log(response);
        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data.message === "User already exists"
        ) {
          alert("User already exists");
          navigate("/signin");
        }
      });
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3x1 font-semibold text-center text-white">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-white">Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full p-2 my-2 border border-gray-300 rounded-lg bg-transparent text-white"
              value={username}
              onChange={handleUsernameChange}
              name="username"
            />
          </div>
          <div>
            <label className="text-white">Full Name:</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full p-2 my-2 border border-gray-300 rounded-lg bg-transparent text-white"
              value={fullname}
              onChange={handleFullnameChange}
              name="fullname"
            />
          </div>
          <div>
            <label className="text-white">Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-2 my-2 border border-gray-300 rounded-lg bg-transparent text-white"
              value={email}
              onChange={handleEmailChange}
              name="email"
            />
          </div>
          <div>
            <label className="text-white">Password:</label>
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-2 my-2 border border-gray-300 rounded-lg bg-transparent text-white"
              value={password}
              onChange={handlePasswordChange}
              name="password"
            />
            <input type="checkbox" onChange={togglePasswordVisibility} />
            <a className="text-white">Show Password</a>
          </div>
          <a className="text-blue-400" href="/signin">
            Already have an account?
          </a>
          <div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
