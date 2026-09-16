const modal = document.querySelector("#confirmation-modal");
const cancelButton = modal.querySelector(".modal__button_type_cancel");
const confirmButton = modal.querySelector(".modal__button_type_confirm");
let confirmAction = () => {};

const errorModal = document.querySelector("#error-modal");
const errorCloseBtn = errorModal.querySelector(".modal__button_type_dismiss");
const errorMessageEl = errorModal.querySelector(".modal__error");

/**
 * Opens the confirmation modal and stores the action to run if the user confirms.
 *
 * @param {Function} action - The function to call if the user clicks confirm
 */
function openModal(action) {
  confirmAction = action;
  modal.showModal();
}

/**
 * Shows the error modal with the given message.
 *
 * @param {string} message - The error message to display
 */
function showError(message) {
  errorMessageEl.textContent = message;
  errorModal.classList.add("modal_visible");
}

cancelButton.addEventListener("click", () => {
  modal.close();
});

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  confirmAction();
  modal.close();
});

errorCloseBtn.addEventListener("click", () => {
  errorModal.classList.remove("modal_visible");
});

export { openModal, showError };
