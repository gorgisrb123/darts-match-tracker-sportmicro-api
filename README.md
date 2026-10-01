# Darts Match Tracker with Sportmicro API

Open-source **darts match tracker API** demo built with **React, TypeScript, Vite, and Tailwind CSS**.

This project uses **Sportmicro** as the sports data provider for darts match tracker data. It focuses on a practical integration pattern: a dedicated API client, typed response handling, live refreshes, search/filtering, and clear loading, empty, and error states.

- Sportmicro: https://sportmicro.com
- Documentation: https://docs.sportmicro.com/

## Overview

Darts Match Tracker is a developer-focused live scores UI for darts. It is intentionally small and production-style so you can study how to connect a front-end app to the Sportmicro API without hardcoding credentials or spreading provider-specific logic throughout the UI.

The app currently demonstrates:

- Fetching live darts matches from Sportmicro
- A responsive interface that works on mobile and desktop
- Search/filtering across team names and match status
- Loading, empty, and API error handling
- Environment-based configuration with `SPORTMICRO_API_KEY`
- A reusable Sportmicro data access layer
- Live event refresh polling
- Event status and score display

## Feature boundaries

This repository is a focused example, not a full sports platform. It does **not** claim to cover every Sportmicro darts endpoint or every possible match data shape.

Implemented scope:

- `/matches-live` for live match display
- Normalization of raw Sportmicro match data into a UI-friendly type
- Client-side filtering and status display
- Graceful messaging when data is unavailable or the API fails

Not implemented:

- Authentication flows beyond environment configuration
- Account features or user preferences
- Historical match browsing
- Backend proxying or server-side caching
- Provider endpoints not used by the app

## Screenshot

No screenshot is included in this repository. The UI is a local development Vite app, so the fastest way to inspect it is to run it locally.

## Prerequisites

- Node.js 18 or newer
- npm
- A Sportmicro API key

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env
```

4. Add your Sportmicro key to `.env`:

```bash
SPORTMICRO_API_KEY=your_api_key_here
```

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `SPORTMICRO_API_KEY` | Yes | Sportmicro API key used by the dedicated client |

The project never hardcodes API keys. Keep secrets in your local environment and out of version control.

## Run the app

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run tests:

```bash
npm test
```

## API usage

The app uses the Sportmicro darts live matches endpoint:

- `GET https://darts.sportmicro.com/matches-live`

The client reads the API key from `SPORTMICRO_API_KEY`, fetches live match data, and normalizes the response into a typed shape used by the UI.

### Example client usage

```ts
import { SportmicroClient } from './lib/sportmicroClient';

const client = new SportmicroClient({
  baseUrl: 'https://darts.sportmicro.com',
  apiKey: import.meta.env.SPORTMICRO_API_KEY
});

const liveMatches = await client.getLiveMatches();
```

## Project structure

```text
src/
  components/        Reusable UI pieces for search, status, and match cards
  lib/               Sportmicro API client and response normalization
  test/              Test setup
  App.tsx            Main application shell and polling logic
  main.tsx           React entry point
  styles.css         Tailwind entry styles and app theme
```

## Architecture notes

- The `SportmicroClient` owns request/response handling for the API boundary.
- `App.tsx` manages live refresh, UI state, and empty/error messaging.
- Match data is normalized so the UI works with a stable TypeScript shape instead of raw provider fields.
- Live refresh polling keeps the interface up to date without introducing undocumented provider features.

## Contributing

Contributions are welcome.

A good contribution should keep the repository focused, easy to read, and faithful to the Sportmicro documentation. Before opening a pull request:

1. Run `npm run build`
2. Run `npm test`
3. Verify that any new Sportmicro usage matches the documented endpoints

## Known limitations

- The project currently uses only the documented Sportmicro `/matches-live` endpoint.
- The app depends on a valid `SPORTMICRO_API_KEY` to load live data.
- Network and API failures are surfaced to the user, but there is no offline cache.
- The live refresh interval is intentionally simple and can be adapted for production needs.

## License

MIT License. See [LICENSE](LICENSE).

## Sportmicro

This project demonstrates how to consume Sportmicro in a real React application.

Powered by Sportmicro: https://sportmicro.com

For API details, see the official docs: https://docs.sportmicro.com/

Get a Sportmicro API key at https://sportmicro.com
