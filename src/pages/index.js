// import "./index.css";

// import Api from "../scripts/api/Api.js";

// import { FormValidator } from "../scripts/components/FormValidator.js";
// import Card from "../scripts/components/Card.js";
// import { selectors, cardsContainerSelector, apiOptions } from "../scripts/constants.js";

// import { cardItemSelector} from "../scripts/constants.js";

// import Section from "../scripts/components/Section.js";
// import PhotoViewierModal from "../scripts/components/PhotoViewierModal.js";
// import UserInfo from "../scripts/components/UserInfo.js";
// import ModalWithForm from "../scripts/components/ModalWithForm.js";

// const addCardOverlay = document.querySelector("#modal-add-new-card");
// const addNewCardForm = addCardOverlay.querySelector(".edit-form");
// const addCardButton = document.querySelector(".profile__button_type_add-card");
// const avatarContainer = document.querySelector(".profile__avatar-container");

// const editProfileOverlay = document.querySelector("#modal-edit-profile");
// const editProfileForm = editProfileOverlay.querySelector(".edit-form");
// const editProfileNameInput = editProfileForm.querySelector(".edit-form__input_edit_name");
// const editProfileProfessionInput = editProfileForm.querySelector(".edit-form__input_edit_profession");
// const editProfileButton = document.querySelector(".profile__button_type_edit-profile");

// const updateAvatarOverlay = document.querySelector("#modal-update-avatar");
// const updateAvatarForm = updateAvatarOverlay.querySelector(".edit-form");

// const addCardValidator = new FormValidator(selectors, addNewCardForm);
// const editProfileValidator = new FormValidator(selectors, editProfileForm);
// const updateAvatarValidator = new FormValidator(selectors, updateAvatarForm);

// const api = new Api(apiOptions);

// const submitAddNewCard = (event, [name, link]) => {
//     event.preventDefault();
//     api.addNewCard(name, link).then((cardData) => {
//         cardSection.addItem(cardData);
//         addCardModal.closeModal();
//     }).catch((error) => {
//         console.log(`addNewCardApiError: ${error}`);
//     });
// };

// const submitEditProfileForm = (event, [name, profession]) => {
//     event.preventDefault();
//     api.updateProfile({name, profession}).then((userData) => {
//         userInfo.setUserInfo(userData);
//         editProfileModal.closeModal();
//     }).catch((error) => {
//         console.log(`APIUpdateProfile: ${error}`);
//     });
// };

// let cardToRemove = "";

// let cardRemoveCallback = () => {
//     return undefined;
// };

// const handleCardClick = (event, name, link) => {
//     event.preventDefault();
//     photoViewierModal.openModal({name, link});
// };

// const handleCardRemove = (cardId, removeCallBack) => {
//     cardRemoveCallback = removeCallBack;
//     cardToRemove = cardId;
//     confirmDeleteModal.openModal();
// };

// const submitDeleteCard = (event) => {
//     event.preventDefault();
//     api.deleteCard(cardToRemove).then(() => {
//         cardRemoveCallback();
//         confirmDeleteModal.closeModal();
//     }).catch((error) => {
//         console.log(error);
//     });
// };

// const submitUpdateAvatar = (event, [newUrl]) => {
//     event.preventDefault();
//     api.updateAvatar(newUrl).then(({avatar}) => {
//         userInfo.setUserAvatar(avatar);
//         updateAvatarModal.closeModal();
//     }).catch((error) => {
//         console.log(error);
//     });
// };

// const editProfileModal = new ModalWithForm("#modal-edit-profile", submitEditProfileForm);
// const addCardModal = new ModalWithForm("#modal-add-new-card", submitAddNewCard);
// const confirmDeleteModal = new ModalWithForm("#modal-confirm-delete", submitDeleteCard);
// const updateAvatarModal = new ModalWithForm("#modal-update-avatar", submitUpdateAvatar);
// const photoViewierModal = new PhotoViewierModal("#modal-photo-viewier");

// const setLikeCallback = (cardId, isLiked, setLike) => {
//     if (isLiked === true) {
//         api.unlike(cardId).then((data) => {
//             setLike(data.likes.length);
//         }).catch((error) => {
//             console.log(error);
//         });
//     } else {
//         api.like(cardId).then((data) => {
//             setLike(data.likes.length);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }
// };

// const rendererFunction = (item) => {
//     return new Card(item, userInfo.getUserId(), cardItemSelector, handleCardClick, handleCardRemove, setLikeCallback).createCard();
// };

// const userInfo = new UserInfo(".profile__name", ".profile__profession", ".profile__avatar");

// const initUser = () => {
//     api.getUserInfo().then((userData) => {
//         userInfo.setUserInfo(userData);
//         getInitialCards();
//     }).catch((error) => {
//         console.log(`getUserInfoError: ${error}`);
//         userInfo.setUserInfo({
//             name: "Default",
//             about: "User",
//             avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"},
//         );
//     });
// };

// const getInitialCards = () => {
//     api.getInitialCards().then((cardsData) => {
//         cardSection.setItems(cardsData);
//     }).catch((error) => {
//         console.log(`getInitialCardsError: ${error}`);
//     });
// };

// initUser();

// const cardSection = new Section({ items: [], renderer: rendererFunction }, cardsContainerSelector);



// const setEditProfileForm = ({name, profession}) => {
//     editProfileNameInput.value = name;
//     editProfileProfessionInput.value = profession;
// };

// const initModalControls = () => {
//     editProfileModal.setEventListeners();
//     addCardModal.setEventListeners();
//     photoViewierModal.setEventListeners();
//     confirmDeleteModal.setEventListeners();
//     updateAvatarModal.setEventListeners();

//     editProfileButton.addEventListener("click", () => {
//         editProfileValidator.resetForm();
//         setEditProfileForm(userInfo.getUserInfo());
//         editProfileModal.openModal();
//     });
//     addCardButton.addEventListener("click", () => {
//         addCardValidator.resetForm();
//         addCardModal.openModal();
//     });

//     avatarContainer.addEventListener("click", () => {
//         updateAvatarValidator.resetForm();
//         updateAvatarModal.openModal();
//     });
// };


// initModalControls();
// cardSection.renderItems();

// addCardValidator.enableValidation();
// editProfileValidator.enableValidation();
// updateAvatarValidator.enableValidation();
