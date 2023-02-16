import React, { useContext } from "react";
import pencil from '../images/pencil.svg';
import plus from '../images/plus.svg';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const cardsSet = cards.map(card => (
        <article key={card._id} className="elements__element">
            <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
            />
        </article>
    )
    )

    return (
        <main>
            <section className="profile">
                <button
                    type="button"
                    className="profile__avatar"
                    onClick={onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__editBtn profile__editBtn_popup"
                        onClick={onEditProfile}>
                        <img className="profile__pencil" src={pencil} alt="Кнопка редактирования" />
                    </button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__addBtn profile__addBtn_popup"
                    onClick={onAddPlace}>
                    <img className="profile__plus" src={plus} alt="Кнопка добавления" />
                </button>
            </section>
            <section className="elements">
                {cardsSet}
            </section>
        </main>
    );
}

export default Main;