import React, { useEffect, useState, useContext } from 'react';
import { СurrentUserContext } from '../contexts/CurrentUser';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ onClose, isOpen, onUpdateUser }) => {
  const currentUser = useContext(СurrentUserContext);
  const [name, setName] = useState('');
  const [isNameValid, setNameValidity] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [description, setDescription] = useState('');
  const [isDescriptionValid, setDescriptionValidity] = useState(false);
  const [descriptionValidationMessage, setDescriptionValidationMessage] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setNameValidity(false);
    setNameValidationMessage('');
    setDescription(currentUser.about);
    setDescriptionValidity(false);
    setDescriptionValidationMessage('');
  }, [currentUser, isOpen]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const isValid = e.target.validity.valid;
    const validationMessage = e.target.validationMessage;
    const name = e.target.name;
    const value = e.target.value;
    switch(name) {
      case 'name':
        setName(value);
        setNameValidity(isValid);
        setNameValidationMessage(validationMessage);
        break;
      case 'description':
        setDescription(value);
        setDescriptionValidity(isValid);
        setDescriptionValidationMessage(validationMessage);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      headerTitle="Редактировать профиль"
      buttonAriaText="Сохранить изменения профиля"
      closeAriaText="Закрыть без изменения"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isNameValid || !isDescriptionValid}
    >
      <div className="edit-form__inputs-container">
        <input
          minLength="2"
          maxLength="40"
          name="name"
          value={name}
          onChange={handleInputChange}
          id="input-name"
          className="edit-form__input edit-form__input_edit_name"
          type="text"
          placeholder="Введите Ваше Имя"
          required
        />
        <span className={`edit-form__error input-cardname-error ${!isNameValid ? 'edit-form__error_visible' : ''}`}>{nameValidationMessage}</span>
        <input
          minLength="2"
          maxLength="200"
          name="description"
          value={description}
          onChange={handleInputChange}
          id="input-profession"
          className="edit-form__input edit-form__input_edit_profession"
          type="text"
          placeholder="Укажите род вашей деятельности"
          required
        />
        <span className={`edit-form__error input-cardname-error ${!isDescriptionValid ? 'edit-form__error_visible' : ''}`}>{descriptionValidationMessage}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;