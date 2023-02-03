import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className={`popup__form-container ${props.type && props.type}`}>
        <form
          onSubmit={props.onSubmit}
          className="form"
          name={props.name}
          noValidate
        >
          <h2 className="form__title">{props.title}</h2>

          {props.children}

          <button
            className="form__submit-button"
            type="submit"
            >
            {props.buttonText ? props.buttonText : "Сохранить"}
            </button>
            
        </form>

        <button
          className="popup__close-icon"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
