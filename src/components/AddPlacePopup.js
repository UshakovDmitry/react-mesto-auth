import React from "react";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from "./hooks/useCloseModal";
import useForm from "./hooks/useForm";

const AddPlacePopup = (props) => {
  useCloseModal(props.isOpen, props.onClose);

  // const [image, setImage] = React.useState("");
  // const [description, setDescription] = React.useState("");

  // const handleImageChange = (e) => {
  //   setImage(e.target.value);
  // };

  const { enteredValues, errors, handleChange, resetForm } = useForm();

  // const handleDescriptionChange = (e) => {
  //   setDescription(e.target.value);
  // };

  React.useEffect(() => {
    resetForm();
  }, [resetForm, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: enteredValues.name,
      link: enteredValues.link,
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
            value={enteredValues.name || ""}
            required
            onChange={handleChange}
          />
          <span className="form__input-error form__input-error_place_name">
            {errors.name}
          </span>
          <input
            className="form__input"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            value={enteredValues.link || ""}
            required
            onChange={handleChange}
          />
          <span className="form__input-error form__input-error_place_link">
            {errors.link}
          </span>
        </>
      }
    />
  );
};
export default AddPlacePopup;
