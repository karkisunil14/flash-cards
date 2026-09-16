import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";
import { showError } from "./modal.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

/**
 * Makes sure the color is a valid 6-digit hex code with a # in front.
 *
 * @param {string} color - The color value to normalize
 * @returns {string} A valid 6-digit hex color, or the default green if invalid
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

/**
 * Makes sure the name is a string between 2 and 80 characters.
 *
 * @param {string} name - The deck name to validate
 * @returns {string|null} The name if valid, otherwise null
 */
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Tries to turn a JSON string into an object, returning null if it fails.
 *
 * @param {string} jsonString - The JSON text to parse
 * @returns {object|null} The parsed object, or null if the string isn't valid JSON
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

const form = document.querySelector("#new-deck-form");
const submitBtn = form.querySelector(".new-deck-view__submit-btn");

/**
 * Enables the submit button so the form can be submitted.
 */
function disableSubmitBtn() {
  submitBtn.disabled = false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData);

  // values.cards is the text from the textarea, so we need to parse it
  const jsonData = parseJSON(values.cards);

  if (!jsonData) {
    showError("JSON parsing failed");
    return;
  }

  const name = validateName(jsonData.name);

  if (!name) {
    showError("The deck name must be between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError("The cards field must be an array.");
    return;
  }

  const colorValue = normalizeColor(values.color);

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError("The color in the JSON doesn't match the color you picked.");
    return;
  }

  addDeck({
    name: name,
    color: colorValue,
    cards: jsonData.cards,
  })
    .then((newDeck) => {
      fetchedDecks.push(newDeck);
      window.location.hash = "deck/" + newDeck._id;
    })
    .catch(showError);
});

export { disableSubmitBtn };
