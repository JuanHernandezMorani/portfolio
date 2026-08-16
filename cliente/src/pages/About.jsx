import React from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { resume } from '../data/resume.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import portrait from '../assets/images/yo.png';
import ab1 from '../assets/images/ab1.png';
import ab2 from '../assets/images/ab2.png';
import ab3 from '../assets/images/ab3.png';
import ab4 from '../assets/images/ab4.png';
import ab5 from '../assets/images/ab5.png';
import ab6 from '../assets/images/ab6.png';
import styles from './About.module.css';

const strengths = [
  {
    title: 'Applied AI engineering',
    description: 'I work with LLM-oriented systems, machine learning, semantic retrieval and practical automation, with attention to resource limits and real runtime behavior.',
    image: ab1
  },
  {
    title: 'Full-stack development',
    description: 'I build web interfaces, APIs and data-backed applications, with experience across React, Node.js, Express, SQL and third-party integrations.',
    image: ab2
  },
  {
    title: 'Engineering by iteration',
    description: 'I prefer staged delivery, measurable validation and clear technical documentation for work that needs to evolve without losing reliability.',
    image: ab3
  },
  {
    title: 'Programming breadth',
    description: 'My current programming toolbox includes JavaScript, Java, C#, Python and SQL, allowing me to move across product, tooling and data-oriented tasks.',
    image: ab4
  },
  {
    title: 'Data and retrieval',
    description: 'I work with PostgreSQL, MySQL, advanced SQL, vector retrieval concepts, data analysis and the broader Python data ecosystem.',
    image: ab5
  },
  {
    title: 'Tools and environments',
    description: 'Git, GitHub, CI/CD, WSL2, Linux environments and technical documentation are part of my regular development workflow.',
    image: ab6
  }
];

export default function About() {
  usePageMeta('About', 'Technical profile of Juan Braian Hernández Morani across AI, data, full-stack development and software engineering.');

  return (
    <>
      <section className={`page-section ${styles.intro}`}>
        <div className={`page-width ${styles.introGrid}`}>
          <Reveal className={styles.introHeading}>
            <p className="eyebrow">About</p>
            <h1>Software engineering with an AI and data focus.</h1>
          </Reveal>

          <div className={styles.introSide}>
            <Reveal delay={55} className={styles.portraitCard}>
              <img
                src={portrait}
                alt="Portrait of Juan Braian Hernández Morani"
                className={styles.portrait}
                loading="eager"
                decoding="async"
              />
            </Reveal>

            <Reveal delay={110} className={styles.introCopy}>
              <p>{resume.summary}</p>
              <p>
                I&apos;m especially interested in projects where product development, systems thinking, data and AI overlap. My current work includes private R&amp;D as well as public web and software projects.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page-section-tight">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Technical profile"
              title="A broader engineering profile than a single stack"
              description="The portfolio keeps the earlier full-stack foundation, but the current emphasis is AI, data, tooling and maintainable software systems."
            />
          </Reveal>

          <div className={styles.cards}>
            {strengths.map((item, index) => (
              <Reveal key={item.title} delay={index * 55}>
                <article className={styles.card}>
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Current technical toolbox"
              description="Current languages, frameworks, platforms and tools used across AI, data and software engineering work."
            />
          </Reveal>
          <div className={styles.skillGrid}>
            {resume.skills.map((group, index) => (
              <Reveal key={group.label} delay={index * 45}>
                <article className={styles.skillCard}>
                  <h3>{group.label}</h3>
                  <ul className="tag-list">
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
