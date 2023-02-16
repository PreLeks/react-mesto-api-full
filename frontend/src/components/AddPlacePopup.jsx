import React, { useState, useEffect, useRef } from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import LabelSet from "./LabelSet";
import useFormValidation from "../utils/useFormValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const nameInputRef = useRef();
    const linkInputRef = useRef();
    const [buttonSubmitName, setButtonSubmitName] = useState('Создать');
    const { handleUpperInputChange, handleLowerInputChange, resetValid, isButtonValid } = useFormValidation(nameInputRef, linkInputRef);

    useEffect(() => {
        nameInputRef.current.value = '';
        linkInputRef.current.value = '';
        resetValid();
        setButtonSubmitName('Создать')
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        setButtonSubmitName('Сохранение...')
        onAddPlace({
            link: linkInputRef.current.value,
            name: nameInputRef.current.value
        });
    }

    return (
        <Popup
            name="add"
            nameBox="popup__box"
            isOpen={isOpen}
            onClose={onClose}
        >
            <PopupWithForm
                name="add"
                title="Новое место"
                btnText={buttonSubmitName}
                onSubmit={handleSubmit}
                isValid={isButtonValid}
            >
                <LabelSet
                    inputType="text"
                    inputClassType="titlecard"
                    placeholder="Название"
                    id="input-name"
                    minLength="2"
                    maxLength="30"
                    inputRef={nameInputRef}
                    onChange={handleUpperInputChange}
                    isOpen={isOpen}
                />
                <LabelSet
                    inputType="url"
                    inputClassType="urlcard"
                    placeholder="Ссылка на картинку"
                    id="input-link"
                    inputRef={linkInputRef}
                    onChange={handleLowerInputChange}
                    isOpen={isOpen}
                />
            </PopupWithForm>
        </Popup>
    );
}

export default AddPlacePopup;