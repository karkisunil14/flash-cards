const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a0ab88-a116-7648-a9ed-9269208b220c",
};

/**
 * Checks whether a fetch response succeeded and parses its JSON body.
 *
 * @param {Response} res - The response returned by fetch
 * @returns {Promise<any>} A promise that resolves with the parsed JSON body,
 * or rejects with an error message if the response was not ok
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches every deck belonging to the current user.
 *
 * @returns {Promise<object[]>} A promise that resolves with the array of decks
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers, cache: "no-store" }).then(processResponse);
}

/**
 * Creates a new deck.
 *
 * @param {object} deck - The deck to create
 * @param {string} deck.name - The deck's name
 * @param {string} deck.color - The deck's color as a hex string
 * @param {object[]} deck.cards - The deck's cards, each with a question and answer
 * @returns {Promise<object>} A promise that resolves with the newly created deck
 */
function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, color, cards }),
  }).then(processResponse);
}

/**
 * Deletes a deck by its ID.
 *
 * @param {string} deckId - The ID of the deck to delete
 * @returns {Promise<object>} A promise that resolves with the server's confirmation message
 */
function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

export { getDecks, addDeck, deleteDeck };
