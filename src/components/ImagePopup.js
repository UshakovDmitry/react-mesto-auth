import React from "react";
import useCloseModal from './hooks/useCloseModal'


function ImagePopup(props) {


  useCloseModal(props.card.link , props.onClose)

  return (
    <div
      className={`popup popup_type_full-image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <figure className="full-image">
          <img className="full-image__image" src={props.card.link} alt="" />
          <figcaption className="full-image__caption">
            {props.card.name}
          </figcaption>
        </figure>
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

export default ImagePopup;
