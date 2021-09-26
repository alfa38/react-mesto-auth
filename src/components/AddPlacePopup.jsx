import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

  const [name, setName] = useState('');
  const [isNameValid, setNameValidity] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [link, setLink] = useState('');
  const [isLinkValid, setLinkValidity] = useState(false);
  const [linkValidationMessage, setLinkValidationMessage] = useState('');

  const handleInputs = (event) => {
    const isValid = event.target.validity.valid;
    const validationMessage = event.target.validationMessage;
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'cardName':
        setName(value);
        setNameValidity(isValid);
        setNameValidationMessage(validationMessage);
        break;
      case 'cardLink':
        setLink(value);
        setLinkValidity(isValid);
        setLinkValidationMessage(validationMessage);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(name, link);
  }

  useEffect(() => {
    setName('');
    setLink('');
    setNameValidity(false);
    setLinkValidity(false);
    setNameValidationMessage('');
    setLinkValidationMessage('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-new-card"
      headerTitle="Новое место"
      buttonAriaText="Добавить новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isNameValid || !isLinkValid}
    >
      <div className="edit-form__inputs-container">
        <input
          name="cardName"
          className="edit-form__input edit-form__input_edit_name"
          id="input-cardname"
          value={name}
          onChange={handleInputs}
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className={`edit-form__error input-cardname-error ${!isNameValid ? 'edit-form__error_visible' : ''}`}>{nameValidationMessage}</span>
        <input
          name="cardLink"
          id="input-cardlink"
          value={link}
          onChange={handleInputs}
          type="url"
          className="edit-form__input edit-form__input_edit_img-source"
          placeholder="Ссылка на картинку"
          required
        />
        <span className={`edit-form__error input-cardname-error ${!isLinkValid ? 'edit-form__error_visible' : ''}`}>{linkValidationMessage}</span>
      </div>
    </PopupWithForm>);

}

export default AddPlacePopup;