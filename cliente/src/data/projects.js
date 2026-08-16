import projects from './publicProjects.generated.json';

const languagePriority = [
  'JavaScript', 'TypeScript', 'Java', 'Python', 'C', 'C++', 'C#', 'Go', 'Rust',
  'Ruby', 'PHP', 'Kotlin', 'Swift', 'Dart', 'Shell', 'Bash', 'PowerShell', 'SQL',
  'HTML', 'CSS', 'SCSS', 'Sass', 'Less', 'Lua', 'Pawn'
];

const categoryMap = {
  Web: 'Frontend',
  'Full Stack': 'Software',
  Tools: 'Tools',
  'Game Dev': 'Game Dev'
};

const normalizedProjects = projects.map((project) => ({
  ...project,
  category: categoryMap[project.category] || project.category
}));

const availableTechs = new Set(normalizedProjects.flatMap((project) => project.techs || []));

export const publicProjects = normalizedProjects;
export const featuredProjects = normalizedProjects.filter((project) => project.featured);
const categoryPriority = ['Frontend', 'Software', 'Tools', 'Game Dev'];
const availableCategories = new Set(normalizedProjects.map((project) => project.category));

export const projectCategories = ['All', ...categoryPriority.filter((category) => availableCategories.has(category)), ...[...availableCategories].filter((category) => !categoryPriority.includes(category))];
export const projectLanguages = languagePriority.filter((language) => availableTechs.has(language));
