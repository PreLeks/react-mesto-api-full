import React, { useContext } from "react";
import trash from '../images/trash.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleCardClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <>
            {isOwn && (<button
                type="button"
                className="elements__trash"
                onClick={handleDeleteClick}>
                <img src={trash} alt="Корзина" />
              </button>
            )}
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="elements__rating">
                <h2 className="elements__name">{card.name}</h2>
                <div className="elements__likeBox">
                    <button
                        type="button"
                        className={`elements__heart ${isLiked ? "elements__heart_active" : ""}`}
                        onClick={handleLikeClick}>
                    </button>
                    <h4 className="elements__likeCounter">{card.likes.length}</h4>
                </div>
            </div>
        </>
    );
}

export default Card;