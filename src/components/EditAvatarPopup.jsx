import PopupWithForm from './PopupWithForm';
import React, { useEffect, useState, useContext } from 'react';
import { СurrentUserContext } from '../contexts/CurrentUser';

const EditAvatarPopup = ({ onClose, isOpen, onUpdateAvatar }) => {
  const currentUser = useContext(СurrentUserContext);
  
  const [link, setLink] = useState()
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState(false);

  const handleChange = (e) => {
    setLink(e.target.value);
    setIsLinkValid(e.target.validity.valid);
    setValidationMessage(e.target.validationMessage);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(link);
  }

  useEffect(() => {
    setLink(currentUser.avatar);
    setIsLinkValid(false);
    setValidationMessage('');
  }, [currentUser, isOpen]);

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
        <input
          onChange={handleChange}
          value={link}
          name="avatarLink"
          id="input-avatarLink"
          type="url"
          className="edit-form__input edit-form__input_edit_img-source"
          placeholder="Ссылка на новый аватар" required
        />
        <span className={`edit-form__error input-cardname-error ${!isLinkValid ? 'edit-form__error_visible' : ''}`}>{validationMessage}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;