import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ownImg from '../../assets/images/own.png';
import { navigation } from '../../data/site.js';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
