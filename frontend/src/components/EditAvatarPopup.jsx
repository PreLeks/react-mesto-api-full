import React, { useEffect, useRef, useState } from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import LabelSet from "./LabelSet"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = useRef();
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [buttonSubmitName, setButtonSubmitName] = useState('Сохранить');

  useEffect(() => {
    inputRef.current.value = '';
    setIsLinkValid(false);
    setButtonSubmitName('Сохранить')
  }, [isOpen]);

  useEffect(() => {
    setIsButtonValid(isLinkValid);
  }, [isLinkValid]);

  function handleClick(e) {
    e.preventDefault();
    setButtonSubmitName('Сохранение...')
    onUpdateAvatar(inputRef.current.value);
    inputRef.current.value = '';
  }

  const handleLinkChange = () => setIsLinkValid(inputRef.current.validity.valid);

  return (
    <Popup
      name="avatar"
      nameBox="popup__box"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        btnText={buttonSubmitName}
        onSubmit={handleClick}
        isValid={isButtonValid}
      >
        <LabelSet
          inputType="url"
          inputClassType="urlavatar"
          placeholder="Ссылка на картинку"
          id="input-avatar"
          onChange={handleLinkChange}
          inputRef={inputRef}
          isOpen={isOpen}
        />
      </PopupWithForm>
    </Popup>
  );
}

export default EditAvatarPopup;