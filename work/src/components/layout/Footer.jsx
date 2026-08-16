import React from 'react';
import { Link } from 'react-router-dom';
import github from '../../assets/icons/github-mark-white.png';
import linkedin from '../../assets/icons/linkedin.png';
import { site } from '../../data/site.js';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`page-width ${styles.inner}`}>
        <div>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.role}>AI, data, software engineering and full-stack development.</p>
        </div>

        <div className={styles.links}>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <img src={linkedin} alt="" />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <img src={github} alt="" />
          </a>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className={`page-width ${styles.bottom}`}>
        <span>© {year} {site.shortName}</span>
        <span>Built as a static, privacy-conscious React portfolio.</span>
      </div>
    </footer>
  );
}
