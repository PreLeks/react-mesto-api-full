import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Popup from "./Popup";
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import AcceptRegist from '../images/Accept-registration.png';
import RejectRegist from '../images/rejectRegistration.png';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import Token from "../utils/token";

function App({ history }) {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [idCardDelete, setIdCardDelete] = useState({ card: {} });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [imageForInfoTooltip, setImageForInfoTooltip] = useState('');
  const [textForInfoTooltip, setTextForInfoTooltip] = useState('');

  function getUserEmail(token) {
    auth
      .getUserData(token)
      .then(({ data }) => {
        if (data) {
          setUserEmail(data.email);
          setLoggedIn(true);
          history.push('/')
        } else {
          Token.removeToken();
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  };

  useEffect(() => {
    const token = Token.getToken();
    if (token) {
      getUserEmail(token);
    }
  }, [history]);

  function handleRegistration(formData) {
    auth
      .register(formData)
      .then((res) => {
        if (res.data) {
          setIsInfoTooltipPopupOpen(true);
          setImageForInfoTooltip(AcceptRegist);
          setTextForInfoTooltip("Вы успешно зарегистрировались!");
          history.push('/sign-in')
        }
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setImageForInfoTooltip(RejectRegist);
        setTextForInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
      })
  };

  function handleSignIn(formData) {
    auth
      .authorize(formData)
      .then(({ token }) => {
        if (token) {
          Token.saveToken(token);
          setUserEmail(formData.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setImageForInfoTooltip(RejectRegist);
        setTextForInfoTooltip("Неверный Email или пароль");
      })
  };

  function handleSignOut() {
    Token.removeToken();
    setLoggedIn(false);
    setUserEmail('');
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setIdCardDelete(card);
    setIsDeleteCardPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ isOpen: true, card: card });
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  };

  const handleUpdateAvatar = (avatarLink) => {
    api.patchAvatarInfo(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  };

  const handleUpdateUser = (userData) => {
    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  };

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card)
        .then((newCard) => setCards((state) => state.map(c => c._id === card._id ? newCard : c)))
        .catch((err) => console.log(err));
    }
    else {
      api.setLike(card)
        .then((newCard) => setCards((state) => state.map(c => c._id === card._id ? newCard : c)))
        .catch((err) => console.log(err));
    }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => {
          return cards.filter(item => item !== card);
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
          >
            <Header
              linkTitle="Выйти"
              link="/sign-in"
              onSingOut={handleSignOut}
              email={userEmail}
              loggedIn={loggedIn}
            />

            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />

            <Footer />
          </ProtectedRoute>

          <Route path="/sign-up">
            <Register
              onRegistration={handleRegistration}
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogIn={handleSignIn}
              loggedIn={loggedIn}
            />
          </Route>
        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          card={idCardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <Popup
          name="pic"
          nameBox="popup__pic"
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        >
          <ImagePopup
            card={selectedCard}
          />
        </Popup>

        <Popup
          name="info"
          nameBox="popup__box-info"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        >
          <InfoTooltip
            image={imageForInfoTooltip}
            text={textForInfoTooltip}
          />
        </Popup>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);