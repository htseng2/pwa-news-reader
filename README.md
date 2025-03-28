# PWA News Reader 📰

[![Live Demo](https://img.shields.io/badge/Live_Demo-Available-success)](https://htseng2.github.io/pwa-news-reader/)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.2.0-orange.svg)

A Progressive Web App (PWA) news reader with offline capabilities and bookmarking features.

➡️ **Live Demo:** https://htseng2.github.io/pwa-news-reader/

## Features

- 📰 News feed with infinite scroll
- 🔖 Bookmark articles for offline reading
- ⚡ PWA installation support
- 📶 Offline-first caching strategy
- 🎨 Material UI design system
- 🔄 Service worker precaching
- 🚀 Vite-powered build system

## Installation

```bash
npm install
npm run dev
```

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Workbox](https://developer.chrome.com/docs/workbox/)
- [The News API](https://www.thenewsapi.com/)

## Deployment

Configured for GitHub Pages deployment:

1. Production builds output to `/docs` directory
2. GitHub Pages set to serve from `docs/` folder
3. Automatic 404 handling for SPA routing
4. Service worker registered with proper scope

## Configuration

Key configuration files:

- `vite.config.ts` - Base path and Workbox setup
- `src/service-worker.js` - Precaching strategies
- `public/404.html` - SPA routing fallback
