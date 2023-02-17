import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useCloseModal from "./hooks/useCloseModal";
// import useForm from "./hooks/useForm";
// import Field from "./Field";

const EditAvatarPopup = (props) => {
  useCloseModal(props.isOpen, props.onClose);

  const avatarRef = useRef();

  // console.log(avatarRef)

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(avatarRef.current.value)
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  // useEffect(() => {
  //   if (props.isOpen) resetForm();
  // }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      // disabled={disabled}
      type="popup__form-container_type_edit-avatar"
    >
      <input
        className="form__input"
        type="url"
        id="avatar"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        // formik={formik}
        ref={avatarRef}
        required
      />

      {/* // <span className="form__input-error form__input-error_place_avatar"></span> */}
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
