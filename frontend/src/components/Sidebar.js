import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <SearchInput />
        <hr className="border-t border-gray-300 mx-3 my-4" />
        <Conversations />
      </div>
      <div className="w-full">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
