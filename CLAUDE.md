# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + Vite application for exploring NHL data via the public NHL API. It is hosted on GitHub Pages at https://jungbauer.github.io/nhl-ui/.

## Common Commands

- `npm run dev` - Start the development server (port 5173)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint with automatic fixes
- `npm run lintdry` - Run ESLint without fixing (dry run)

## Architecture Overview

### Build Tool Configuration (vite.config.mjs)

The project uses Vite with several key plugins:

- **unplugin-vue-router**: File-based routing where Vue files in `src/pages/` become routes automatically
- **vite-plugin-vue-layouts-next**: Layouts support via `src/layouts/` directory
- **unplugin-vue-components**: Auto-imports components from `src/components/` without manual imports
- **unplugin-auto-import**: Auto-imports Vue, Vue Router, and Pinia APIs (no manual imports needed)
- **vite-plugin-vuetify**: Vuetify integration with SASS variable configuration
- **unplugin-fonts**: Google Fonts (Roboto) loading

The dev server proxies `/api` to `https://api-web.nhle.com/v1` for NHL API access.

### Directory Structure

```
src/
├── pages/          # File-based routes; .vue files become routes automatically
│   ├── index.vue   # Home page ("/")
│   ├── standings.vue
│   ├── game_[id].vue  # Dynamic route with param: gameId
│   └── schedule/[team].vue  # Nested dynamic route
├── components/     # Auto-imported Vue components
│   └── game/       # Subfolder components are also auto-imported
├── layouts/        # Layout components (used by vite-plugin-vue-layouts-next)
│   └── default.vue # Default layout wrapping all pages
├── stores/         # Pinia stores for state management
│   ├── standings.js
│   └── app.js
├── plugins/        # Vue plugin initialization
│   ├── index.js    # Registers vuetify, router, pinia
│   └── vuetify.js  # Vuetify configuration
├── utils/          # Composables and utilities
│   ├── useFetch.js
│   └── useRinkDraw.js
├── router/         # Router configuration
│   └── index.js
├── styles/         # Global styles and Vuetify SASS config
│   └── settings.scss
└── main.js         # App entry point
```

### Routing

Routes are automatically generated from `src/pages/` using `unplugin-vue-router`:
- `src/pages/index.vue` → `/`
- `src/pages/standings.vue` → `/standings`
- `src/pages/game_[id].vue` → `/game/:id`
- `src/pages/schedule/[team].vue` → `/schedule/:team`

Layouts are applied via `vite-plugin-vue-layouts-next` using the `virtual:generated-layouts` import.

### Auto-Imports

The following are automatically imported and do not require manual import statements:
- Vue APIs (`ref`, `computed`, `watch`, etc.)
- Vue Router APIs (`useRoute`, `useRouter`, etc.)
- Pinia APIs (`defineStore`, `storeToRefs`)
- Components from `src/components/` (auto-registered globally)

### State Management

Uses Pinia with the Composition API pattern. Stores are in `src/stores/`:
- `standings.js` - NHL standings data fetched from backend API
- `app.js` - App-level state (currently minimal)

Data fetching pattern uses a custom `useFetch` composable that returns a fetch function.

### API Configuration

The app expects a backend API URL configured via environment variable:
- `VITE_API_URL` - Base URL for NHL data API (default: `http://localhost:8080`)

In development, the Vite dev server proxies `/api` to the NHL's official API (`api-web.nhle.com/v1`).

### Styling

- Uses Vuetify 3 with Material Design 3 components
- SASS/SCSS support via `sass-embedded`
- Vuetify theme customization in `src/styles/settings.scss`
- Material Design Icons via `@mdi/font`

### ESLint Configuration

Uses `eslint-config-vuetify` with custom rules:
- Double quotes enforced
- Semicolons required
- Arrow functions require parentheses
- Space before function parenthesis: never for named functions, always for async arrows

### Deployment

GitHub Actions workflow (`.github/workflows/deploy-pages.yaml`) builds and deploys to GitHub Pages on manual trigger. The `vite.config.mjs` sets `base: "/nhl-ui/"` for GitHub Pages hosting compatibility.

## Key Dependencies

- Vue 3.5+ with Composition API
- Vue Router 4.5+ (file-based)
- Vuetify 3.10+
- Pinia 3.0+ (state management)
- Vite 7.1+ with various unplugins
