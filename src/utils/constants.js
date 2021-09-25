export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
];

const tokenId = "6e43fb48-bfc3-4ca2-9d57-c20947fe10e7";

export const apiOptions = {
    baseUrl: "https://nomoreparties.co/v1/cohort-26",
    headers: {
        authorization: tokenId,
        "Content-Type": "application/json"
    }
};

export const selectors = {
    formSelector: ".edit-form",
    inputSelector: ".edit-form__input",
    submitButtonSelector: ".edit-form__button",
    inactiveButtonClass: "edit-form__button_disabled",
    inputErrorClass: "edit-form__input_error",
    errorFieldClass: ".edit-form__error",
    errorClass: "edit-form__error_visible",
};

export const cardItemSelector = "#card-item-template";
export const inputErrorVisibleClass = "edit-form__input_error";

export const cardsContainer = document.querySelector(".cards-container");
export const cardsContainerSelector = ".cards-container";
