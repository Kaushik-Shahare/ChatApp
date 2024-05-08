import React, { useState } from "react";

const SearchInput = ({ conversations, changeConversation }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    const conversation = conversations.find((conversation) =>
      conversation.fullName.toLowerCase().includes(search.toLowerCase())
    );
    console.log(conversation);
    if (conversation) {
      changeConversation(conversation.id);
      setSearch("");
    } else {
      alert("No user found with that name");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        className="bg-gray-200 px-2 py-1 rounded-lg"
      />
      <button className="bg-blue-500 text-white px-2 py-1 rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
