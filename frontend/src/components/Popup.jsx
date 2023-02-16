import React, { useEffect } from "react";
import cross from '../images/cross.svg';

function Popup({ name, nameBox, isOpen, onClose, children }) {

    const classPopup = `popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`;

    useEffect(() => {
        if (!isOpen) return;

        function handleESC(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleESC);

        return () => document.removeEventListener("keydown", handleESC);
    }, [isOpen]);

    const handleCloseOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            className={classPopup}
            onMouseDown={handleCloseOverlayClick}
        >
            <div className={nameBox}>
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}>
                    <img className="popup__cross" src={cross} alt="Кнопка закрытия" />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Popup;