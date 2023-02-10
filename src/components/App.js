import { Routes, Route } from "react-router-dom";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup.js";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import ImagePopup from "./ImagePopup.js";
import React from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

import api from "../utils/Api";
import * as auth from '../utils/auth';

export default function App() {
  // STATES
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationStatus, setisRegistrationStatus] = React.useState(false);

  // EFFECTS

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  // Получаем карточки с сервера и обновляем при изменении

  React.useEffect(() => {
    api
      .getDefaultCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [cards]);

  //

  const handleCardDelete = (cardID) => {
    console.log(cardID);
    api
      .deleteCard(cardID)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardID));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  //
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleUpdateUser = (newUserInfo) => {
    api
      .editUserData(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = (newURL) => {
    api
      .setUserAvatar(newURL)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopup((isEditAvatarPopupOpen) => !isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopup((isEditProfilePopupOpen) => !isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopup((isAddPlacePopupOpen) => !isAddPlacePopupOpen);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // const openInfoTooltip = () => {
  //   setIsInfoTooltipOpen((isInfoTooltipOpen) => !isInfoTooltipOpen);
  // };

  // Функция закрытия всех попапов

  const closeAllPopups = () => {
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setSelectedCard({});
    setIsInfoTooltipOpen((prev) => !prev)
  };

  // REGISTER AND LOGIN //
  //____________________//

  const handleRegistration = (data) => {
    return auth.register(data)
      .then((data) => {
        setisRegistrationStatus(true);
        setIsInfoTooltipOpen((prev) => !prev);
        // history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setisRegistrationStatus(false);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  };

  const handleAuthorization = (data) => {
    return auth.authorize(data)
      .then((data) => {
        setIsLoggedIn((isLoggedIn) => !isLoggedIn);
        localStorage.setItem("jwt", data.token);
        // handleTokenCheck();
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header loggedIn={isLoggedIn} />

          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegistration} />}
            />

            <Route
              path="/sign-in"
              element={<Login onLogin={handleAuthorization} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  loggedIn={isLoggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationStatus}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
