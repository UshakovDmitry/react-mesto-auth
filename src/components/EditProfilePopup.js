import React, { useEffect } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from './hooks/useCloseModal'

const EditProfilePopup = (props) => {
  
  useCloseModal(props.isOpen, props.onClose)



  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="form__input"
            type="text"
            placeholder="Имя"
            name="name"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChangeName}
            required
          />
          <span className="form__input-error form__input-error_place_name"></span>
          <input
            className="form__input"
            type="text"
            placeholder="Должность"
            name="about"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChangeDescription}
            required
          />
          <span className="form__input-error form__input-error_place_about"></span>
        </>
      }
    />
  );
};

export default EditProfilePopup;
