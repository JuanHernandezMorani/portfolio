import React from 'react';
import styles from './PublicProjectCard.module.css';

function formatDate(value) {
  if (!value) return 'In progress';
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short' }).format(new Date(value));
}

export default function PublicProjectCard({ project, featured = false }) {
  const isPrivate = (project.visibility || project.repositoryVisibility) === 'private';
  const hasPublicLink = Boolean(project.link);

  const media = (
    <img src={project.thumbnail} alt="" loading="lazy" decoding="async" />
  );

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {hasPublicLink ? (
        <a className={styles.imageLink} href={project.link} target="_blank" rel="noreferrer" tabIndex="-1" aria-hidden="true">
          {media}
        </a>
      ) : (
        <div className={styles.imageLink} aria-hidden="true">
          {media}
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{project.category}</span>
          <span className={isPrivate ? styles.privateMeta : ''}>{isPrivate ? 'Private' : formatDate(project.publicationDate)}</span>
        </div>
        <h3>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.techs} aria-label="Technologies">
          {project.techs.slice(0, featured ? 7 : 5).map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className={styles.actions}>
          {hasPublicLink && (
            <a className="button button-primary button-small" href={project.link} target="_blank" rel="noreferrer">
              {isPrivate ? 'View overview' : 'View project'} <span aria-hidden="true">↗</span>
            </a>
          )}

          {isPrivate ? (
            <span className={styles.privateSource}>🔒 Source code private</span>
          ) : project.githubRepo ? (
            <a className="text-link" href={`https://github.com/${project.githubRepo}`} target="_blank" rel="noreferrer">
              Repository <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
