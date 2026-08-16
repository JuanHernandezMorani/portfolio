import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'src/data/publicProjects.source.json');
const outputPath = resolve(root, 'src/data/publicProjects.generated.json');
const bestEffort = process.argv.includes('--best-effort');

async function loadLocalEnv() {
  for (const filename of ['.env.local', '.env']) {
    try {
      const content = await readFile(resolve(root, filename), 'utf8');
      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const separator = line.indexOf('=');
        if (separator <= 0) continue;
        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();
        if ((value.startsWith('\"') && value.endsWith('\"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!(key in process.env)) process.env[key] = value;
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
}

await loadLocalEnv();

const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const token = process.env.GITHUB_TOKEN?.trim();

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'juan-hernandez-portfolio-build'
};

if (token) headers.Authorization = `Bearer ${token}`;

async function fetchJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    throw new Error(`GitHub request failed (${response.status})${remaining === '0' ? ' — rate limit reached' : ''}: ${url}`);
  }
  return response.json();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function resolveTechs(project, detectedLanguages = []) {
  const declared = project.techs || [];
  const merged = project.techsMode === 'declared'
    ? declared
    : unique([...declared, ...detectedLanguages]);
  const excluded = new Set(project.excludeTechs || []);
  return unique(merged).filter((tech) => !excluded.has(tech));
}

function stripAuthoringFields(project) {
  const clean = { ...project };
  delete clean.techsMode;
  delete clean.excludeTechs;
  return clean;
}

function requestedVisibility(project) {
  return project.visibility === 'private' ? 'private' : 'public';
}

function resolveRepoReference(project) {
  if (project.githubRepoEnv) {
    return process.env[project.githubRepoEnv]?.trim() || null;
  }
  return project.githubRepo?.trim() || null;
}

function isGithubUrl(value) {
  if (!value) return false;
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === 'github.com' || hostname.endsWith('.github.com');
  } catch {
    return false;
  }
}

function sanitizePrivateProject(project, extra = {}) {
  const safeLink = project.publicLink || (project.link && !isGithubUrl(project.link) ? project.link : null);
  const sanitized = {
    ...stripAuthoringFields(project),
    ...extra,
    visibility: 'private',
    repositoryVisibility: 'private',
    sourceAvailable: false,
    link: safeLink
  };

  // Build-time repository identifiers must never reach the browser bundle.
  delete sanitized.githubRepo;
  delete sanitized.githubRepoEnv;
  delete sanitized.githubUrl;
  delete sanitized.publicLink;

  // Private repository metadata can reveal implementation details. Keep only
  // the intentionally public description/technology list declared by the owner.
  delete sanitized.githubDescription;
  delete sanitized.topics;
  delete sanitized.stars;
  delete sanitized.forks;

  return sanitized;
}

async function enrichProject(project) {
  const visibility = requestedVisibility(project);
  const repoRef = resolveRepoReference(project);

  if (!repoRef) {
    const sanitized = visibility === 'private'
      ? sanitizePrivateProject(project)
      : { ...stripAuthoringFields(project), visibility: 'public', techs: resolveTechs(project) };

    if (project.githubRepoEnv && visibility === 'private') {
      return {
        project: sanitized,
        enriched: false,
        failed: true,
        privateProject: true,
        reason: `environment variable ${project.githubRepoEnv} is not set`
      };
    }

    return { project: sanitized, enriched: false, failed: false, privateProject: visibility === 'private' };
  }

  if (visibility === 'private' && !token) {
    return {
      project: sanitizePrivateProject(project),
      enriched: false,
      failed: true,
      privateProject: true,
      reason: 'GITHUB_TOKEN is required to enrich a private repository'
    };
  }

  const repoUrl = `https://api.github.com/repos/${repoRef}`;
  const languagesUrl = `${repoUrl}/languages`;

  try {
    // Requests are intentionally serial: this portfolio uses a curated list of
    // repositories and does not crawl the account automatically.
    const repo = await fetchJson(repoUrl);
    const languages = await fetchJson(languagesUrl);
    const detectedLanguages = Object.keys(languages).slice(0, 5);
    const actualVisibility = repo.private ? 'private' : (repo.visibility || visibility);

    if (visibility === 'private' || actualVisibility === 'private') {
      return {
        enriched: true,
        failed: false,
        privateProject: true,
        project: sanitizePrivateProject(project, {
          techs: resolveTechs(project, detectedLanguages),
          lastUpdated: repo.pushed_at || repo.updated_at || project.publicationDate
        })
      };
    }

    return {
      enriched: true,
      failed: false,
      privateProject: false,
      project: {
        ...stripAuthoringFields(project),
        visibility: 'public',
        link: project.link || repo.homepage || repo.html_url,
        description: project.description || repo.description || 'Public project.',
        techs: resolveTechs(project, detectedLanguages),
        githubUrl: repo.html_url,
        githubDescription: repo.description || null,
        topics: repo.topics || [],
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        lastUpdated: repo.pushed_at || repo.updated_at || project.publicationDate,
        repositoryVisibility: repo.visibility || 'public'
      }
    };
  } catch (error) {
    return {
      project: visibility === 'private'
        ? sanitizePrivateProject(project)
        : { ...stripAuthoringFields(project), visibility: 'public', techs: resolveTechs(project) },
      enriched: false,
      failed: true,
      privateProject: visibility === 'private',
      reason: error.message
    };
  }
}

const output = [];
let enrichedCount = 0;
let privateEnrichedCount = 0;
let failedCount = 0;

for (const project of source) {
  const result = await enrichProject(project);
  output.push(result.project);

  if (result.enriched) {
    enrichedCount += 1;
    if (result.privateProject) privateEnrichedCount += 1;
  }

  if (result.failed) {
    failedCount += 1;
    console.warn(`[sync-projects] ${project.id}: ${result.reason || 'enrichment failed'}`);
  }
}

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(
  `[sync-projects] Wrote ${output.length} projects ` +
  `(${enrichedCount} enriched, ${privateEnrichedCount} private enriched, ${failedCount} fallback) ` +
  `to ${outputPath}`
);

if (failedCount > 0 && !bestEffort) {
  process.exitCode = 1;
}
