import React, { useEffect, useState } from "react";
import { generateAuthHeader } from "../../utils/authHelper";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    console.log("getUsers successful");
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          ...generateAuthHeader(),
        },
      });

      const data = await response.json();
      setUsers(data);

      console.log("Here are the users:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
};

export default Users;
