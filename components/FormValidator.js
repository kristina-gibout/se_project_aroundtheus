export default class FormValidator{
    constructor (settings, formElement) {
        this._form = formElement;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }
}

_setEventListeners(){
    this._inputEls = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);
  toggleButtonState(inputEls, submitBtn);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, rest);
      toggleButtonState(inputEls, submitBtn, inactiveButtonClass);
}

toggleButtonState(inputList, submitBtn, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      disableBtn(submitBtn, inactiveButtonClass);
    } else {
      enableBtn(submitBtn, inactiveButtonClass);
    }






enableValidation(){
    this._form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
}



editFormValidator.enableValidation();

addFormValidator



const config = 
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",