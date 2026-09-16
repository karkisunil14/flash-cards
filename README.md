## Project Pitch Video

Check out [this video] https://drive.google.com/file/d/1EMaw3V74wAU3oxHygsO0s6HV13yDvMCt/view?usp=sharing , where I describe my
project and some challenges I faced while building it.

## Features

- Browse flashcard decks from the responsive home view.
- Create a new deck by pasting/typing JSON that matches the schema shown on the About page.
- Open a deck to view, flip, and delete its cards.
- Practice cards in the responsive carousel view.
- Use the mobile layout with responsive cards and fixed actions.
- Confirm before deleting a deck or card with the confirmation modal.
- Decks are stored in a remote database and fetched/created/deleted through the [flash cards API](https://se-flashcards-api.en.tripleten-services.com/api-docs), so changes persist across page reloads.
- Server errors and form validation errors are surfaced through an error modal instead of failing silently.
- Every named function in the project is documented with JSDoc.

## Deployment

Live app: https://karkisunil14.github.io/flash-cards/
