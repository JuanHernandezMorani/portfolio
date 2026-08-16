import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import PublicProjectCard from '../components/projects/PublicProjectCard.jsx';
import PrivateProjectCard from '../components/projects/PrivateProjectCard.jsx';
import { featuredProjects } from '../data/projects.js';
import { supporterAI } from '../data/privateProjects.js';
import { site } from '../data/site.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import homeBackground from '../assets/images/home-header-bg.png';
import imageA from '../assets/images/a.png';
import imageB from '../assets/images/b.jpg';
import imageC from '../assets/images/c.jpeg';
import imageD from '../assets/images/d.png';
import imageE from '../assets/images/e.png';
import imageF from '../assets/images/f.jpg';
import styles from './Home.module.css';

const focusAreas = [
  {
    title: 'Applied AI & Data',
    description: 'Local AI workflows, retrieval, machine learning, data analysis and practical automation designed around real engineering constraints.',
    image: imageD
  },
  {
    title: 'Full-Stack Systems',
    description: 'Responsive web applications and APIs built with clear boundaries between interface, domain logic, data and integrations.',
    image: imageB
  },
  {
    title: 'Data & Backend Engineering',
    description: 'SQL, API design, semantic retrieval and backend workflows focused on reliability, maintainability and efficient execution.',
    image: imageF
  }
];

const engineeringApproach = [
  {
    title: 'Build for the actual constraint',
    description: 'Architecture is selected around the product, runtime and deployment needs instead of adding infrastructure by default.',
    image: imageA
  },
  {
    title: 'Responsive by design',
    description: 'Interfaces are structured mobile-first and scale cleanly from compact phones to wide desktop displays.',
    image: imageE
  },
  {
    title: 'Iterate with evidence',
    description: 'Complex work is broken into phases, validated incrementally and documented so each next step starts from a reliable baseline.',
    image: imageC
  }
];

export default function Home() {
  usePageMeta(null);

  return (
    <>
      <section className={styles.hero}>
        <img className={styles.heroBackground} src={homeBackground} alt="" aria-hidden="true" />
        <div className={styles.heroOverlay} />
        <div className={`page-width ${styles.heroGrid}`}>
          <Reveal className={styles.heroCopy}>
            <p className="eyebrow">AI · Data · Software Engineering</p>
            <h1>
              Building practical AI and software systems that stay <span>maintainable.</span>
            </h1>
            <p className={styles.heroLead}>
              I&apos;m {site.name}, a {site.role.toLowerCase()}. I work across web applications, APIs, data workflows and local-first AI engineering.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button-primary" to="/projects">Explore public projects</Link>
              <Link className="button button-secondary" to="/research">View active private R&amp;D</Link>
            </div>
            <div className={styles.heroMeta}>
              <span>{site.location}</span>
              <span>Spanish · Native</span>
              <span>English · C1</span>
            </div>
          </Reveal>

          <Reveal className={styles.heroPanel} delay={120}>
            <div className={styles.panelHeader}>
              <span className="status-pill status-active">Active now</span>
              <span className={styles.privateLabel}>Private R&amp;D</span>
            </div>
            <p className={styles.panelKicker}>{supporterAI.stage}</p>
            <h2>{supporterAI.name}</h2>
            <p>{supporterAI.currentFocus}</p>
            <div className={styles.nodeMap} aria-hidden="true">
              <span className={styles.nodeMain}>AI Core</span>
              <span>Tools</span>
              <span>Retrieval</span>
              <span>Memory</span>
              <span>Multimodal</span>
            </div>
            <Link className="text-link" to="/projects/supporter-ai">Open project overview <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>

      <section className="page-section">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="What I work on"
              title="Engineering across AI, data and full-stack software"
              description="The portfolio is organized around the systems I build today, while keeping earlier public work available as part of the technical progression."
            />
          </Reveal>
          <div className={styles.focusGrid}>
            {focusAreas.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className={styles.focusCard}>
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

      <section className={`page-section ${styles.researchSection}`}>
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Private R&D"
              title="Current engineering work, without exposing private implementation"
              description="Private projects are documented through their purpose, current stage, capabilities and next objective. Source code and sensitive implementation details remain private."
            />
          </Reveal>
          <Reveal delay={80}>
            <PrivateProjectCard project={supporterAI} />
          </Reveal>
        </div>
      </section>

      <section className="page-section">
        <div className="page-width">
          <Reveal>
            <div className={styles.sectionTopline}>
              <SectionHeading
                eyebrow="Selected work"
                title="Public projects"
                description="A selection of public work spanning web applications, tooling and game-development projects."
              />
              <Link className="text-link" to="/projects">See all projects <span aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
          <div className={styles.featuredProjects}>
            {featuredProjects.slice(0, 3).map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <PublicProjectCard project={project} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-tight">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Working method"
              title="Structured for long-term iteration"
              description="The visual system and project architecture are deliberately modular so content, projects and future sections can evolve without rebuilding the entire site."
            />
          </Reveal>
          <div className={styles.approachGrid}>
            {engineeringApproach.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className={styles.approachCard}>
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`page-section ${styles.ctaSection}`}>
        <Reveal className={`page-width ${styles.cta}`}>
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Need an engineer who can move between product, code, data and AI?</h2>
            <p>Use the contact form or reach me directly by email.</p>
          </div>
          <Link className="button button-primary" to="/contact">Start a conversation</Link>
        </Reveal>
      </section>
    </>
  );
}
