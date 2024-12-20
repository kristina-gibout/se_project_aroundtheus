const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#$(inputEl.id)-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#$(inputEl.id)-error`);
  inputEl.classList.remove(inputErrorClass);

  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = "";
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableBtn() {
  submitBtn.classList.add(inactiveButtonClass);
  return (submitBtn.disabled = true);
}

function enableBtn() {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
}
//complate function and use props
function toggleButtonState(inputEls, submitBtn, { inactiveButtonClass }) {
  if (hasInvalidInput) {
    return disableBtn();
  }
  enableBtn();
}
function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitBtn, options);
    });
  });
}

function enableValidation(options) {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      setEventListeners(formEl, options);
    });
  });
}

enableValidation(config);
