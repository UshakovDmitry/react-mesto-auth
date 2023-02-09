import { Link } from "react-router-dom";
import "../";

import React from "react";

const Register = () => {


  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="form auth__form">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
          <span className="auth__error"></span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="password"
        
            required
          />
          <span className="auth__error"></span>
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
