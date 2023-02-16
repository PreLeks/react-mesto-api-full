import React, { useEffect } from "react";
import cross from '../images/cross.svg';

function ImagePopup({ card }) {

    return (
        <>
            <img
                className="popup__image"
                src={card.card.link}
                alt={card.card.name}
            />
            <h3 className="popup__image-title">
                {card.card.name}
            </h3>
        </>

    );
}

export default ImagePopup;