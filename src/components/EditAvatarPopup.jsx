import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ onClose, isOpen, onUpdateAvatar }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(e.target.value);
  }

  const [isLinkValid, SetLinkValid] = useState(false);
  const [validationMessage, SetValidationMessage] = useState(false);

  const validate = (e) => {
    SetLinkValid(e.target.validity.valid);
    SetValidationMessage(e.target.validationMessage);
  }
  return (
    <PopupWithForm
        name="update-avatar"
        headerTitle="Сменить аватар"
        buttonAriaText="Сохранить изменения"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitDisabled={!isLinkValid}
      >
        <div className="edit-form__inputs-container">
          <input onChange={validate} name="avatarLink" id="input-avatarLink" type="url" className="edit-form__input edit-form__input_edit_img-source" placeholder="Ссылка на новый аватар" required />
          <span className={`edit-form__error input-cardname-error ${!isLinkValid ? 'edit-form__error_visible' : ''}`}>{validationMessage}</span>
        </div>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;