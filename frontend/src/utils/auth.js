class Auth {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register({ email, password }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._getResponseData);
    }

    authorize({ email, password }) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._getResponseData);
    }

    getUserData(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._getResponseData);
    }
}

const auth = new Auth('https://auth.nomoreparties.co');

export default auth;