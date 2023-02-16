import React from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onSubmit, card }) {

  function handleClick(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <Popup
      name="del"
      nameBox="popup__box"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        name="del"
        title="Вы уверены?"
        btnText="Да"
        onSubmit={handleClick}
        isValid={true}
      >
      </PopupWithForm>
    </Popup>
  )
}

export default DeleteCardPopup;