class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._getResponseData);
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  patchAvatarInfo(avatarLink) {
    const body = { avatar: avatarLink };
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(body),
    })
    .then(this._getResponseData);
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    })
    .then(this._getResponseData);
  }

  addNewCard(data) {
    const body = { name: data.name, link: data.link };
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(body),
    })
    .then(this._getResponseData);
  }

  setLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      headers: this._headers,
      method: "PUT",
    })
    .then(this._getResponseData);
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    })
    .then(this._getResponseData);
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      headers: this._headers,
      method: "DELETE",
    })
    .then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'f8dcca4e-e7c2-43b6-8e6c-2fa021994509',
    'Content-Type': 'application/json'
  }
});

export default api;