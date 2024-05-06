import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import Chats from "../components/Chats";

const Home = () => {
  // Check if the user is authenticated by checking if the token is present in the local storage
  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigator("/signin");
    }
  }, []);

  return (
    <div className="h-screen ">
      <Navbar />
      <div className="flex justify-around h-full">
        <div className="bg-white-500 h-1/1 w-1/3 ">
          <Users />
        </div>
        <Chats />
      </div>
    </div>
  );
};

export default Home;
