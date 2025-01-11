export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners(){
    this._cardElement.querySelector('.card__like-button').addEventListener(click, ()=>{
        this._handleLikeIcon();
    } )

    this._cardElement.querySelector('.card__remove-button').addEventListener(click, ()=> {
        this._handleRemove();
    } )

    this._cardImageElemnt.addEventListener(click, () =>{
        this._handleImageClick(this);
    } )

  }


  _handleLikeIcon() {
    this._cardElement.querySelector('.card__like-button').classList.toggle('.card__like-button_active')
  }

  _handleRemove() {
    this._cardElement.remove;
  }

  getView(){
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    this._setEventListeners();
    return this._cardElement;
  }
}
