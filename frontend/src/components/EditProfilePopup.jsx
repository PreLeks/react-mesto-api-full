import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import LebelSet from "./LabelSet";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [isAboutValid, setIsAboutValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [buttonSubmitName, setButtonSubmitName] = useState('Сохранить')

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsAboutValid(true);
    setIsNameValid(true);
    setButtonSubmitName('Сохранить');
  }, [currentUser, !isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsNameValid(e.target.validity.valid);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setIsAboutValid(e.target.validity.valid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setButtonSubmitName('Сохранение...')
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setIsButtonValid(isAboutValid && isNameValid);
  }, [isNameValid, isAboutValid])

  return (
    <Popup
      name="edit"
      nameBox="popup__box"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        btnText={buttonSubmitName}
        onSubmit={handleSubmit}
        isValid={isButtonValid}
      >
        <LebelSet
          inputType="text"
          inputClassType="username"
          placeholder="Ваше имя"
          id="input-title"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          isOpen={isOpen}
        />

        <LebelSet
          inputType="text"
          inputClassType="userjob"
          placeholder="Информация о работе"
          id="input-job"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
          isOpen={isOpen}
        />
      </PopupWithForm>
    </Popup>
  );
}

export default EditProfilePopup;