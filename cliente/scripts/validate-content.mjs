import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projects = JSON.parse(await readFile(resolve(root, 'src/data/publicProjects.generated.json'), 'utf8'));
const sourceProjects = JSON.parse(await readFile(resolve(root, 'src/data/publicProjects.source.json'), 'utf8'));

const errors = [];
const warnings = [];
const ids = new Set();

function isHttps(value) {
  return /^https:\/\//.test(value || '');
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

for (const project of projects) {
  const visibility = project.visibility || 'public';

  for (const field of ['id', 'title', 'thumbnail', 'description', 'category']) {
    if (!project[field]) errors.push(`${project.id || 'unknown project'} is missing ${field}`);
  }

  if (!['public', 'private'].includes(visibility)) {
    errors.push(`${project.id || 'unknown project'} has invalid visibility: ${visibility}`);
  }

  if (!Array.isArray(project.techs) || project.techs.length === 0) {
    errors.push(`${project.id || 'unknown project'} must have at least one technology`);
  }

  if (ids.has(project.id)) errors.push(`Duplicate project id: ${project.id}`);
  ids.add(project.id);

  if (!isHttps(project.thumbnail)) errors.push(`${project.id}: thumbnail must use https`);

  if (visibility === 'public') {
    if (!project.link) errors.push(`${project.id}: public project is missing link`);
    else if (!isHttps(project.link)) errors.push(`${project.id}: project link must use https`);
  } else {
    if (project.link && !isHttps(project.link)) errors.push(`${project.id}: private public-facing link must use https`);
    if (isGithubUrl(project.link)) errors.push(`${project.id}: private project must not expose a GitHub repository link`);
    if (project.githubRepo) errors.push(`${project.id}: private generated project exposes githubRepo`);
    if (project.githubRepoEnv) errors.push(`${project.id}: private generated project exposes githubRepoEnv`);
    if (project.githubUrl) errors.push(`${project.id}: private generated project exposes githubUrl`);
    if (project.sourceAvailable !== false) errors.push(`${project.id}: private project must declare sourceAvailable=false in generated data`);
  }
}

for (const project of sourceProjects) {
  const visibility = project.visibility || 'public';
  if (visibility === 'private' && project.githubRepo && !project.githubRepoEnv) {
    warnings.push(
      `${project.id}: private repository is written directly in source JSON. ` +
      'Use githubRepoEnv instead if the portfolio source repository is public.'
    );
  }
}

if (projects.length !== sourceProjects.length) {
  errors.push(`Generated project count (${projects.length}) differs from source count (${sourceProjects.length})`);
}

for (const warning of warnings) console.warn(`Content validation warning: ${warning}`);

if (errors.length) {
  console.error('Content validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const privateCount = projects.filter((project) => (project.visibility || 'public') === 'private').length;
console.log(`Content validation passed: ${projects.length} projects (${privateCount} private), ${ids.size} unique ids.`);
