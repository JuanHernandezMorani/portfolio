import React, { useEffect, useRef } from 'react';
import styles from './CapabilityModal.module.css';

function Mockup({ mockup }) {
  if (!mockup) return null;

  if (mockup.type === 'runtime') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>runtime</span></div>
        <div className={styles.runtimeHeader}>
          <span className={styles.liveDot} />
          <div><small>{mockup.eyebrow}</small><strong>{mockup.title}</strong></div>
        </div>
        <div className={styles.metricGrid}>
          {mockup.rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </div>
    );
  }

  if (mockup.type === 'search') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>retrieval</span></div>
        <div className={styles.searchBar}>⌕ <span>{mockup.title}</span></div>
        <div className={styles.resultStack}>
          {mockup.results.map(([title, detail], index) => (
            <div key={title} className={styles.resultRow}>
              <span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><small>{detail}</small></div><b>{96 - index * 7}%</b>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mockup.type === 'memory') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>memory</span></div>
        <p className={styles.mockEyebrow}>{mockup.eyebrow}</p>
        <h4>{mockup.title}</h4>
        <div className={styles.memoryLine}>
          {mockup.events.map(([title, detail]) => (
            <div key={title}><span /><div><strong>{title}</strong><small>{detail}</small></div></div>
          ))}
        </div>
      </div>
    );
  }

  if (mockup.type === 'orchestration') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>orchestration</span></div>
        <p className={styles.mockEyebrow}>{mockup.eyebrow}</p>
        <h4>{mockup.title}</h4>
        <div className={styles.nodeStack}>
          {mockup.nodes.map(([title, state], index) => (
            <div key={title} className={`${styles.nodeRow} ${styles[`node_${state}`]}`}>
              <span>{index + 1}</span><strong>{title}</strong><small>{state}</small>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mockup.type === 'media') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>multimodal</span></div>
        <p className={styles.mockEyebrow}>{mockup.eyebrow}</p>
        <h4>{mockup.title}</h4>
        <div className={styles.mediaGrid}>
          {mockup.media.map((item, index) => <div key={item}><span>{['▧', '▶', '▤', '⌁'][index]}</span><strong>{item}</strong><small>Ready for analysis</small></div>)}
        </div>
      </div>
    );
  }

  if (mockup.type === 'engineering') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>engineering</span></div>
        <div className={styles.engineeringGrid}>
          <div className={styles.fileTree}>
            <small>CHANGED FILES</small>
            {mockup.files.map((file) => <span key={file}>⌁ {file}</span>)}
          </div>
          <div className={styles.checkPanel}>
            <small>VALIDATION</small>
            {mockup.checks.map((check) => <span key={check}>✓ {check}</span>)}
          </div>
        </div>
        <div className={styles.diffLine}><i /><i /><i /><i /><i /></div>
      </div>
    );
  }

  if (mockup.type === 'dataset') {
    return (
      <div className={styles.mockWindow}>
        <div className={styles.windowBar}><i /><i /><i /><span>dataset</span></div>
        <p className={styles.mockEyebrow}>{mockup.eyebrow}</p>
        <h4>{mockup.title}</h4>
        <div className={styles.pipeline}>
          {mockup.steps.map((step, index) => <React.Fragment key={step}><div><span>{index + 1}</span><strong>{step}</strong></div>{index < mockup.steps.length - 1 && <b>→</b>}</React.Fragment>)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mockWindow}>
      <div className={styles.windowBar}><i /><i /><i /><span>local-first</span></div>
      <p className={styles.mockEyebrow}>{mockup.eyebrow}</p>
      <h4>{mockup.title}</h4>
      <div className={styles.serviceGrid}>
        {mockup.services.map(([service, state]) => <div key={service}><span className={state === 'online' ? styles.serviceOnline : styles.serviceOptional} /><strong>{service}</strong><small>{state}</small></div>)}
      </div>
    </div>
  );
}

export default function CapabilityModal({ capability, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!capability) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [capability, onClose]);

  if (!capability) return null;

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`capability-${capability.id}-title`}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close capability details">×</button>
        <div className={styles.copy}>
          <p className="eyebrow">Capability overview</p>
          <h2 id={`capability-${capability.id}-title`}>{capability.title}</h2>
          <p className={styles.lead}>{capability.description}</p>
          <ul className={styles.highlights}>
            {capability.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className={styles.note}>This visualization is a product-level mockup intended to explain the capability without exposing private implementation details.</p>
        </div>
        <div className={styles.visual} aria-label={`${capability.title} conceptual mockup`}>
          <Mockup mockup={capability.mockup} />
        </div>
      </section>
    </div>
  );
}
