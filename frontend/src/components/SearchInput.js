import React, { useState } from "react";

const SearchInput = ({ conversations, changeConversation }) => {
  const [search, setSearch] = useState("");

  // const newConversation = async (username) => {
  //   await axios.post(
  //     "/chats/create",
  //     { participants: [localStorage.getItem("userId")], username: username },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     }
  //   );
  // };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      return;
    }
    const conversation = conversations.find(
      (conversation) =>
        conversation.username.toLowerCase() === search.toLowerCase()
    );
    if (conversation) {
      changeConversation(conversation._id, conversation.username);
      setSearch("");
    } else {
      // const confirm = window.confirm(
      //   "No user found with that name. Do you want to start a new conversation with the user?"
      // );
      // if (confirm) {
      //   newConversation(search);
      //   setSearch("");
      // }
      alert("No user found with that name");
      setSearch("");
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
