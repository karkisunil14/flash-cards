const modal = document.querySelector("#confirmation-modal");
const cancelButton = modal.querySelector(".modal__button_type_cancel");
const confirmButton = modal.querySelector(".modal__button_type_confirm");
let confirmAction = () => {};

function openModal(action) {
  confirmAction = action;
  modal.showModal();
}

cancelButton.addEventListener("click", () => {
  modal.close();
});

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  confirmAction();
  modal.close();
});

export { openModal };
