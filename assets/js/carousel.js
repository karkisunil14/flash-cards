import { removeColorClasses, hexToString } from "./colors.js";

/**
 * Renders the practice carousel for a deck, letting the user step through
 * its cards one at a time and flip each one to see the answer.
 *
 * @param {object} deck - The deck to practice
 */
function renderCarouselView(deck) {
  const carousel = document.querySelector(".carousel");
  const title = carousel.querySelector(".carousel__title");
  const cardElement = carousel.querySelector(".carousel__card");
  const cardText = carousel.querySelector(".carousel__card-text");
  const flipButton = carousel.querySelector(".carousel__btn_type_flip");
  const leftArrow = carousel.querySelector(".carousel__btn_type_left");
  const rightArrow = carousel.querySelector(".carousel__btn_type_right");

  carousel.style.display = "flex";

  /**
   * Builds the "Deck Name • 1/10" style title shown above the carousel.
   *
   * @param {object} deck - The deck being practiced
   * @param {number} currentIndex - The index of the currently shown card
   * @returns {string} The formatted title string
   */
  function getCarouselTitleString(deck, currentIndex) {
    const displayName = deck.name.replace(/^Basic /, "") + " Deck";
    return `${displayName} • ${currentIndex + 1}/${deck.cards.length}`;
  }

  /**
   * Disables a carousel button and marks it visually disabled.
   *
   * @param {HTMLButtonElement} button - The button to disable
   */
  function disableButton(button) {
    button.disabled = true;
    button.classList.add("carousel__btn_disabled");
  }

  /**
   * Enables a carousel button and removes its disabled styling.
   *
   * @param {HTMLButtonElement} button - The button to enable
   */
  function enableButton(button) {
    button.disabled = false;
    button.classList.remove("carousel__btn_disabled");
  }

  let currentIndex = 0;
  let showingQuestion = true;

  /**
   * Updates the carousel's title, card text, color, and arrow states to
   * match the current card and whether the question or answer is showing.
   */
  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];
    cardText.textContent = currentCard.question;
    title.textContent = getCarouselTitleString(deck, currentIndex);

    if (currentIndex === 0) {
      disableButton(leftArrow);
    } else {
      enableButton(leftArrow);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightArrow);
    } else {
      enableButton(rightArrow);
    }

    if (showingQuestion) {
      cardText.textContent = currentCard.question;
      removeColorClasses(cardElement);

      const color = hexToString(deck.color);
      cardElement.classList.add(`carousel__card_color_${color}`);
    } else {
      cardText.textContent = currentCard.answer;
      removeColorClasses(cardElement);
      cardElement.classList.add("carousel__card_color_white");
    }
  }

  rightArrow.onclick = () => {
    currentIndex++;
    showingQuestion = true;
    updateDisplay();
  };

  leftArrow.onclick = () => {
    currentIndex--;
    showingQuestion = true;
    updateDisplay();
  };

  removeColorClasses(cardElement);

  const color = hexToString(deck.color);

  cardElement.classList.add(`carousel__card_color_${color}`);

  flipButton.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };

  updateDisplay();
}

export { renderCarouselView };
