import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ModalWithImage from './ImagePopup';
import InfoToolTip from './InfoToolTip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { СurrentUserContext } from '../contexts/CurrentUser';
import Api from '../utils/api';
import AuthApi from '../utils/authApi';

function App() {
  const history = useHistory();
  const [isLoggedIn, SetLoggedIn] = useState(false);
  const [currentUser, SetCurrentUser] = useState(
    {
      name: "Жак-Ив Кусто",
      about: "Исследователь океана",
      _id: 'someCompletelyAndAbsolutelyRandomId',
      avatar: "https://proza.ru/pics/2020/06/11/119.jpg",
      email: ''
    });
  const [email, SetEmail] = useState("");
  const [isEditProfilePopupOpen, SetEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, SetAddPlaceModalOpen] = useState(false);
  const [isEditAvatarPopupOpen, SetEditAvatarOpen] = useState(false);
  const [isInfoOpen, SetInfoOpen] = useState(false);
  const [infoStatus, SetInfoStatus] = useState('OK');
  const [selectedCard, SetSelectedCard] = useState(undefined);
  const [cards, SetCards] = useState([]);

  const handleEditAvatarClick = () => {
    SetEditAvatarOpen(true);
  }

  const handleEditProfileClick = () => {
    SetEditProfileOpen(true);
  }

  const handleAddPlaceClick = () => {
    SetAddPlaceModalOpen(true)
  }

  const handleCardClick = (card) => {
    SetSelectedCard(card);
  }

  const handleSubmitPlace = (name, link) => {
    Api.addNewCard(name, link).then((response) => {
      SetCards([response, ...cards]);
      closeAllPopups();
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleUpdateUser = (user) => {
    Api.updateProfile(user).then((response) => {
      SetCurrentUser(response);
      closeAllPopups();
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleUpdateAvatar = (newLink) => {
    Api.updateAvatar(newLink).then((response) => {
      SetCurrentUser(response);
      closeAllPopups();
    }).catch((error) => {
      console.log(error);
    });
  }

  const closeAllPopups = () => {
    SetEditProfileOpen(false);
    SetAddPlaceModalOpen(false);
    SetEditAvatarOpen(false);
    SetInfoOpen(false);
    SetSelectedCard(undefined);
  }

  const handleCardLike = (cardId, isLiked) => {
    const apiCall = isLiked ? () => Api.unlike(cardId) : () => Api.like(cardId);
    apiCall(cardId).then((response) => {
      const newCards = cards.map((cardItem) => {
        return cardItem._id === response._id ? response : cardItem;
      })
      SetCards(newCards);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleCardDelete = (cardId) => {
    Api.deleteCard(cardId).then(() => {
      SetCards((state) => {
        return state.filter((cardItem) => {
          return cardItem._id !== cardId;
        });
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  const validateToken = () => {
    AuthApi.validateToken(localStorage.getItem("token")).then((response) => {
      SetLoggedIn(true);
      SetEmail(response.data.email);
      history.push('/');
    }).catch((error) => {
      SetLoggedIn(false);
      localStorage.removeItem('token');
    });
  }

  const onLogin = (email, password) => {
    AuthApi.signIn(email, password).then((response) => {
      localStorage.setItem('token', response.token);
      setTimeout(validateToken, 250);
    }).catch((error) => {
      SetInfoOpen(true);
      SetInfoStatus(error);
    });
  }

  const onRegister = (email, password) => {
    AuthApi.signUp(email, password).then(() => {
      SetInfoStatus("OK");
      setTimeout(onLogin, 500, email, password);
    }).catch((error) => {
      console.log('err', error);
      SetInfoStatus(error);
    }).finally(() => {
      SetInfoOpen(true);
    });
  }

  const onSignOut = () => {
    SetEmail('');
    localStorage.removeItem("token");
    history.push('/sign-in');
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
      SetCurrentUser((state) => Object.assign(state, response));
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    Api.getInitialCards().then((response) => {
      SetCards(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken();
    }
  }, [validateToken]);



  return (
    <СurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header onSignOut={onSignOut} email={email} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn} >
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
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onSubmit={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={onLogin} />
          </Route>
        </Switch>
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
      <InfoToolTip
        isOpen={isInfoOpen}
        status={infoStatus}
        onClose={closeAllPopups}
      />
    </СurrentUserContext.Provider>
  );
}

export default App;
