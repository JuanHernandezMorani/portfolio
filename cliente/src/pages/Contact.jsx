import React from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import { site } from '../data/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import locationIcon from '../assets/icons/ubicacion.png';
import githubIcon from '../assets/icons/github-mark-white.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import styles from './Contact.module.css';

export default function Contact() {
  usePageMeta('Contact', 'Contact Juan Braian Hernández Morani for AI, data, software engineering and full-stack opportunities.');

  return (
    <section className="page-section">
      <div className={`page-width ${styles.layout}`}>
        <Reveal className={styles.info}>
          <p className="eyebrow">Contact</p>
          <h1>Let&apos;s talk about the problem you need to solve.</h1>
          <p className={styles.lead}>
            For roles, collaborations or engineering work, send a message through the form or contact me directly.
          </p>

          <div className={styles.contactList}>
            <div>
              <img src={locationIcon} alt="" />
              <span>
                <small>Location</small>
                <strong>{site.location}</strong>
              </span>
            </div>
            <a href={`mailto:${site.email}`}>
              <span className={styles.iconText}>@</span>
              <span>
                <small>Email</small>
                <strong>{site.email}</strong>
              </span>
            </a>
            <a href={site.github} target="_blank" rel="noreferrer">
              <img src={githubIcon} alt="" />
              <span>
                <small>GitHub</small>
                <strong>JuanHernandezMorani</strong>
              </span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="" />
              <span>
                <small>LinkedIn</small>
                <strong>Professional profile</strong>
              </span>
            </a>
          </div>

          <p className={styles.formNote}>
            The portfolio no longer stores contact data in its own backend. Form submissions are sent through a static-site form endpoint.
          </p>
        </Reveal>

        <Reveal delay={100} className={styles.formPanel}>
          <h2>Send a message</h2>
          <p>Email or phone is enough — you do not need to provide both.</p>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
