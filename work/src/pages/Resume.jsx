import React from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { resume } from '../data/resume.js';
import { site } from '../data/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './Resume.module.css';

export default function Resume() {
  usePageMeta('Resume', 'Resume, experience, education, certifications and technical skills of Juan Braian Hernández Morani.');

  return (
    <section className="page-section">
      <div className="page-width">
        <Reveal className={styles.header}>
          <div>
            <p className="eyebrow">Resume</p>
            <h1>Experience, education and technical focus.</h1>
            <p>{resume.summary}</p>
          </div>
          <div className={styles.headerActions}>
            <a className="button button-primary" href={site.cvPath} download="Juan_Braian_Hernandez_Morani_CV.pdf">Download PDF</a>
            <a className="button button-secondary" href={site.cvPath} target="_blank" rel="noreferrer">Open PDF</a>
          </div>
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <Reveal>
              <SectionHeading eyebrow="Professional experience" title="Experience" />
              <div className={styles.entries}>
                {resume.experience.map((item) => (
                  <article key={`${item.role}-${item.company}`} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <div>
                        <h3>{item.role} — {item.company}</h3>
                      </div>
                      <span>{item.period}</span>
                    </div>
                    <ul>
                      {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <SectionHeading eyebrow="Education" title="Training" />
              <div className={styles.entries}>
                {resume.education.map((item) => (
                  <article key={`${item.institution}-${item.title}`} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <div>
                        <h3>{item.institution}</h3>
                        <p>{item.title}</p>
                      </div>
                      <span>{item.period}</span>
                    </div>
                    <p className={styles.detail}>{item.detail}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <SectionHeading eyebrow="Certifications" title="Credentials" />
              <div className={styles.certifications}>
                {resume.certifications.map((item) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                    <span>{item.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className={styles.sidebar}>
            <Reveal>
              <article className={styles.sideCard}>
                <h2>Skills</h2>
                <div className={styles.skillGroups}>
                  {resume.skills.map((group) => (
                    <div key={group.label}>
                      <h3>{group.label}</h3>
                      <ul className="tag-list">
                        {group.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={70}>
              <article className={styles.sideCard}>
                <h2>Languages</h2>
                <ul className={styles.languages}>
                  {resume.languages.map((language) => <li key={language}>{language}</li>)}
                </ul>
              </article>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
