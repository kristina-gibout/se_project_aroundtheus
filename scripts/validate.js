const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const showInputError = (
  formEl,
  inputEl,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElementId = `#${inputEl.id}-error`;
  const errorElement = formEl.querySelector(errorElementId);
  // const errorMessageEl = formEl.querySelector(`#$(inputEl.id)-error`);
  if (!errorElement) {
    throw new Error(`Error element with ID ${errorElementId} not found.`);
  }
  inputEl.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorElementId = `#${inputEl.id}-error`;
  const errorElement = formEl.querySelector(errorElementId);
  // const errorMessageEl = formEl.querySelector(`#$(inputEl.id)-error`);
  if (!errorElement) {
    throw new Error(`Error element with ID ${errorElementId} not found.`);
  }
  inputEl.classList.remove(inputErrorClass);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

function checkInputValidity(formEl, inputEl, options) {
  if (inputEl === null || inputEl === undefined) {
    throw new Error("Input element is null or undefined");
  }

  if (!inputEl.validity) {
    throw new Error("Input element does not contain a 'validity' property");
  }

  if (!inputEl.validity.valid) {
    if (inputEl.validationMessage === undefined) {
      throw new Error(
        "Input element does not contain a 'validationMessage' property"
      );
    }

    showInputError(formEl, inputEl, inputEl.validationMessage, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

// function hasInvalidInput(inputList) {
//   return !inputList.every((inputEl) => inputEl.validity.valid);
// }
const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

function disableBtn(submitBtn, inactiveButtonClass) {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
}

function enableBtn(submitBtn, inactiveButtonClass) {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
}
//complate function and use props
function toggleButtonState(inputList, submitBtn, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableBtn(submitBtn, inactiveButtonClass);
  } else {
    enableBtn(submitBtn, inactiveButtonClass);
  }
}
function setEventListeners(
  formEl,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) {
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  // const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputEls, submitBtn);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, rest);
      toggleButtonState(inputEls, submitBtn, inactiveButtonClass);
    });
  });
}

const enableValidation = ({ formSelector, ...rest }) => {
  const formEls = Array.from(document.querySelectorAll(formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, rest);
  });
};

enableValidation(config);
