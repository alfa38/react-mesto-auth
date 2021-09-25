import React, { useContext } from "react";
import { СurrentUserContext } from '../contexts/CurrentUser.js';


const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(СurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((likeItem) => {
    return likeItem._id === currentUser._id;
  });
  const onCardClickHandler = () => {
    onCardClick(card);
  }
  return (
    <div className="card-item" >
      <div
        className="card-item__image-container"
      >
        <img className="card-item__image" src={card.link} alt="Картинка" onClick={onCardClickHandler}/>
        {isOwn ? <button
          className="card-item__button card-item__button_type_remove-card"
          type="button"
          aria-label="Удалить"
          onClick={() => onCardDelete(card._id)}
        />
          : <></>}
      </div>
      <div className="card-item__text-container">
        <h2 className="card-item__name">{card.name}</h2>
        <div className="card-item__like-container">
          <button
            className={`card-item__button card-item__button_type_set-like ${isLiked ? "card-item__button_active" : ''}`}
            type="button"
            aria-label="Поставить лайк"
            onClick={() => onCardLike(card._id, isLiked)}
          />
          <span className="card-item__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;