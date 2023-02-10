import { Link } from "react-router-dom";
import useForm from "./hooks/useForm";


import React from "react";

const Register = (props) => {
  const { isValues, isErrors, handleChange } = useForm();


  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(isValues);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="form auth__form" onClick={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={isValues.email || ""}
            onChange={handleChange}
            required
          />
          <span className="auth__error">{isErrors.email}</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            value={isValues.password || ""}
            onChange={handleChange}
            required
          />
          <span className="auth__error">{isErrors.password}</span>
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
