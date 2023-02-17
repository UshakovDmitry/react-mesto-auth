import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import React from "react";

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
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            value={enteredValues.email || ""}
            required
          />

          <span className="auth__error">{errors.email}</span>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            value={enteredValues.password || ""}
            onChange={handleChange}
            required
          />
          <span className="auth__error">{errors.password}</span>

          <button
            disabled={Boolean(errors.email || errors.password)}
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="auth__login-hint">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;
