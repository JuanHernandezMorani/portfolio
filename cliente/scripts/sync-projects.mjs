import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'src/data/publicProjects.source.json');
const outputPath = resolve(root, 'src/data/publicProjects.generated.json');
const bestEffort = process.argv.includes('--best-effort');

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

async function enrichProject(project) {
  if (!project.githubRepo) return { project, enriched: false, failed: false };

  const repoUrl = `https://api.github.com/repos/${project.githubRepo}`;
  const languagesUrl = `${repoUrl}/languages`;

  try {
    // Requests are intentionally serial: the portfolio only needs a handful of
    // public calls and this avoids unnecessary pressure on GitHub rate limits.
    const repo = await fetchJson(repoUrl);
    const languages = await fetchJson(languagesUrl);
    const detectedLanguages = Object.keys(languages).slice(0, 5);

    return {
      enriched: true,
      failed: false,
      project: {
        ...project,
        link: project.link || repo.homepage || repo.html_url,
        description: project.description || repo.description || 'Public project.',
        techs: unique([...(project.techs || []), ...detectedLanguages]),
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
    console.warn(`[sync-projects] ${project.githubRepo}: ${error.message}`);
    return { project, enriched: false, failed: true };
  }
}

const output = [];
let enrichedCount = 0;
let failedCount = 0;

for (const project of source) {
  const result = await enrichProject(project);
  output.push(result.project);
  if (result.enriched) enrichedCount += 1;
  if (result.failed) failedCount += 1;
}

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`[sync-projects] Wrote ${output.length} projects (${enrichedCount} enriched, ${failedCount} fallback) to ${outputPath}`);

if (failedCount > 0 && !bestEffort) {
  process.exitCode = 1;
}
