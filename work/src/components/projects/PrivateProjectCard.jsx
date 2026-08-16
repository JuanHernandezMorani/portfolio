import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivateProjectCard.module.css';

export default function PrivateProjectCard({ project, compact = false }) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.topline}>
        <span className="status-pill status-private">Private</span>
        <span className="status-pill status-active">Active R&D</span>
      </div>
      <div>
        <p className={styles.stage}>{project.stage}</p>
        <h3>{project.name}</h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>
      {!compact && (
        <div className={styles.focus}>
          <span>Current focus</span>
          <p>{project.currentFocus}</p>
        </div>
      )}
      <div className={styles.actions}>
        <Link className="button button-primary button-small" to={`/projects/${project.id}`}>Project overview</Link>
        <span className={styles.lock}>Source remains private</span>
      </div>
    </article>
  );
}
