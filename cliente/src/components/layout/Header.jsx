import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ownImg from '../../assets/images/own.png';
import { navigation } from '../../data/site.js';
import { useTheme } from '../../context/ThemeContext.jsx';
import styles from './Header.module.css';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 1.75v2.5M12 19.75v2.5M4.75 4.75l1.77 1.77M17.48 17.48l1.77 1.77M1.75 12h2.5M19.75 12h2.5M4.75 19.25l1.77-1.77M17.48 6.52l1.77-1.77" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.5 2.25c-3.95.73-6.94 4.2-6.94 8.38 0 4.71 3.82 8.53 8.53 8.53 3.04 0 5.71-1.59 7.22-3.99a8.97 8.97 0 0 1-3.56.73c-5 0-9.06-4.06-9.06-9.06 0-1.62.43-3.14 1.18-4.46.87-.04 1.76.04 2.63-.13Z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`page-width ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Juan Hernández — home">
          <img src={ownImg} alt="" className={styles.logo} />
          <span className={styles.brandText}>
            <strong>Juan Hernández</strong>
            <small>AI · Software Engineering</small>
          </span>
        </Link>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeButton}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ''}`}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Primary navigation"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
