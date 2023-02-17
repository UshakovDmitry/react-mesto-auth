import { Link } from "react-router-dom";
import useForm from "./hooks/useForm";
// import Field from "./Field";


import React from "react";
// import { Form } from "formik";


const Register = (props) => {
  const { enteredValues, errors, handleChange } = useForm();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(enteredValues);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>

        <form
          className="form auth__form"
          onSubmit={handleSubmit}
          // disabled={disabled}
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            // formik={formik}
            onChange={handleChange}
            value={enteredValues.email || ""}
            // errorClassName="auth__error"
            required
          />

          <span className="auth__error">{errors.email}</span>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            // formik={formik}
            // errorClassName="auth__error"
            value={enteredValues.password || ""}
            onChange={handleChange}
            required
          />
          <span className="auth__error">{errors.password}</span>

          <button type="submit">Зарегистрироваться</button>
          
        </form>
        <Link to="/sign-in" className="auth__login-hint">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;
