import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../AuthContextProvider";
import apiClient from "../apiClient";

import UserListItem from "../components/UserListItem";

const UserListPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Jeśli użytkownik jest zalogowany ustaw listę użytkowników
  useEffect(() => {
    apiClient.getUsers().then((data) => {
      if (data.loggedin !== false) {
        console.log(data.data);
        setUsers(data.data);
      }
    });
  }, []);

  // WebSocket
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => console.log("ws onopen");
    ws.current.onclose = () => console.log("ws onclose");
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.status === 3) {
        console.log(message);
        setUsers((oldUsers) => [...oldUsers, message.data]);
      }
    };
    const currentWS = ws.current;
    return () => currentWS.close();
  }, []);

  if (!isLoggedIn) {
    return <p>Zaloguj się aby wyświetlić użytkowników czatu</p>;
  }
  return (
    <div>
      <h1>Lista użytkowników</h1>
      {users.map((user, idx) => (
        <UserListItem key={`user-list-item-${idx}`} user={user} />
      ))}
    </div>
  );
};

export default UserListPage;
