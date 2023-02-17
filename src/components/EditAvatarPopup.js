import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from "../hooks/useCloseModal";

const EditAvatarPopup = (props) => {
  useCloseModal(props.isOpen, props.onClose);

  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      type="popup__form-container_type_edit-avatar"
    >
      <input
        className="form__input"
        type="url"
        id="avatar"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        ref={avatarRef}
        required
      />
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
