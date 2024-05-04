import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Check if the user is authenticated by checking if the token is present in the local storage
  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      navigator("/signin");
    }

    console.log(token);
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page</p>
    </div>
  );
};

export default Home;
