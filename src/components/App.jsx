import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ModalWithImage from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { СurrentUserContext } from '../contexts/CurrentUser';
import Api from '../utils/api';

function App() {

  const [currentUser, setCurrentUser] = useState({ name: "Жак-Ив Кусто", about: "Исследователь океана", _id: 'someCompletelyAndAbsolutelyRandomId', avatar: "https://proza.ru/pics/2020/06/11/119.jpg" });
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceModalOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [cards, setCards] = useState([]);

  const handleEditAvatarClick = () => {
    setEditAvatarOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfileOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlaceModalOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleSubmitPlace = (name, link) => {
    Api.addNewCard(name, link).then((response) => {
      setCards([response, ...cards]);
      closeAllPopups();
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleUpdateUser = (user) => {
    Api.updateProfile(user).then((response) => {
      setCurrentUser(response);
      closeAllPopups();
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleUpdateAvatar = (newLink) => {
    Api.updateAvatar(newLink).then((response) => {
      setCurrentUser(response);
      closeAllPopups();
    }).catch((error) => {
      console.log(error);
    });
  }

  const closeAllPopups = () => {
    setEditProfileOpen(false);
    setAddPlaceModalOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard(undefined);
  }

  const handleCardLike = (cardId, isLiked) => {
    const apiCall = isLiked ? () => Api.unlike(cardId) : () => Api.like(cardId);
    apiCall(cardId).then((response) => {
      const newCards = cards.map((cardItem) => {
        return cardItem._id === response._id ? response : cardItem;
      })
      setCards(newCards);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleCardDelete = (cardId) => {
    Api.deleteCard(cardId).then(() => {
      setCards((state) => {
        return state.filter((cardItem) => {
          return cardItem._id !== cardId;
        });
      })
    }).catch((error) => {
      console.log(error);
    });
  }



  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  // Effects
  useEffect(() => {
    Api.getUserInfo().then((response) => {
      setCurrentUser(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    Api.getInitialCards().then((response) => {
      setCards(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);



  return (
    <СurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleSubmitPlace} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm
        name="confirm-delete"
        headerTitle="Вы уверены?"
        okButtonText='Да'
        buttonAriaText="Подтвердить удаление карточки"
        onClose={closeAllPopups}
      />
      <ModalWithImage
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </СurrentUserContext.Provider>
  );
}

export default App;
