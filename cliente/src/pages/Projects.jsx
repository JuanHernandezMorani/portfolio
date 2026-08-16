import React, { useEffect, useMemo, useRef, useState } from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import PublicProjectCard from '../components/projects/PublicProjectCard.jsx';
import { projectCategories, projectLanguages, publicProjects } from '../data/projects.js';
import { resolveLanguageSelection } from '../data/projectFilterRules.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './Projects.module.css';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function Projects() {
  usePageMeta('Projects', 'Selected public and private software, AI, tooling, reverse-engineering and game-development projects by Juan Braian Hernández Morani.');
  const [category, setCategory] = useState('All');
  const [visibility, setVisibility] = useState('All');
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [filterNotice, setFilterNotice] = useState('');
  const filterRef = useRef(null);

  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeText(trimmedQuery);
  const searchActive = normalizedQuery.length >= 3;
  const queryTooShort = normalizedQuery.length > 0 && normalizedQuery.length < 3;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setFilterOpen(false);
    };

    const onPointerDown = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const filteredProjects = useMemo(() => publicProjects.filter((project) => {
    const categoryMatches = category === 'All' || project.category === category;
    const projectVisibility = project.visibility || project.repositoryVisibility || 'public';
    const visibilityMatches = visibility === 'All' || projectVisibility === visibility.toLowerCase();
    const nameMatches = !searchActive || normalizeText(project.title).includes(normalizedQuery);
    const languageMatches = languages.length === 0 || languages.every((language) => project.techs.includes(language));
    return categoryMatches && visibilityMatches && nameMatches && languageMatches;
  }), [category, visibility, languages, normalizedQuery, searchActive]);

  const toggleLanguage = (language) => {
    setLanguages((current) => {
      const result = resolveLanguageSelection(current, language);

      if (result.replaced.length > 0) {
        setFilterNotice(`${language} replaced ${result.replaced.join(', ')} because they belong to the same technology family.`);
      } else {
        setFilterNotice('');
      }

      return result.selection;
    });
  };

  return (
    <section className="page-section">
      <div className={`page-width ${styles.projectsPage}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects"
            description="Browse selected public and private software, AI, tooling, reverse-engineering and game-development work. Search by project name or narrow the results by category and language."
          />
        </Reveal>

        <Reveal delay={80} className={styles.toolbar}>
          <div className={styles.filterGroups}>
            <div className={styles.visibilityFilters} aria-label="Filter projects by visibility">
              {['All', 'Public', 'Private'].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={visibility === item ? styles.activeFilter : ''}
                  onClick={() => setVisibility(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.categoryFilters} aria-label="Filter projects by category">
              {projectCategories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? styles.activeFilter : ''}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.searchAndFilter} ref={filterRef}>
            <label className={styles.search}>
              <span className="sr-only">Search by project name</span>
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by project name"
              />
            </label>

            <button
              type="button"
              className={styles.filterButton}
              onClick={() => setFilterOpen((current) => !current)}
              aria-expanded={filterOpen}
              aria-controls="project-language-filter"
            >
              <FilterIcon />
              <span>Filter</span>
              {languages.length > 0 && <strong>{languages.length}</strong>}
            </button>

            {filterOpen && (
              <div id="project-language-filter" className={styles.filterPanel}>
                <div className={styles.filterPanelHeader}>
                  <div>
                    <strong>Filter by language</strong>
                    <span>Select compatible languages to narrow the project list. Alternative technologies replace each other automatically.</span>
                  </div>
                  {languages.length > 0 && (
                    <button type="button" className={styles.clearButton} onClick={() => { setLanguages([]); setFilterNotice(''); }}>
                      Clear
                    </button>
                  )}
                </div>

                <div className={styles.languageOptions}>
                  {projectLanguages.map((language) => {
                    const selected = languages.includes(language);
                    return (
                      <button
                        type="button"
                        key={language}
                        className={selected ? styles.languageSelected : ''}
                        onClick={() => toggleLanguage(language)}
                      >
                        <span>{language}</span>
                        <span>{selected ? '✓' : '+'}</span>
                      </button>
                    );
                  })}
                </div>

                {filterNotice && (
                  <p className={styles.filterNotice} role="status" aria-live="polite">
                    {filterNotice}
                  </p>
                )}
              </div>
            )}
          </div>
        </Reveal>

        <div className={styles.resultsMeta}>
          <p className={styles.resultCount}>
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
          <p className={`${styles.searchHint} ${queryTooShort ? styles.searchHintActive : ''}`}>
            {queryTooShort ? 'Type at least 3 characters to search by project name.' : ' '}
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 60}>
                <PublicProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className={styles.empty}>
            <h2>No projects match the current filters.</h2>
            <p>Try a different category, clear the language filter, or search with another name.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
