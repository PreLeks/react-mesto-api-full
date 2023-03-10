class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      err.statusCode = res.status;
      return Promise.reject(err);
    })
  }
    
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(this._getResponseData);
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  patchAvatarInfo(avatarLink) {
    const body = { avatar: avatarLink };
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(body),
    })
    .then(this._getResponseData);
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    })
    .then(this._getResponseData);
  }

  addNewCard(data) {
    const body = { name: data.name, link: data.link };
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(body),
    })
    .then(this._getResponseData);
  }

  setLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      credentials: 'include',
      headers: this._headers,
      method: "PUT",
    })
    .then(this._getResponseData);
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      credentials: 'include',
      headers: this._headers,
      method: "DELETE",
    })
    .then(this._getResponseData);
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      credentials: 'include',
      headers: this._headers,
      method: "DELETE",
    })
    .then(this._getResponseData);
  }
}

const api = new Api({
  baseUrl: 'https://api.mestopreleks.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;