const initialCards = [
{
    name:"Yosemite Valley",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
},
{
    name:"Lake Louise",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
},
{
    name:"Bald Mountains",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
},
{
    name:"Latemar",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
},
{
    name:"Vanoise National Park",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
},
{
    name:"Lago di Braies",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}
]

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector('#profile-modal');
const profileModalCloseBtn = profileModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(`#profile-title-input`);
const profileDescriptionInput =document.querySelector("#profile-description-input");
const profileEditForm = document.forms["profile-form"];

const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardAddBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector('#card-modal');
const cardModalCloseBtn = cardModal.querySelector(".modal__close");
const cardAddForm = document.forms['card-form'];
const cardTitleInput = cardAddForm.querySelector(`#card-title-input`);
const cardImageInput =cardAddForm.querySelector('#card-image-input');

const previewModal = document.querySelector("#preview-image-modal");
const previewModalImage = previewModal.querySelector('.modal__image');
const previewModalTitle = previewModal.querySelector(".modal__title");
const previewModalClose = previewModal.querySelector(".modal__close");

function openModal(modal){
    modal.classList.add("modal_opened");
}

function closeModal(modal){
    modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper){
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);

}

function handleProfileEditSubmit(e){
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileModal);
}

function handleAddCardSubmit(e){
    e.preventDefault();
    const name = cardTitleInput.value
    const link = cardImageInput.value
    renderCard({name, link}, cardListEl)
    cardAddForm.reset()
    closeModal(cardModal);
}


function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeBtn = cardElement.querySelector(".card__like-button");
    const removeBtn = cardElement.querySelector(".card__remove-button");

    likeBtn.addEventListener("click", () =>{
        likeBtn.classList.toggle("card__like-button_active")
    })

    removeBtn.addEventListener("click", () =>{
        cardElement.remove()
    })

    cardImageEl.addEventListener("click", () => { 
        openModal(previewModal),
        previewModalImage.src = cardData.link,
        previewModalImage.alt = cardData.name
        previewModalTitle.textContent = cardData.name
      });

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;
    
    return cardElement;
}

profileEditBtn.addEventListener("click", () =>{
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileModal);
});

profileModalCloseBtn.addEventListener("click", ()=> closeModal(profileModal))

profileEditForm.addEventListener("submit", handleProfileEditSubmit)

cardAddBtn.addEventListener("click", ()=> openModal(cardModal))

cardModalCloseBtn.addEventListener("click", ()=> closeModal(cardModal))

cardAddForm.addEventListener("submit", handleAddCardSubmit)

previewModalClose.addEventListener("click", ()=> closeModal(previewModal))

initialCards.forEach((cardData) => renderCard(cardData, cardListEl))

