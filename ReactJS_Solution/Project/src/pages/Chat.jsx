import React, { useEffect, useState, useContext, useRef } from "react";

import { useParams } from "react-router-dom";

import { AuthContext } from "../AuthContextProvider";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import apiClient from "../apiClient";

import ChatMessage from "../components/ChatMessage";

const validation_schema = Yup.object().shape({
  message_text: Yup.string().required("Wiadomość nie może być pusta"),
});

const Chat = () => {
  const params = useParams(); // Pobierz parametry ścieżki url
  const message_to_user_id = params.id;
  const [messages, setMessages] = useState([]);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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
        <Formik
          validationSchema={validation_schema}
          initialValues={{
            message_text: "",
          }}
          onSubmit={(values) => {
            // Ta funkcja zostanie wywołana tylko wtedy kiedy forma jest poprawna
            console.log(values);
            apiClient
              .sendMessages(values.message_text, message_to_user_id)
              .then((data) => {
                console.log(data);
                if (data.sending) {
                  console.log("Wiadomość została wysłana");
                }
              });
          }}
        >
          <Form>
            <div>
              <label>Wiadomość</label>
              <Field type="text" as="textarea" name="message_text" />
              <ErrorMessage name="message_text" />
            </div>
            <div>
              <button type="submit">Wyślij wiadomość</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Chat;
