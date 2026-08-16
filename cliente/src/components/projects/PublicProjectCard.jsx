import React from 'react';
import styles from './PublicProjectCard.module.css';

function formatDate(value) {
  if (!value) return 'In progress';
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short' }).format(new Date(value));
}

export default function PublicProjectCard({ project, featured = false }) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <a className={styles.imageLink} href={project.link} target="_blank" rel="noreferrer" tabIndex="-1" aria-hidden="true">
        <img src={project.thumbnail} alt="" loading="lazy" decoding="async" />
      </a>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{project.category}</span>
          <span>{formatDate(project.publicationDate)}</span>
        </div>
        <h3>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.techs} aria-label="Technologies">
          {project.techs.slice(0, featured ? 7 : 5).map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className={styles.actions}>
          <a className="button button-primary button-small" href={project.link} target="_blank" rel="noreferrer">
            View project <span aria-hidden="true">↗</span>
          </a>
          {project.githubRepo && (
            <a className="text-link" href={`https://github.com/${project.githubRepo}`} target="_blank" rel="noreferrer">
              Repository <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
