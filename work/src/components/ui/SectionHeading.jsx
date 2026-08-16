import React from 'react';
import styles from './SectionHeading.module.css';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`${styles.heading} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
