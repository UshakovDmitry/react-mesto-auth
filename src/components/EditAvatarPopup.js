import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from './hooks/useCloseModal'

const EditAvatarPopup = (props) => {
  useCloseModal(props.isOpen , props.onClose)
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      type="popup__form-container_type_edit-avatar"
      children={
        <>
          <input
            className="form__input"
            type="url"
            placeholder="Ссылка на новый аватар"
            name="avatar"
            required
            ref={avatarRef}
          />
          <span className="form__input-error form__input-error_place_avatar"></span>
        </>
      }
    />
  );
};
export default EditAvatarPopup;
