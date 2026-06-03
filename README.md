# Barlore

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Barlore** is a cocktail discovery web application powered by [TheCocktailDB](https://www.thecocktaildb.com/) public API. It lets users browse and explore a large catalog of cocktails, search by name, and dive into the full details of any drink they find interesting.

On the home page, the app loads a default set of cocktails on arrival so there is always something to explore without any extra action from the user. A search bar at the top lets users filter the catalog by typing a cocktail name — results update immediately after submitting the form. If no cocktail matches the search term, a friendly message is shown instead of an empty screen.

Clicking on any cocktail card opens its dedicated detail page, which displays the full profile of that drink: its name, the type of glass it is traditionally served in, whether it is alcoholic or non-alcoholic, a high-quality photo, and a list of its ingredients. A back button is always present to return to the home page without losing context.

The application also includes an About page that describes the project, and a dedicated 404 error page that catches any unknown or malformed URL and redirects the user gracefully back to the home page.

## Technologies used

To deliver the experience described above, Barlore is built on top of the following stack:

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

These technologies are complemented by the following runtime and development libraries:

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-router": "7.16.0"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"msw": "2.10.4"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"undici": "^7.25.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack and dependencies covered, follow these steps to run the project locally:

1. Clone the repository
2. Navigate to the project folder
3. Copy `.env.example` to `.env` (the app reads `VITE_API_URL` from it to proxy TheCocktailDB API):

   ```bash
   cp .env.example .env
   ```

4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app is running, you can verify behavior by executing the test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch. The Node version used by every job is read from [`.nvmrc`](.nvmrc), so local and CI runs stay aligned.

### Pipeline overview

```
                ┌─── PR or push to main ───┐
                ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│      build       │
│  eslint · tsc check  │  │   jest (jsdom)   │  │ tsc + vite build │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

### Validation jobs (run on every PR and push to `main`)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint over `src/`) and `npm run type-check` (`tsc -p tsconfig.app.json --noEmit`).
2. **`testing`** — runs `npm run test`, which executes the full Jest suite under `jest-environment-jsdom` with MSW intercepting outbound HTTP. Depends on `lint-and-audit`.
3. **`build`** — runs `npm run build` to type-check the production config and produce the Vite bundle. Depends on `testing`.

The jobs are wired with `needs:` so a failure stops the pipeline early — the build never runs if linting or tests fail.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

### Where the build outputs live

| Output                                    | Location                                                |
| ----------------------------------------- | ------------------------------------------------------- |
| Validation logs (lint, type-check, tests) | **Actions** tab on GitHub                               |
| Production bundle                         | Ephemeral, inside the runner (`dist/` is not published) |

## Security Audit

Beyond functional tests, the project ships with scripts to audit dependencies and overall code health.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/barlore`](https://www.diegolibonati.com.ar/#/project/barlore)
