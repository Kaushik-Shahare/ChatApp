import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";
import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";

const Profile = () => {
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [change, setChange] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setChange(true);
  };
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setChange(true);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setChange(true);
  };

  const updateChange = () => {
    setChange(false);
    setShowMessage(true);
  };

  useEffect(() => {
    let timer;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showMessage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigator("/signin");
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    const id = localStorage.getItem("userId").split('"')[1];
    try {
      axios
        .get(
          `https://kaushik-shahare-chatapp.onrender.com/users/profile/${id}`,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("token").split('"')[1],
            },
          }
        )
        .then((response) => {
          let { username, fullName, email } = response.data;
          setUsername(username);
          setFullName(fullName);
          setEmail(email);
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  return (
    <div className="flex flex-col sm:h-[450px] md:h-[550px] lg:h-[750px] lg:w-[60%] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
      <ProfilePicture />
      <ProfileDetails
        username={username}
        fullName={fullName}
        email={email}
        handleUsernameChange={handleUsernameChange}
        handleFullNameChange={handleFullNameChange}
        handleEmailChange={handleEmailChange}
        change={change}
        updateChange={updateChange}
      />
      {showMessage && (
        <div className="flex justify-center border border-white p-2 m-3 rounded shadow-white shadow-md text-white">
          Profile has been updated
        </div>
      )}
    </div>
  );
};

export default Profile;
