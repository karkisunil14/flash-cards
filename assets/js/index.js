import { fetchedDecks, getDeckByID, removeDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";
import { openModal, showError } from "./modal.js";
import { disableSubmitBtn } from "./new-deck-view.js";
import { getDecks, deleteDeck } from "./api.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".gallery__list");
const homeView = document.querySelector("#home");
const deckView = document.querySelector("#deck-view");
const newDeckView = document.querySelector("#new-deck-view");
const notFoundView = document.querySelector("#not-found");
const aboutView = document.querySelector("#about");
const pageMainContent = document.querySelector(".page__main-content");
const carouselView = document.querySelector(".carousel");
const page = document.querySelector(".page");
const practiceButton = deckView.querySelector(".gallery__practice-btn");
const allViews = [homeView, deckView, newDeckView, notFoundView, carouselView, aboutView];
let currentDeck = null;

/**
 * Hides every view and shows only the given one.
 *
 * @param {HTMLElement} view - The view element to show
 */
function showView(view) {
  allViews.forEach((v) => {
    v.style.display = "none";
  });
  view.style.display = "block";
}

/**
 * Shows the home view listing every deck.
 */
function renderHomeView() {
  showView(homeView);
  page.classList.remove("page_no-mobile-bar");
}

/**
 * Shows the new deck form view.
 */
function renderNewDeckView() {
  showView(newDeckView);
  page.classList.add("page_no-mobile-bar");
}

/**
 * Shows the not-found view for unmatched routes.
 */
function renderNotFoundView() {
  showView(notFoundView);
  page.classList.add("page_no-mobile-bar");
}

/**
 * Shows the about view describing the app.
 */
function renderAboutView() {
  showView(aboutView);
  page.classList.add("page_no-mobile-bar");
}

/**
 * Reads the current URL hash and shows the matching view.
 */
function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home") {
    renderHomeView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash === "new-deck") {
    renderNewDeckView();
    disableSubmitBtn();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash === "about") {
    renderAboutView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("carousel/")) {
    const id = hash.split("/")[1];
    const routeDeck = getDeckByID(id);

    if (!routeDeck) {
      renderNotFoundView();
      pageMainContent.classList.remove("page__main-content_location_carousel");
      return;
    }

    showView(carouselView);
    carouselView.style.display = "flex";
    renderCarouselView(routeDeck);
    pageMainContent.classList.add("page__main-content_location_carousel");
    page.classList.add("page_no-mobile-bar");
  } else if (hash.startsWith("deck/")) {
    const id = hash.split("/")[1];
    currentDeck = getDeckByID(id);

    if (!currentDeck) {
      renderNotFoundView();
      return;
    }

    showView(deckView);
    renderDeckView(currentDeck);
    pageMainContent.classList.remove("page__main-content_location_carousel");
    page.classList.remove("page_no-mobile-bar");
  } else {
    renderNotFoundView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  }
}

window.addEventListener("hashchange", router);

/**
 * Builds a deck card element for the home view and wires up its delete button.
 *
 * @param {object} item - The deck to render
 * @returns {HTMLElement} The deck card element
 */
function createDeckEl(item) {
  const deckClone = deckTemplate.content.querySelector(".card").cloneNode(true);
  const deleteEl = deckClone.querySelector(".card__btn_type_delete");
  deckClone.querySelector(".card__title").textContent = item.name;
  deckClone.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;
  const deckLink = deckClone.querySelector(".card__link");

  deckLink.href = `#deck/${item._id}`;

  deleteEl.addEventListener("click", () => {
    openModal(() => {
      deleteDeck(item._id)
        .then(() => {
          removeDeckByID(item._id);
          deckClone.remove();
        })
        .catch(() => {
          showError("Something went wrong deleting the deck. Please try again.");
        });
    });
  });

  removeColorClasses(deckClone);

  const color = hexToString(item.color);
  const bem_modifier = `card_color_${color}`;

  deckClone.classList.add(bem_modifier);

  return deckClone;
}

/**
 * Builds a deck card element and adds it to the top of the deck list.
 *
 * @param {object} item - The deck to render
 */
function renderDeckEl(item) {
  const newDeck = createDeckEl(item);
  deckList.prepend(newDeck);
}

window.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
      decks.forEach(renderDeckEl);
    })
    .catch(() => {
      showError("Error fetching decks");
    })
    .finally(() => {
      router();
    });
});

practiceButton.addEventListener("click", () => {
  if (currentDeck) {
    window.location.hash = `#carousel/${currentDeck._id}`;
  }
});

const newDeckButton = document.querySelector("#home .gallery__new-deck-btn");

newDeckButton.addEventListener("click", () => {
  window.location.hash = "#new-deck";
});
