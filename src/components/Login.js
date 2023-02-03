
import React, {useState} from "react";
import Header from "./Header";
import PopupWithForm from "./PopupWithForm";




const Login = () => {


    const [isEmail, setIsEmail] = useState("")
    const [isPassword, setIsPassword] = useState("")
    
    
    
    // const handleSubmit = () => {
    
    // }
    
    const handleChangeEmail = () => {
        setIsEmail("")
    }
    
    const handleChangePassword = () => {
        setIsPassword("")
    }

  return (
    <>
      <Header />

      <PopupWithForm 
      title="Вход"
      buttonText="Войти"

    //   onSubmit={handleSubmit}
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
            onChange={handleChangeEmail}
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
            onChange={handleChangePassword}
            required
          />
          <span className="form__input-error form__input-error_place_about"></span>
        </>
      }

      
       />
    </>
  );
};

export default Login;
