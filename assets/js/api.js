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
 * Fetches a URL and parses the response, rejecting if the request failed.
 *
 * @param {string} url - The URL to fetch
 * @param {object} [options] - Options to pass to fetch
 * @returns {Promise<any>} A promise that resolves with the parsed JSON body
 */
function request(url, options) {
  return fetch(url, options).then(processResponse);
}

/**
 * Fetches every deck belonging to the current user.
 *
 * @returns {Promise<object[]>} A promise that resolves with the array of decks
 */
function getDecks() {
  return request(`${baseUrl}/decks`, { headers, cache: "no-store" });
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
  return request(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, color, cards }),
  });
}

/**
 * Deletes a deck by its ID.
 *
 * @param {string} deckId - The ID of the deck to delete
 * @returns {Promise<object>} A promise that resolves with the server's confirmation message
 */
function deleteDeck(deckId) {
  return request(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  });
}

/**
 * Deletes a card by its ID.
 *
 * @param {string} cardId - The ID of the card to delete
 * @returns {Promise<object>} A promise that resolves with the server's confirmation message
 */
function deleteCard(cardId) {
  return request(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers,
  });
}

export { getDecks, addDeck, deleteDeck, deleteCard };
