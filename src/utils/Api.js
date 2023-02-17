import { checkResponse } from "./Utils";




class Api {
  constructor(options) {
    this.headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

 loadDefaultData = () => Promise.all([this.getUserInfo(), this.getDefaultCards()]);

  getUserInfo = async () => {
    const res = await fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this.headers,
    });
    return checkResponse(res);
  };

  getDefaultCards = async () => {
    const res = await fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this.headers,
    });
    return checkResponse(res);
  };

  editUserData = async (newData) => {
    const res = await fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(newData),
    });
    return checkResponse(res);
  };

  setUserAvatar = async (link, jwt) => {
    const res = await fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers, 
      'Authorization': `Bearer ${jwt}`,
      body: JSON.stringify({
        avatar: link.avatar,
      })});
       return checkResponse(res);
  };

  addCard = async (card) => {
    const res = await fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(card),
    });
    return checkResponse(res);
  };

  setLike = async (cardId) => {
    const res = await fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
    return checkResponse(res);
  };

  deleteLike = async (cardId) => {
    const res = await fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
    return checkResponse(res);
  };

  toggleLike = async (cardId, isLiked) => {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this.headers,
    });
    return checkResponse(res);
  };

  deleteCard = async (id) => {
    const res = await fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
    return checkResponse(res);
  };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55/",
  headers: {
    authorization: "affe4fa5-c3d4-4b50-80fd-680043df80cf",
    "Content-Type": "application/json",
  },
});
export default api;
