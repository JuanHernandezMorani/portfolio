import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CapabilityModal from '../components/supporter/CapabilityModal.jsx';
import { supporterAI } from '../data/privateProjects.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './SupporterAI.module.css';

export default function SupporterAI() {
  usePageMeta('SupporterAI', 'Public product overview and roadmap for SupporterAI, an active private local-first autonomous AI engineering workbench.');
  const [activeCapability, setActiveCapability] = useState(null);
  const lastTrigger = useRef(null);

  const openCapability = useCallback((capability, event) => {
    lastTrigger.current = event.currentTarget;
    setActiveCapability(capability);
  }, []);

  const closeCapability = useCallback(() => {
    setActiveCapability(null);
    window.requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);

  return (
    <>
      <section className={`page-section ${styles.hero}`}>
        <div className={`page-width ${styles.heroGrid}`}>
          <Reveal>
            <div className={styles.statusRow}>
              <span className="status-pill status-private">Private</span>
              <span className="status-pill status-active">Active development</span>
              <span className={styles.versionPill}>{supporterAI.version}</span>
            </div>
            <p className="eyebrow">{supporterAI.stage}</p>
            <h1>{supporterAI.name}</h1>
            <p className={styles.lead}>{supporterAI.summary}</p>
            <div className={styles.heroActions}>
              <Link className="button button-secondary" to="/research">Back to private R&amp;D</Link>
              <Link className="button button-primary" to="/contact">Discuss the project</Link>
            </div>
          </Reveal>

          <Reveal delay={45} className={styles.focusPanel}>
            <p className={styles.panelLabel}>Current focus</p>
            <p>{supporterAI.currentFocus}</p>
            <div className={styles.divider} />
            <p className={styles.panelLabel}>Current checkpoint</p>
            <p>{supporterAI.currentCheckpoint}</p>
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
              eyebrow="Platform snapshot"
              title="One workbench for long, tool-driven AI projects"
              description="SupporterAI is designed to keep project understanding, model execution, tools, memory, retrieval and validation coordinated instead of splitting them into disconnected utilities."
            />
          </Reveal>
          <div className={styles.statsGrid}>
            {supporterAI.platformStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 25}>
                <article className={styles.statCard}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <p>{stat.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-tight">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="A project moves through one coordinated product flow"
              description="The user gives SupporterAI a goal. The platform keeps durable project context, plans the work, selects the appropriate capabilities, validates outcomes and preserves useful state for the next step."
            />
          </Reveal>
          <Reveal delay={35} className={styles.flowPanel}>
            {[
              ['01', 'Goal & project context', 'Understand the request, existing project and constraints.'],
              ['02', 'Plan & dependencies', 'Organize work by prerequisites, conflicts and readiness.'],
              ['03', 'Tools, knowledge & models', 'Use only the capabilities needed for the current task.'],
              ['04', 'Validation & evidence', 'Check results and keep evidence connected to the work.'],
              ['05', 'Durable continuation', 'Preserve the project state, decisions and useful knowledge.']
            ].map(([number, title, description], index, list) => (
              <React.Fragment key={title}>
                <article className={styles.flowStep}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
                {index < list.length - 1 && <i className={styles.flowArrow} aria-hidden="true">→</i>}
              </React.Fragment>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="page-section-tight">
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="What SupporterAI can coordinate"
              description="Select any capability to open a product-level mockup and a plain-language explanation of what it means in practice."
            />
          </Reveal>
          <div className={styles.capabilityGrid}>
            {supporterAI.capabilities.map((capability, index) => (
              <Reveal key={capability.id} delay={(index % 4) * 22}>
                <button
                  type="button"
                  className={styles.capabilityCard}
                  onClick={(event) => openCapability(capability, event)}
                  aria-haspopup="dialog"
                >
                  <span className={styles.capabilityNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.short}</p>
                  </div>
                  <span className={styles.capabilityAction}>Explore capability <b aria-hidden="true">↗</b></span>
                </button>
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
                description="The roadmap uses milestone states rather than percentages because each stage represents a different type and amount of engineering work."
              />
              <ol className={styles.timeline}>
                {supporterAI.milestones.map((milestone) => (
                  <li key={milestone.label} className={styles[milestone.state]}>
                    <span className={styles.dot} aria-hidden="true" />
                    <div>
                      <strong>{milestone.label}</strong>
                      <p>{milestone.detail}</p>
                      <small>{milestone.state}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={45} className={styles.principlesPanel}>
              <p className="eyebrow">Engineering principles</p>
              <h2>Designed for durable, locally controlled engineering work.</h2>
              <ul className="tag-list">
                {supporterAI.principles.map((principle) => <li key={principle}>{principle}</li>)}
              </ul>
              <div className={styles.disclosure}>
                <strong>Public project scope</strong>
                <p>{supporterAI.disclosure}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`page-section ${styles.roadmapSection}`}>
        <div className="page-width">
          <Reveal>
            <SectionHeading
              eyebrow="Forward roadmap"
              title="Where the platform is heading"
              description="The public roadmap focuses on software, AI, knowledge, toolchain and interaction capabilities planned after the current architecture-consolidation work."
            />
          </Reveal>
          <div className={styles.roadmapGrid}>
            {supporterAI.roadmap.map((item, index) => (
              <Reveal key={`${item.phase}-${item.title}`} delay={(index % 4) * 25}>
                <article className={styles.roadmapCard}>
                  <span>{item.phase}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CapabilityModal capability={activeCapability} onClose={closeCapability} />
    </>
  );
}
