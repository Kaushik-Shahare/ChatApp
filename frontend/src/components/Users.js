import React, { useState } from "react";
import User from "./User";
import InfiniteScroll from "react-infinite-scroll-component";

const Users = () => {
  const username = localStorage.getItem("username");
  const user = username ? username.replace(/['"]+/g, "") : "";
  // rest of the code

  // Initial list of users
  const [users, setUsers] = useState(Array.from({ length: 20 }));

  // Function to fetch more users
  const fetchMoreUsers = () => {
    setTimeout(() => {
      setUsers(users.concat(Array.from({ length: 18 })));
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2>Users</h2>
        <div className="overflow-auto h-96 w-1/1 bg-white-500">
          <InfiniteScroll
            dataLength={users.length - 1}
            next={fetchMoreUsers}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            className="overflow-auto"
          >
            {users.map((_, i) => (
              <User key={i} user={{ username: "User " + (i + 1) }} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <div className="bg-green-500 h-16 w-1/3 bottom-0 absolute">{user}</div>
    </div>
  );
};

export default Users;
