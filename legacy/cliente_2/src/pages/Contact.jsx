import React from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import { site } from '../data/site.js';
import { useTheme } from '../context/ThemeContext.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import locationIcon from '../assets/icons/ubicacion.png';
import githubDark from '../assets/icons/github-mark-white.png';
import githubLight from '../assets/icons/github-mark.png';
import linkedinDark from '../assets/icons/linkedin-white.png';
import linkedinLight from '../assets/icons/linkedin.png';
import facebookDark from '../assets/icons/facebook-white.png';
import facebookLight from '../assets/icons/facebook.png';
import instagramDark from '../assets/icons/instagram-white.png';
import instagramLight from '../assets/icons/instagram.png';
import styles from './Contact.module.css';

export default function Contact() {
  usePageMeta('Contact', 'Contact Juan Braian Hernández Morani for AI, data, software engineering and full-stack opportunities.');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
              <img src={isDark ? githubDark : githubLight} alt="" />
              <span>
                <small>GitHub</small>
                <strong>JuanHernandezMorani</strong>
              </span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <img src={isDark ? linkedinDark : linkedinLight} alt="" />
              <span>
                <small>LinkedIn</small>
                <strong>Professional profile</strong>
              </span>
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer">
              <img src={isDark ? facebookDark : facebookLight} alt="" />
              <span>
                <small>Facebook</small>
                <strong>Juan.hernandez.morani.97</strong>
              </span>
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              <img src={isDark ? instagramDark : instagramLight} alt="" />
              <span>
                <small>Instagram</small>
                <strong>@elchetomdq97</strong>
              </span>
            </a>
          </div>

          <p className={styles.formNote}>
            Messages sent through this form are delivered to my contact inbox. You can also reach me through email or any of the social profiles above.
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
