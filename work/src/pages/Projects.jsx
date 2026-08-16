import React, { useMemo, useState } from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import PublicProjectCard from '../components/projects/PublicProjectCard.jsx';
import { projectCategories, publicProjects } from '../data/projects.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './Projects.module.css';

export default function Projects() {
  usePageMeta('Projects', 'Public software, web, tooling and game-development projects by Juan Braian Hernández Morani.');
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return publicProjects.filter((project) => {
      const categoryMatches = category === 'All' || project.category === category;
      const queryMatches = !normalized || [project.title, project.description, project.category, ...project.techs]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
      return categoryMatches && queryMatches;
    });
  }, [category, query]);

  return (
    <section className="page-section">
      <div className="page-width">
        <Reveal>
          <SectionHeading
            eyebrow="Public work"
            title="Projects"
            description="Public work remains directly accessible without a private API, database or administrative backend. Project metadata is stored locally and can optionally be enriched at build time from public GitHub repositories."
          />
        </Reveal>

        <Reveal delay={80} className={styles.toolbar}>
          <div className={styles.filters} aria-label="Filter projects by category">
            {projectCategories.map((item) => (
              <button
                type="button"
                key={item}
                className={category === item ? styles.activeFilter : ''}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className={styles.search}>
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects or technologies"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </Reveal>

        <p className={styles.resultCount}>{filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}</p>

        {filteredProjects.length ? (
          <div className={styles.grid}>
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={(index % 6) * 45}>
                <PublicProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h2>No matching projects</h2>
            <p>Try another category or search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
