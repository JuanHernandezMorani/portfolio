import projects from './publicProjects.generated.json';

export const publicProjects = projects;
export const featuredProjects = projects.filter((project) => project.featured);
export const projectCategories = ['All', ...new Set(projects.map((project) => project.category))];
