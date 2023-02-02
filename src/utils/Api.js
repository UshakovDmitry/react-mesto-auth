class Api {
  constructor(settings) {
    this._address = settings.address;
    this._headers = settings.headers;
  }

  _responseHandler = (response) =>
    response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);

  getUserInfo = () =>
    fetch(`${this._address}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._responseHandler);

  getDefaultCards = () =>
    fetch(`${this._address}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._responseHandler);

  editUserData = (newData) =>
    fetch(`${this._address}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newData),
    }).then(this._responseHandler);

  setUserAvatar = (link) =>
    fetch(`${this._address}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(link),
    }).then(this._responseHandler);

  addCard = (card) =>
    fetch(`${this._address}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._responseHandler);

  setLike = (cardId) =>
    fetch(`${this._address}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._responseHandler);

  deleteLike = (cardId) =>
    fetch(`${this._address}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._responseHandler);

  // like/dislike
  toggleLike = (cardId, isLiked) => {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then(this._responseHandler);
  };

  deleteCard = (id) =>
    fetch(`${this._address}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._responseHandler);
}

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-55/",
  headers: {
    authorization: "affe4fa5-c3d4-4b50-80fd-680043df80cf",
    "Content-Type": "application/json",
  },
});
export default api;
