# Grid Club

A retro-inspired, responsive Tic-Tac-Toe game built with React, TypeScript, Vite, and Zustand.

## Play

- Choose **VS Computer** for Easy (random moves) or Hard (unbeatable minimax), or **Local 2P** to play with a friend.
- X goes first. Start a new round at any time or rematch when the round ends.
- Wins and draws are tracked on the session scoreboard. Use the moon/sun button to switch themes.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` to type-check and create the production build, `npm run lint` to check the code, or `npm run preview` to serve the production build locally.

Use `npm run format` to format supported files with Prettier, and `npm run format:check` to check formatting without changing files. Formatting preferences are in `.prettierrc`; generated output and binary assets are excluded in `.prettierignore`.

## Project structure

```text
src/
  components/   Reusable page and gameplay UI components
  store/        Zustand game and settings state
  types/        Shared TypeScript game types
  utils/        Game rules, AI moves, and the bundled move sound
  App.tsx       Page composition
  App.css       App and component styles
  index.css     Global styles and theme tokens
```

UI icons use Lucide React. Successful moves play `sounds/game-tap-2073.wav`.
Use `@/` as the import prefix for files under `src/`; the alias is configured in Vite and TypeScript.
