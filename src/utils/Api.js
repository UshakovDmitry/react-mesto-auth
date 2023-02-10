import { checkResponse } from './Utils';


class Api {
  constructor(settings) {
    this._address = settings.address;
    this._headers = settings.headers;
  }

  // _responseHandler = (response) =>
  //   response.ok
  //     ? response.json()
  //     : Promise.reject(`Ошибка: ${response.status}`);

  getUserInfo = () =>
    fetch(`${this._address}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(checkResponse);

  getDefaultCards = () =>
    fetch(`${this._address}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(checkResponse);

  editUserData = (newData) =>
    fetch(`${this._address}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newData),
    }).then(checkResponse);

  setUserAvatar = (link) =>
    fetch(`${this._address}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(link),
    }).then(checkResponse);

  addCard = (card) =>
    fetch(`${this._address}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(checkResponse);

  setLike = (cardId) =>
    fetch(`${this._address}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(checkResponse);

  deleteLike = (cardId) =>
    fetch(`${this._address}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(checkResponse);

  // like/dislike
  toggleLike = (cardId, isLiked) => {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then(checkResponse);
  };

  deleteCard = (id) =>
    fetch(`${this._address}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(checkResponse);
}

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-55/",
  headers: {
    authorization: "affe4fa5-c3d4-4b50-80fd-680043df80cf",
    "Content-Type": "application/json",
  },
});
export default api;
