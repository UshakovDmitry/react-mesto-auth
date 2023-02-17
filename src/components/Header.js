import React from "react";
// import { Route, Routes, Link } from "react-router-dom";
import logo from "../images/logo.svg";

import { useLocation, Link } from "react-router-dom";
function Header(props) {
  let location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {/* <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to={props.status ? "/sign-in" : "/sign-up"}  className="header__link">
              {props.status ? "Войти" : "Регистрация"}
            </Link>
          }
        />
      </Routes> */}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {props.loggedIn && (
        <nav className="header__nav">
          <span>{props.userEmail}</span>
          <button
            className="header__sign-out"
            onClick={() => props.onSignOut()}
          >
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
