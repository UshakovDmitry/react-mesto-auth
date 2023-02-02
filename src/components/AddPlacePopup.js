import React from "react";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from "./hooks/useCloseModal";

const AddPlacePopup = (props) => {
  
  useCloseModal(props.isOpen, props.onClose);

  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: description,
      link: image,
    });
  }

  return (
    <PopupWithForm
      name="add-image"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      children={
        <>
          <input
            className="form__input"
            type="text"
            placeholder="Название"
            name="name"
            minLength="2"
            maxLength="30"
            required
            onChange={handleDescriptionChange}
          />
          <span className="form__input-error form__input-error_place_name"></span>
          <input
            className="form__input"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            onChange={handleImageChange}
          />
          <span className="form__input-error form__input-error_place_link"></span>
        </>
      }
    />
  );
};
export default AddPlacePopup;
