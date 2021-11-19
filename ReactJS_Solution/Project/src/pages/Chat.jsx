import React, { useEffect, useState, useContext, useRef } from "react";

import { useParams } from "react-router-dom";

import { AuthContext } from "../AuthContextProvider";

import apiClient from "../apiClient";

import ChatMessage from "../components/ChatMessage";

const Chat = () => {
  const params = useParams(); // Pobierz parametry ścieżki url
  const message_to_user_id = params.id;
  const [messages, setMessages] = useState([]);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    apiClient.getMessages(message_to_user_id).then((data) => {
      if (data.loggedin !== false) {
        console.dir(data.data);
        setMessages(data.data);
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
      if (message.status === 1) {
        console.log(message);
        setMessages((oldMessages) => [...oldMessages, message.data]);
      }
    };
    const currentWS = ws.current;
    return () => currentWS.close();
  }, []);

  if (!isLoggedIn) {
    return <p>Zaloguj się aby wyświetlić chat z tym użytkownikiem</p>;
  }

  return (
    <>
      <div>
        <h1>Chat ID = {message_to_user_id}</h1>
        <div style={{ backgroundColor: "lightgrey", maxHeight: "600px" }}>
          {messages.length === 0 ? <p>Brak wiadomości</p> : <></>}
          {messages.map((message, idx) => {
            return (
              <ChatMessage key={`chat-message-${idx}`} message={message} />
            );
          })}
        </div>
      </div>
      <div>
        <form>
          <div>
            <label>Wiadomość</label>
            <input
              type="text"
              as="textarea"
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                apiClient
                  .sendMessages(messageText, message_to_user_id)
                  .then((data) => {
                    console.log(data);
                    if (data.sending) {
                      console.log("Wiadomość została wysłana");
                    }
                  });
              }}
            >
              Wyślij wiadomość
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
