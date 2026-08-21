# Juan Hernández — Portfolio

Professional portfolio for Juan Braian Hernández Morani, focused on AI, data, software engineering, public projects and active private R&D.

## Stack

- React 19
- Vite
- React Router
- CSS Modules
- Curated project data with optional GitHub metadata enrichment at build time
- Static-friendly contact form integration

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run check
npm run build
```

## Project metadata sync

`src/data/publicProjects.source.json` remains the curated source of truth. `npm run sync:projects` only processes projects explicitly declared in that JSON; it does **not** crawl the GitHub account or automatically publish every repository.

```bash
npm run sync:projects
```

Public repositories work as before: add `githubRepo` and the sync can enrich languages and public repository metadata. If GitHub is unavailable, the manually declared metadata remains the fallback.

### Private repositories

Private repositories are also supported when they are explicitly declared. They require a build-time `GITHUB_TOKEN` with read access to the selected repository. The token is used only by `scripts/sync-projects.mjs` and must never use a `VITE_` prefix.

A private entry can use a direct repository reference:

```json
{
  "id": "private-project",
  "title": "Private Project",
  "visibility": "private",
  "githubRepo": "OWNER/PRIVATE_REPOSITORY",
  "thumbnail": "https://example.com/project.webp",
  "techs": ["C++", "C#", "SQL"],
  "description": "Public-safe project description.",
  "publicationDate": "2026-08-16T00:00:00.000Z",
  "status": "active",
  "category": "Software",
  "featured": false
}
```

If the portfolio source repository is public, prefer keeping even the private repository name out of source control:

```json
{
  "id": "mu-online",
  "title": "MU Online Engineering Project",
  "visibility": "private",
  "githubRepoEnv": "GITHUB_REPO_MU_ONLINE",
  "thumbnail": "https://example.com/mu-online.webp",
  "techs": ["C++", "C#", "SQL"],
  "description": "Public-safe description of the project.",
  "status": "active",
  "category": "Software",
  "featured": false
}
```

Then place the private values in `.env.local` or in the deployment environment:

```env
GITHUB_TOKEN=your_read_only_token
GITHUB_REPO_MU_ONLINE=OWNER/PRIVATE_REPOSITORY
```

For private projects, generated browser data is sanitized automatically:

- `githubRepo` is removed;
- `githubRepoEnv` is removed;
- `githubUrl` is removed;
- GitHub repository links are never published;
- private repository topics/stars/forks/description are not copied automatically;
- detected languages and `lastUpdated` may be used;
- `sourceAvailable` is forced to `false`;
- a manually declared non-GitHub `link` or `publicLink` may still be shown as a public overview/demo.

`npm run check` also fails if private generated data exposes a GitHub repository link or repository identifier.

## Contact form

The default contact endpoint can be overridden without changing source code:

```env
VITE_CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/your-endpoint
```

## Private R&D

The detailed SupporterAI presentation remains in `src/data/privateProjects.js`. Other private engineering projects can be represented through the curated project source with public-safe descriptions while keeping their source unavailable.

## Deployment

The included `vercel.json` supports SPA routing on Vercel. The Vite production output is generated in `dist/`.
