# Juan Braian Hernández Morani — Portfolio v2

Professional static portfolio rebuilt from the previous React + Express + PostgreSQL application.

## Architecture

The production portfolio is now frontend-only:

- React 19
- Vite
- React Router
- CSS Modules + global design tokens
- Static public-project data
- Optional build-time GitHub enrichment for public repositories
- Static private-R&D descriptions
- FormSubmit AJAX endpoint for contact messages
- No Redux
- No Axios
- No Express server
- No PostgreSQL
- No Sequelize
- No administrative login / CRUD surface
- No Puppeteer screenshot worker
- No runtime Cloudinary upload dependency

The existing project images and thumbnails were intentionally preserved for this migration. They can be replaced one-by-one later without changing the layout or project model.

## Run locally

```bash
npm install
npm run dev
```

## Validate portfolio data

```bash
npm run check
```

## Sync public GitHub metadata

```bash
npm run sync:projects
```

The sync script only accesses public repositories and does not require credentials. It reads `src/data/publicProjects.source.json` and writes `src/data/publicProjects.generated.json`.

An optional `GITHUB_TOKEN` environment variable is supported if you ever want a higher GitHub API rate limit, but the portfolio does not require one.

`npm run build` runs the sync script in best-effort mode. If GitHub is unavailable or rate-limited, the local project metadata remains sufficient for a successful static build.

## Contact form

By default the contact form posts through FormSubmit's AJAX endpoint to:

`juanbhm.dev@gmail.com`

No SMTP password or backend secret is included in the frontend.

On the first real submission FormSubmit may require the recipient email to confirm/activate the form. After activation, submissions are delivered to the configured inbox.

If you later use FormSubmit's invisible-email identifier or another static-form provider, set:

```bash
VITE_CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/your-endpoint
```

## Deploy on Vercel

```bash
npm run build
```

Deploy the `dist` directory. `vercel.json` includes an SPA rewrite so routes such as `/research` and `/projects/supporter-ai` work on direct navigation.

## Content locations

- Public projects: `src/data/publicProjects.source.json`
- Generated public metadata: `src/data/publicProjects.generated.json`
- Private R&D: `src/data/privateProjects.js`
- Resume: `src/data/resume.js`
- Contact/profile data: `src/data/site.js`
- Existing images: `src/assets/images/`
- Existing icons: `src/assets/icons/`
- Updated CV PDF: `public/Juan_Braian_Hernandez_Morani_CV.pdf`

## Responsive behavior

The layout is mobile-first and does not use viewport-width units for basic readability. Typography uses `clamp()`, content uses bounded containers, and cards use adaptive CSS Grid layouts. At tablet/mobile widths the navigation becomes a large full-height menu with touch-friendly targets.

Animations automatically respect `prefers-reduced-motion`.
