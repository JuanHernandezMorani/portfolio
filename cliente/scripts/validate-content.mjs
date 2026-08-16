import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projects = JSON.parse(await readFile(resolve(root, 'src/data/publicProjects.generated.json'), 'utf8'));
const sourceProjects = JSON.parse(await readFile(resolve(root, 'src/data/publicProjects.source.json'), 'utf8'));

const errors = [];
const ids = new Set();

for (const project of projects) {
  for (const field of ['id', 'title', 'link', 'thumbnail', 'description', 'category']) {
    if (!project[field]) errors.push(`${project.id || 'unknown project'} is missing ${field}`);
  }

  if (!Array.isArray(project.techs) || project.techs.length === 0) {
    errors.push(`${project.id || 'unknown project'} must have at least one technology`);
  }

  if (ids.has(project.id)) errors.push(`Duplicate project id: ${project.id}`);
  ids.add(project.id);

  if (!/^https:\/\//.test(project.link)) errors.push(`${project.id}: project link must use https`);
  if (!/^https:\/\//.test(project.thumbnail)) errors.push(`${project.id}: thumbnail must use https`);
}

if (projects.length !== sourceProjects.length) {
  errors.push(`Generated project count (${projects.length}) differs from source count (${sourceProjects.length})`);
}

if (errors.length) {
  console.error('Content validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed: ${projects.length} public projects, ${ids.size} unique ids.`);
