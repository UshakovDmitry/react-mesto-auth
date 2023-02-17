import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from "../hooks/useCloseModal";
import useForm from "../hooks/useForm";

const EditProfilePopup = (props) => {
  useCloseModal(props.isOpen, props.onClose);

  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, resetForm } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        type="text"
        placeholder="Имя"
        name="name"
        minLength="2"
        maxLength="40"
        value={enteredValues.name || ""}
        onChange={handleChange}
      />
      <span id="name-error" className="form__input-error">
        {errors.name}
      </span>

      <input
        className="form__input"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="Должность"
        name="about"
        value={enteredValues.about || ""}
        onChange={handleChange}
      />
      <span id="name-error" className="form__input-error">
        {errors.name}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
