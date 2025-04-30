# Astro + Capacitor (Proof of Concept)

I have conducted a proof of concept testing various features of Capacitor utilizing the Astro framework.

### Concepts

The following concepts have been explored and implemented successfully:

- [x] Network
- [x] Camera
- [x] Filesystem
- [x] Geolocation
- [x] Toast
- [x] Share
- [x] Map
- [x] Chart
- [x] Build: Android
- [x] Build: PWA
- [ ] Build: iOS
- [ ] Push Notification
- [ ] Local Notification
- [ ] Log In with Social Media Provider
- [ ] Chart: Candlestick

## Tech Stack

Below is the technology stack utilized in this project:

- [Capacitor](https://capacitorjs.com/)
- [Astro](https://astro.build/)
- [Alpine.js](https://alpinejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Daisy UI](https://daisyui.com/)
- [Iconify](https://iconify.design/)
- [Leaflet Map](https://leafletjs.com/)
- [Chart.js](https://www.chartjs.org/)
- [Vite PWA](https://vite-pwa-org.netlify.app/)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Integrating React with Astro

This project demonstrates how to use React components within an Astro site, including interactive hydration and usage patterns.

### 1. Install React Integration

Run the following command to add React support to your Astro project:

```sh
npx astro add react
```

If you encounter missing peer dependencies, install them with:

```sh
npm install react react-dom @types/react @types/react-dom
```

### 2. Configure Astro for React

Astro automatically updates your `astro.config.*` file when you run the add command. If you need to do it manually, add the integration:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

### 3. Import and Use React Components in .astro Files

You can import React components (e.g., `.jsx` or `.tsx` files) into your `.astro` components:

```astro
---
import MusicLyricsReact from './src/components/home/MusicLyricsReact.jsx';
---
<MusicLyricsReact />
```

By default, React components render as static HTML (no interactivity).

### 4. Hydrate Interactive Components

To make a React component interactive in the browser, add a client directive such as `client:load`:

```astro
<MusicLyricsReact client:load />
```

Available hydration directives:
- `client:load`: Hydrates as soon as the page loads
- `client:idle`: Hydrates when the browser is idle
- `client:visible`: Hydrates when the component is visible
- `client:media={QUERY}`: Hydrates based on a media query
- `client:only="react"`: Only renders on the client

See [Astro Directives Reference](https://docs.astro.build/en/reference/directives-reference/#client-directives) for details.

### 5. Example Usage in This Project

- See `src/components/home/MusicLyricsAstro.astro` for an example of importing and hydrating a React component:

```astro
---
import MusicLyricsReact from './MusicLyricsReact.jsx';
---
<MusicLyricsReact client:load />
```

- The React component itself is defined in `src/components/home/MusicLyricsReact.jsx`.

### 6. Further Reading

- [Astro React Integration Guide](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Using Framework Components in Astro](https://docs.astro.build/en/guides/framework-components/#using-framework-components)
