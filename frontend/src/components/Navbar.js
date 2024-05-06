import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();
  if (!localStorage.getItem("username")) {
    navigator("/signin");
  }
  const username = localStorage.getItem("username");
  const user = username ? username.replace(/['"]+/g, "") : "";
  // rest of the code
  return (
    <nav className="bg-blue-500 p-6">
      <ul className="flex justify-between w-full">
        <li>
          <a href="/" className="text-white hover:text-blue-200">
            ChatApp
          </a>
        </li>
        <li>
          <a href="/signup" className="text-white hover:text-blue-200">
            👤{user}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
