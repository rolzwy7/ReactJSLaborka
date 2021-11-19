import React, { useContext, useState } from "react";

import apiClient from "../apiClient";

import { AuthContext } from "../AuthContextProvider";

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div>
      <h1>Logowanie</h1>
      <form>
        <div>
          <label>Nazwa Użytkownika</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Hasło</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={(e) => {
              // Zapobiega submit'owi formy
              e.preventDefault();
              // Zaloguj
              apiClient.login(userName, userPassword).then((data) => {
                setIsLoggedIn(data.loggedin);
                alert(
                  data.loggedin
                    ? "Użytkownik został zalogowany"
                    : "Nie udało się zalogować użytkownika"
                );
              });
            }}
          >
            Zaloguj się
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
