


import Header from "./Header";
import PopupWithForm from "./PopupWithForm";

import React, {useState} from "react";

const Register = () => {

const [isEmail, setIsEmail] = useState("")
const [isPassword, setIsPassword] = useState("")



const handleSubmit = () => {

}

const hsndleChangeEmail = () => {
    setIsEmail
}

const hsndleChangePassword = () => {
    setIsPassword
}



  return (
    <>
      <Header 
        // button={}
      />

      <PopupWithForm 
      title="Регистрация"
      onSubmit={handleSubmit}
      buttonText="Регистрация"
      children={
        <>
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            name="name"
            minLength="2"
            maxLength="40"
            value={isEmail}
            onChange={hsndleChangeEmail}
            required
          />
          <span className="form__input-error form__input-error_place_name"></span>
          <input
            className="form__input"
            type="password"
            placeholder="Пароль"
            name="about"
            minLength="2"
            maxLength="200"
            value={isPassword}
            onChange={hsndleChangePassword}
            required
          />
          <span className="form__input-error form__input-error_place_about"></span>
        </>
      }
      
       />
    </>
  );
};

export default Register;
