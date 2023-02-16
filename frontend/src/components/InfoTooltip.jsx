import React from "react";

const InfoTooltip = ({ image, text }) => {
    return (
        <>
            <img className="popup__info" src={image} alt="Галочка" />
            <h2 className="popup__info-text">{text}</h2>
        </>
    )
}

export default InfoTooltip;