import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup.js";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import ImagePopup from "./ImagePopup.js";
import React, { useState, useCallback } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

import api from "../utils/Api";
import * as auth from "../utils/auth";

export default function App() {
  const navigate = useNavigate();

  // STATES
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationStatus, setisRegistrationStatus] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState("");

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

  React.useEffect(() => {
    handleTokenCheck();
  }, [navigate]);

  React.useEffect(() => {
    api
      .getDefaultCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
        // console.log(data);
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

  const handleEditAvatarClick = useCallback(() => setEditAvatarPopup(true), []);

  const handleEditProfileClick = useCallback(() => setEditProfilePopup(true),[]);

  const handleAddPlaceClick = useCallback(() => setAddPlacePopup(true), []);

  const handleCardClick = useCallback((card) => setSelectedCard(card));

  // Функция закрытия всех попапов

  const closeAllPopups = () => {
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  //  REGISTER API CALL //

  const handleRegistration = (data) => {
    return auth
      .register(data)
      .then(() => {
        setisRegistrationStatus(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setisRegistrationStatus(true);
        setIsInfoTooltipOpen(true);
      });
  };

  //   LOGIN API CALL   //

  const handleAuthorization = (data) => {
    return auth
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
      });
  };

  // console.log(localStorage.getItem('jwt'))

  //    TOCKEN CHECK    //

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    // console.log('токен', jwt);

    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        // console.log('получаю контент',data);
        setAuthorizationEmail(data.email);
        setCurrentUser(data);
        setIsLoggedIn(true);
        navigate("/");
        // console.log(data.email)
      })
      .catch((err) => console.log(err));
    api
      .getDefaultCards(jwt)
      .then((defaultCards) => {
        setCards(defaultCards);
      })
      .catch((err) => console.log(err));
  };

  //     SIGN OUT     //

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setIsLoggedIn(false);
    setCurrentUser({});
    setAuthorizationEmail("");
  };
  // console.log(authorizationEmail)

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            loggedIn={isLoggedIn}
            userEmail={authorizationEmail}
            onSignOut={handleSignOut}
          />

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
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />
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
