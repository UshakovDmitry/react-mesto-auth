import { useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

const Card = (props) => {
  const dataUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === dataUser._id;

  const isLiked = props.card.likes.some((i) => i._id === dataUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  const handleCardLike = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card._id);
  };

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <h2 className="card__caption">{props.card.name}</h2>
      <div className="card__like-container">
        <button
          className={cardLikeButtonClassName}
          onClick={handleCardLike}
          type="button"
          aria-label="Лайк"
        ></button>
        <p className="card__likes-counter">{props.card.likes.length}</p>
      </div>
      {isOwn && (
        <button
          className="card__delete"
          type="button"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
};

export default Card;
