import React from "react";

import apiClient from "../apiClient";

// Formik + Yup imports
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validation_schema = Yup.object().shape({
  user_name: Yup.string().required("Nazwa użytkownika jest wymagana"),
  user_password: Yup.string().required("Hasło jest wymagane"),
});

const RegisterPage = () => {
  return (
    <div>
      <h1>Rejestracja</h1>
      <Formik
        validationSchema={validation_schema}
        initialValues={{
          user_name: "",
          user_password: "",
        }}
        onSubmit={(values) => {
          // Ta funkcja zostanie wywołana tylko wtedy kiedy forma jest poprawna
          console.log(values);
          apiClient
            .register(values.user_name, values.user_password)
            .then((data) => {
              alert(
                data.register
                  ? "Stworzono użytkownika"
                  : "Nie udało się stworzyć użytkownika"
              );
            });
        }}
      >
        <Form>
          <div>
            <label>Nazwa Użytkownika</label>
            <Field type="text" name="user_name" />
            <ErrorMessage name="user_name" />
          </div>
          <div>
            <label>Hasło</label>
            <Field type="password" name="user_password" />
            <ErrorMessage name="user_password" />
          </div>
          <div>
            <button type="submit">Zarejestruj się</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
