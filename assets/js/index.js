import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";
import { openModal } from "./modal.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".gallery__list");
const homeView = document.querySelector("#home");
const deckView = document.querySelector("#deck-view");
const notFoundView = document.querySelector("#not-found");
const pageMainContent = document.querySelector(".page__main-content");
const carouselView = document.querySelector(".carousel");
const page = document.querySelector(".page");
const practiceButton = deckView.querySelector(".gallery__practice-btn");
let currentDeck = null;

function renderHomeView() {
  homeView.style.display = "block";
  deckView.style.display = "none";
  carouselView.style.display = "none";
  notFoundView.style.display = "none";
  page.classList.remove("page_no-mobile-bar");
}

function renderNotFoundView() {
  homeView.style.display = "none";
  deckView.style.display = "none";
  carouselView.style.display = "none";
  notFoundView.style.display = "block";
  page.classList.add("page_no-mobile-bar");
}

function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home") {
    renderHomeView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("carousel/")) {
    const id = hash.split("/")[1];
    const routeDeck = getDeckByID(id);

    if (!routeDeck) {
      renderNotFoundView();
      pageMainContent.classList.remove("page__main-content_location_carousel");
      return;
    }

    homeView.style.display = "none";
    deckView.style.display = "none";
    notFoundView.style.display = "none";
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

    homeView.style.display = "none";
    carouselView.style.display = "none";
    notFoundView.style.display = "none";
    deckView.style.display = "block";
    renderDeckView(currentDeck);
    pageMainContent.classList.remove("page__main-content_location_carousel");
    page.classList.remove("page_no-mobile-bar");
  } else {
    renderNotFoundView();
    pageMainContent.classList.remove("page__main-content_location_carousel");
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

function createDeckEl(item) {
  const deckClone = deckTemplate.content.querySelector(".card").cloneNode(true);
  const deleteEl = deckClone.querySelector(".card__btn_type_delete");
  deckClone.querySelector(".card__title").textContent = item.name;
  deckClone.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;
  const deckLink = deckClone.querySelector(".card__link");

  deckLink.href = `#deck/${item.id}`;

  deleteEl.addEventListener("click", () => {
    openModal(() => deckClone.remove());
  });

  removeColorClasses(deckClone);

  const color = hexToString(item.color);
  const bem_modifier = `card_color_${color}`;

  deckClone.classList.add(bem_modifier);

  return deckClone;
}

function renderDeckEl(item) {
  const newDeck = createDeckEl(item);
  deckList.prepend(newDeck);
}

decks.forEach(renderDeckEl);

practiceButton.addEventListener("click", () => {
  if (currentDeck) {
    window.location.hash = `#carousel/${currentDeck.id}`;
  }
});
