import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './NotFound.module.css';

export default function NotFound() {
  usePageMeta('Page not found');

  return (
    <section className={styles.page}>
      <div className="page-width">
        <p className="eyebrow">404</p>
        <h1>This page does not exist.</h1>
        <p>The page may have moved, been renamed or no longer be available.</p>
        <Link className="button button-primary" to="/">Return home</Link>
      </div>
    </section>
  );
}
