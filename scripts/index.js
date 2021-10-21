/*** POPUPS ***/
const popupTemplate = document.querySelector('#popup-form').content;
const body = document.querySelector('.body');

// render popups
const popupParams = [
  {
    'title': 'Редактировать профиль',
    'classList': ['popup_type_edit-profile'],
    'form': {
      'classList': ['popup__form_type_edit-profile'],
      'inputFields': [
        {
          'classList': ['popup__input', 'popup__input_type_profile-name'],
          'name': 'profileName',
          'required': true,
          'placeholder': 'Имя',
          'type': 'text'
        },
        {
          'classList': ['popup__input', 'popup__input_type_profile-description'],
          'name': 'profileDescription',
          'required': false,
          'placeholder': 'О себе',
          'type': 'text'
        }
      ]
    }
  },
  {
    'title': 'Новое место',
    'classList': ['popup_type_add-new-element'],
    'form': {
      'classList': ['popup__form_type_add-new-element'],
      'inputFields': [
        {
          'classList': ['popup__input', 'popup__input_type_element-name'],
          'name': 'elementName',
          'required': true,
          'placeholder': 'Название',
          'type': 'text'
        },
        {
          'classList': ['popup__input', 'popup__input_type_element-link'],
          'name': 'elementLink',
          'required': true,
          'placeholder': 'Ссылка на картинку',
          'type': 'url'
        }
      ]
    }
  }
];

popupParams.forEach(popupItem => {
  const newPopup = popupTemplate.querySelector('.popup').cloneNode(true);
  newPopup.classList.add(...popupItem.classList);
  newPopup.querySelector('.popup__title').textContent = popupItem.title;

  const popupCloseButton = newPopup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closePopup);

  popupItem.form.inputFields.forEach(input => {
    const newInput = document.createElement('input');
    newInput.classList.add(...input.classList);
    newInput.name = input.name;
    newInput.required = input.required;
    newInput.placeholder = input.placeholder;
    newInput.type = input.type;
    newPopup.querySelector('.popup__submit-button').before(newInput);
  });

  body.append(newPopup);

  const popupForm = newPopup.querySelector('.popup__form');
  popupForm.classList.add(...popupItem.form.classList);
  popupForm.addEventListener('submit', submitPopupForm);

});

// Popup handlers
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const openedPopup = evt.target.parentNode.parentNode;
  openedPopup.classList.remove('popup_opened');
}

function submitPopupForm(evt) {
  evt.preventDefault();

  switch (true) {
    case (evt.target.classList.value.includes('popup__form_type_edit-profile')):
        saveProfileInfo();
        break;
    case (evt.target.classList.value.includes('popup__form_type_add-new-element')):
        addNewCard();
        break;
  }

  closePopup(evt);
}

/*** PROFILE ***/
const profile = document.querySelector('.profile');

let profileInfo = {
  "name": profile.querySelector('.profile__name'),
  "description": profile.querySelector('.profile__description')
};

const profileEditButton = profile.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function() {
  const profilePopup = document.querySelector('.popup_type_edit-profile');
  renderProfileInfo();
  openPopup(profilePopup);
});

// Profile handlers
const profileName = document.querySelector('.popup__input_type_profile-name');
const profileDescription = document.querySelector('.popup__input_type_profile-description');

function renderProfileInfo() {
  profileName.value = profileInfo.name.textContent;
  profileDescription.value = profileInfo.description.textContent;
}

function saveProfileInfo() {
  profileInfo.name.textContent = profileName.value;
  profileInfo.description.textContent = profileDescription.value;
}


/*** CARDS ***/

const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');

const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// render initial cards
cards.forEach(card => renderNewCard(card));

// cards handlers
function addNewCard() {
  const elementName = document.querySelector('.popup__input_type_element-name');
  const elementLink = document.querySelector('.popup__input_type_element-link');

  const card = {
    'name': elementName.value,
    'link': elementLink.value
  };

  cards.push(card);
  renderNewCard(card);

  elementName.value = '';
  elementLink.value = '';
}

function renderNewCard(card) {
  const newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  newCard.querySelector('.elements__image').src = card.link;
  newCard.querySelector('.elements__title').textContent = card.name;
  elementsList.prepend(newCard);
}

// Add new card button
const addNewCardButton = profile.querySelector('.profile__add-button');

addNewCardButton.addEventListener('click', function() {
  const addPopup = document.querySelector('.popup_type_add-new-element');
  openPopup(addPopup);
});







