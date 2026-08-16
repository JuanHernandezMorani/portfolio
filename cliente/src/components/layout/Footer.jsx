import React from 'react';
import { Link } from 'react-router-dom';
import githubDark from '../../assets/icons/github-mark-white.png';
import githubLight from '../../assets/icons/github-mark.png';
import linkedinDark from '../../assets/icons/linkedin-white.png';
import linkedinLight from '../../assets/icons/linkedin.png';
import facebookDark from '../../assets/icons/facebook-white.png';
import facebookLight from '../../assets/icons/facebook.png';
import instagramDark from '../../assets/icons/instagram-white.png';
import instagramLight from '../../assets/icons/instagram.png';
import { site } from '../../data/site.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={styles.footer}>
      <div className={`page-width ${styles.inner}`}>
        <div>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.role}>AI, data, software engineering and full-stack development.</p>
        </div>

        <div className={styles.links}>
          <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook profile">
            <img src={isDark ? facebookDark : facebookLight} alt="" />
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram profile">
            <img src={isDark ? instagramDark : instagramLight} alt="" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <img src={isDark ? linkedinDark : linkedinLight} alt="" />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <img src={isDark ? githubDark : githubLight} alt="" />
          </a>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className={`page-width ${styles.bottom}`}>
        <span>© {year} {site.shortName}</span>
        <span>AI · Data · Software Engineering</span>
      </div>
    </footer>
  );
}
