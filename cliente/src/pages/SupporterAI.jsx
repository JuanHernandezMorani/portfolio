import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { supporterAI } from '../data/privateProjects.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './SupporterAI.module.css';

export default function SupporterAI() {
  usePageMeta('SupporterAI', 'Public overview of SupporterAI, an active private local-first AI engineering workbench.');

  return (
    <>
      <section className={`page-section ${styles.hero}`}>
        <div className={`page-width ${styles.heroGrid}`}>
          <Reveal>
            <div className={styles.statusRow}>
              <span className="status-pill status-private">Private</span>
              <span className="status-pill status-active">Active development</span>
            </div>
            <p className="eyebrow">{supporterAI.stage}</p>
            <h1>{supporterAI.name}</h1>
            <p className={styles.lead}>{supporterAI.summary}</p>
            <div className={styles.heroActions}>
              <Link className="button button-secondary" to="/research">Back to private R&amp;D</Link>
              <Link className="button button-primary" to="/contact">Discuss the project</Link>
            </div>
          </Reveal>

          <Reveal delay={90} className={styles.focusPanel}>
            <p className={styles.panelLabel}>Current focus</p>
            <p>{supporterAI.currentFocus}</p>
            <div className={styles.divider} />
            <p className={styles.panelLabel}>Next objective</p>
            <p>{supporterAI.nextObjective}</p>
          </Reveal>
        </div>
      </section>

      <section className="page-section-tight">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What the project contains at a public level"
              description="Capabilities are described by outcome and function. Internal implementation details are intentionally omitted."
            />
          </Reveal>
          <div className={styles.capabilityGrid}>
            {supporterAI.capabilities.map((capability, index) => (
              <Reveal key={capability} delay={index * 45}>
                <article className={styles.capabilityCard}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{capability}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-width">
          <div className={styles.detailGrid}>
            <Reveal>
              <SectionHeading
                eyebrow="Development status"
                title="Current stage and roadmap"
                description="The roadmap is intentionally expressed as milestones rather than percentages because phases differ significantly in scope."
              />
              <ol className={styles.timeline}>
                {supporterAI.milestones.map((milestone) => (
                  <li key={milestone.label} className={styles[milestone.state]}>
                    <span className={styles.dot} aria-hidden="true" />
                    <div>
                      <strong>{milestone.label}</strong>
                      <small>{milestone.state}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={100} className={styles.principlesPanel}>
              <p className="eyebrow">Engineering principles</p>
              <h2>Designed for long-term ownership and iteration.</h2>
              <ul className="tag-list">
                {supporterAI.principles.map((principle) => <li key={principle}>{principle}</li>)}
              </ul>
              <div className={styles.disclosure}>
                <strong>Public disclosure boundary</strong>
                <p>{supporterAI.disclosure}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
