import React from "react";

function PopupWithForm({ name, title, btnText, children, onSubmit, isValid }) {

    const classBtnSubmit = `popup__button popup__button_type_save-upload ${!isValid && "popup__button_disabled"}`;

    return (


        <form
            className="popup__form"
            name={`form-${name}`}
            onSubmit={onSubmit}
        >
            <h3 className="popup__title">{title}</h3>
            {children}
            <button
                type="submit"
                className={classBtnSubmit}
                value={btnText}
                disabled={!isValid}
            >
                {btnText}
            </button>
        </form>

    );
}

export default PopupWithForm;