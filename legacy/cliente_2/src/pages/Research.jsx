import React from 'react';
import Reveal from '../components/ui/Reveal.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import PrivateProjectCard from '../components/projects/PrivateProjectCard.jsx';
import { privateProjects } from '../data/privateProjects.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import styles from './Research.module.css';

export default function Research() {
  usePageMeta('Private R&D', 'High-level public descriptions of active private research and engineering projects by Juan Braian Hernández Morani.');

  return (
    <section className="page-section">
      <div className="page-width">
        <Reveal>
          <SectionHeading
            eyebrow="Private R&D"
            title="Active private engineering projects"
            description="This section shows what is being built, the current stage, the capabilities already present and the next objective — without publishing source code, private datasets or sensitive implementation details."
          />
        </Reveal>

        <Reveal delay={70} className={styles.notice}>
          <div>
            <span className="status-pill status-private">Disclosure boundary</span>
            <h2>Transparent about progress, selective about implementation.</h2>
          </div>
          <p>
            Private work is presented at a product and engineering level. Internal algorithms, private architecture specifics and repository contents are intentionally withheld.
          </p>
        </Reveal>

        <div className={styles.projects}>
          {privateProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <PrivateProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
