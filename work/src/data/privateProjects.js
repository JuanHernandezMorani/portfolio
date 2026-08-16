export const privateProjects = [
  {
    id: 'supporter-ai',
    name: 'SupporterAI',
    visibility: 'Private',
    status: 'Active development',
    stage: 'S11-C · Pre-Phase-28-FIX-01',
    summary: 'A local-first AI engineering workbench that brings model execution, retrieval, memory, tools, multimodal workflows and software-engineering assistance into one evolving environment.',
    currentFocus: 'Completing the migration of remaining legacy paths into the consolidated architecture, validating the unified runtime, and removing legacy dependencies before the next major phase.',
    nextObjective: 'Close S11-C / Pre-Phase-28-FIX-01 cleanly, then continue into Phase 28 on top of the consolidated architecture.',
    capabilities: [
      'Local LLM execution',
      'Retrieval and semantic search',
      'Long-term memory workflows',
      'Tool execution and orchestration',
      'Multimodal processing',
      'Software-engineering workflows',
      'Dataset and evaluation workflows',
      'Offline-first operation'
    ],
    principles: [
      'Local-first',
      'Modular',
      'Evidence-driven',
      'Extensible',
      'Offline-capable',
      'Privacy-conscious'
    ],
    milestones: [
      { label: 'Core architecture', state: 'complete' },
      { label: 'Local inference integration', state: 'complete' },
      { label: 'Tool and retrieval foundations', state: 'complete' },
      { label: 'S11-A', state: 'complete' },
      { label: 'S11-B', state: 'complete' },
      { label: 'S11-C / Pre-Phase-28-FIX-01', state: 'current' },
      { label: 'Phase 28', state: 'next' },
      { label: 'Further platform expansion', state: 'planned' }
    ],
    disclosure: 'Source code, internal implementation details, private datasets and sensitive architecture specifics are intentionally not published while the project remains under active development.'
  }
];

export const supporterAI = privateProjects[0];
