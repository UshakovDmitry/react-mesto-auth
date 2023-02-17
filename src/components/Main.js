import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </button>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__user-info">{currentUser.about}</p>
        </div>
        <button
          className="profile__button"
          type="button"
          aria-label="Добавить картинку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardDelete={props.onCardDelete}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};
export default Main;
