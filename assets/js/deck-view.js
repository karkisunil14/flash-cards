import { hexToString, removeColorClasses } from "./colors.js";
import { openModal, showError } from "./modal.js";
import { deleteCard } from "./api.js";

/**
 * Renders the deck view for a given deck: its title and all of its cards,
 * each of which can be flipped to show the answer or deleted.
 *
 * @param {object} deck - The deck to render
 */
function renderDeckView(deck) {
  const view = document.querySelector("#deck-view");
  const title = view.querySelector(".gallery__title");
  const wrappingRow = view.querySelector(".wrapping-row");
  const template = document.querySelector("#card-template");
  const newCardButton = view.querySelector(".gallery__new-card-btn");

  title.textContent = deck.name;
  view.querySelectorAll(".card").forEach((card) => card.remove());

  deck.cards.forEach((item) => {
    const card = template.content.querySelector(".card").cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const flipButton = card.querySelector(".card__btn_type_flip");
    const deleteButton = card.querySelector(".card__btn_type_delete");
    let showingQuestion = true;

    cardTitle.textContent = item.question;

    flipButton.onclick = () => {
      showingQuestion = !showingQuestion;
      cardTitle.textContent = showingQuestion ? item.question : item.answer;
      removeColorClasses(card);
      card.classList.add(
        showingQuestion
          ? `card_color_${hexToString(deck.color)}`
          : "card_color_white",
      );
    };

    deleteButton.onclick = () => {
      openModal(() => {
        deleteCard(item._id)
          .then(() => {
            const cardIndex = deck.cards.indexOf(item);
            deck.cards.splice(cardIndex, 1);
            card.remove();
          })
          .catch(() => {
            showError("Something went wrong deleting the card. Please try again.");
          });
      });
    };

    removeColorClasses(card);
    card.classList.add(`card_color_${hexToString(deck.color)}`);
    wrappingRow.insertBefore(card, newCardButton);
  });
}

export { renderDeckView };
