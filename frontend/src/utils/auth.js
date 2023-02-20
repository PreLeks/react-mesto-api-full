class Auth {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
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

    register({ email, password }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then(this._getResponseData);
    }

    signOut() {
        return fetch(`${this.baseUrl}/signout`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(this._getResponseData);
    }
}

const auth = new Auth('https://api.mestopreleks.nomoredomains.work');

export default auth;