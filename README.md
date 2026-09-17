## Project Pitch Video

Check out [this video] https://drive.google.com/file/d/1KrH0ldB0t4sXRUSeDasH8pMvwJPkGpwh/view?usp=sharing , where I describe my
project and some challenges I faced while building it.

## Sprint Recap

This sprint I connected my flashcards app to a real backend instead of just using local state, so decks and cards now get saved through the flash cards API and stick around after refreshing the page. I also added an error modal so that if something goes wrong with the server or a form, the user actually sees a message instead of the app just silently failing. On top of that, I added confirmation modals before deleting a deck or card so people don't lose their stuff by accident, and I went back through my code to add JSDoc comments to every named function so it's easier to follow. It took some trial and error getting the API calls and error handling to work smoothly together, but I'm happy with how much more solid the app feels now.

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
