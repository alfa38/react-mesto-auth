import React, { useState, useEffect } from 'react';
import IconDeny from '../images/IconDeny.svg';
import IconAccept from '../images/IconAccept.svg';

const InfoToolTip = ({ isOpen, status, onClose }) => {
  const [icon, setIcon] = useState(IconAccept);
  const [message, setMessage] = useState('ОК');
  useEffect(() => {
    if (status === 'OK') {
      setIcon(IconAccept);
      setMessage("Вы успешно зарегистрировались!");
    } else {
      setIcon(IconDeny);
      setMessage("Что-то пошло не так! Попробуйте еще раз.");
    } 
  }, [status]);
  return (
    <div className={`modal-overlay ${isOpen ? "modal-overlay_open" : ""}`} id="modal-photo-viewier">
      <div className="modal-overlay__content">
      <button
          onClick={onClose}
          className="modal-overlay__button modal-overlay__button_type_close-modal"
          type="button"
          aria-label={"Закрыть"}></button>
      <div className="info-tooltip">
        <img className="info-tooltip__image" src={icon} alt="status"></img>
        <p className="info-tooltip__message">{ message }</p>
      </div>
      </div>
    </div>
  );
}

export default InfoToolTip;