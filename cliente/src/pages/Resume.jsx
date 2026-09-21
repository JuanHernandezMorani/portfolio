import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { resumes } from '../data/resume.js';
import { site } from '../data/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './Resume.module.css';

const copy = {
  en: {
    metaTitle: 'Resume',
    metaDescription: 'Resume, independent project experience, education, certifications and technical skills of Juan Braian Hernández Morani.',
    eyebrow: 'Resume',
    title: 'Experience, education and technical focus.',
    languageLabel: 'Resume language',
    english: 'English',
    spanish: 'Español',
    download: 'Download PDF',
    open: 'Open PDF',
    experienceEyebrow: 'Independent project experience',
    experienceTitle: 'Experience',
    educationEyebrow: 'Education',
    educationTitle: 'Training',
    certificationsEyebrow: 'Certifications',
    certificationsTitle: 'Credentials',
    skills: 'Technical skills',
    languages: 'Languages'
  },
  es: {
    metaTitle: 'Currículum',
    metaDescription: 'Currículum, experiencia en proyectos independientes, formación, certificaciones y habilidades técnicas de Juan Braian Hernández Morani.',
    eyebrow: 'Currículum',
    title: 'Experiencia, formación y enfoque técnico.',
    languageLabel: 'Idioma del currículum',
    english: 'English',
    spanish: 'Español',
    download: 'Descargar PDF',
    open: 'Abrir PDF',
    experienceEyebrow: 'Experiencia en proyectos independientes',
    experienceTitle: 'Experiencia',
    educationEyebrow: 'Educación',
    educationTitle: 'Formación',
    certificationsEyebrow: 'Certificaciones',
    certificationsTitle: 'Credenciales',
    skills: 'Habilidades técnicas',
    languages: 'Idiomas'
  }
};

function languageFromSearchParams(searchParams) {
  return searchParams.get('lang') === 'es' ? 'es' : 'en';
}

export default function Resume() {
  const [searchParams, setSearchParams] = useSearchParams();
  const language = languageFromSearchParams(searchParams);
  const resume = resumes[language];
  const labels = copy[language];
  const pdfPath = site.cvPaths[language];
  const downloadName = site.cvDownloadNames[language];

  usePageMeta(labels.metaTitle, labels.metaDescription);

  const changeLanguage = (nextLanguage) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextLanguage === 'en') nextParams.delete('lang');
    else nextParams.set('lang', nextLanguage);
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <section className="page-section" lang={language}>
      <div className="page-width">
        <Reveal className={styles.header}>
          <div>
            <p className="eyebrow">{labels.eyebrow}</p>
            <h1>{labels.title}</h1>
            <p>{resume.summary}</p>
          </div>

          <div className={styles.headerControls}>
            <div className={styles.languageSwitch} role="group" aria-label={labels.languageLabel}>
              <button
                type="button"
                className={`${styles.languageButton} ${language === 'en' ? styles.languageButtonActive : ''}`}
                aria-pressed={language === 'en'}
                onClick={() => changeLanguage('en')}
              >
                {labels.english}
              </button>
              <button
                type="button"
                className={`${styles.languageButton} ${language === 'es' ? styles.languageButtonActive : ''}`}
                aria-pressed={language === 'es'}
                onClick={() => changeLanguage('es')}
              >
                {labels.spanish}
              </button>
            </div>

            <div className={styles.headerActions}>
              <a className="button button-primary" href={pdfPath} download={downloadName}>{labels.download}</a>
              <a className="button button-secondary" href={pdfPath} target="_blank" rel="noreferrer">{labels.open}</a>
            </div>
          </div>
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <Reveal>
              <SectionHeading eyebrow={labels.experienceEyebrow} title={labels.experienceTitle} />
              <div className={styles.entries}>
                {resume.experience.map((item) => (
                  <article key={`${item.role}-${item.company}`} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <div>
                        <h3>{item.role}{item.company ? ` — ${item.company}` : ''}</h3>
                        {item.context && <p className={styles.context}>{item.context}</p>}
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
              <SectionHeading eyebrow={labels.educationEyebrow} title={labels.educationTitle} />
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
              <SectionHeading eyebrow={labels.certificationsEyebrow} title={labels.certificationsTitle} />
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
                <h2>{labels.skills}</h2>
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
                <h2>{labels.languages}</h2>
                <ul className={styles.languages}>
                  {resume.languages.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
