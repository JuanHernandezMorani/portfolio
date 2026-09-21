export const privateProjects = [
  {
    id: 'supporter-ai',
    name: 'SupporterAI',
    visibility: 'Private',
    status: 'Active development',
    version: 'Core v1.0-Alpha',
    stage: 'PRE-PHASE-28-FIX-01 · S11-B-FIX-01',
    summary: 'A local-first autonomous AI workbench designed to manage long, complex projects from one coordinated environment. It combines local model execution, durable project orchestration, code and file operations, structured memory, semantic retrieval, MCP connectivity, multimodal analysis, specialized engineering workflows and evidence-based validation.',
    currentFocus: 'Consolidating the canonical execution path, preserving useful capabilities in their definitive owners and removing the remaining executable legacy paths before integrated validation.',
    currentCheckpoint: 'S11-A is complete. S11-B is technically converged and its FIX-01 certification path is the active checkpoint; S11-C remains next in sequence. The target is a single validated runtime with zero parallel legacy execution paths.',
    nextObjective: 'Complete S11-B-FIX-01, S11-C, S12 and deterministic hardening, then pass the integrated empirical validation required to activate SupporterAI Core v1.0-Beta.',
    platformStats: [
      { value: '82', label: 'registered tools', note: 'General-purpose and specialist capabilities in one registry; optional integrations activate only when available.' },
      { value: 'Local-first', label: 'model & data control', note: 'Local runtimes and locally controlled knowledge are preferred whenever practical.' },
      { value: 'MPO', label: 'long-project orchestration', note: 'Multiple prompts can become one dependency-aware project backlog.' },
      { value: 'Evidence', label: 'validation-driven', note: 'Outcomes, tool events, checkpoints and validation remain part of the engineering workflow.' }
    ],
    capabilities: [
      {
        id: 'local-llm',
        title: 'Local LLM execution',
        short: 'Run compatible language models locally and route work according to the available resources.',
        description: 'SupporterAI is built around locally controlled inference. The product can use configured GGUF/llama.cpp-compatible model runtimes, keep model identity and runtime state explicit, and make resource-aware decisions without making a hosted model mandatory for normal operation.',
        highlights: ['Local model runtime', 'Resource-aware routing', 'Explicit model/runtime state', 'Configurable optional services'],
        mockup: {
          type: 'runtime',
          eyebrow: 'LOCAL MODEL RUNTIME',
          title: 'Agent model ready',
          rows: [
            ['Runtime', 'llama.cpp compatible'],
            ['Execution', 'Local'],
            ['Context', 'Project-aware'],
            ['Routing', 'Resource-aware']
          ]
        }
      },
      {
        id: 'retrieval',
        title: 'Retrieval and semantic search',
        short: 'Find the most relevant project knowledge instead of pushing the entire knowledge base into every prompt.',
        description: 'The retrieval layer can combine semantic and lexical signals, query expansion, reranking, filtering and context pruning. Qdrant-backed knowledge is optional, so the core product can continue operating when a populated retrieval collection is unavailable.',
        highlights: ['Semantic + lexical retrieval', 'Hybrid ranking', 'Reranking and filtering', 'Context pruning'],
        mockup: {
          type: 'search',
          eyebrow: 'KNOWLEDGE RETRIEVAL',
          title: 'How does project recovery work?',
          results: [
            ['Architecture', 'Canonical project state and restart recovery'],
            ['Validation evidence', 'Latest verified execution outcomes'],
            ['Project memory', 'Relevant decisions and constraints']
          ]
        }
      },
      {
        id: 'memory',
        title: 'Long-term memory workflows',
        short: 'Preserve useful project context, decisions and validated outcomes across tasks and restarts.',
        description: 'SupporterAI separates working context from durable conversation, project, vector and shared-context memory. Each layer serves a different purpose so short-term reasoning, reusable knowledge and persistent project state do not collapse into one unstructured history.',
        highlights: ['Working context', 'Conversation continuity', 'Vector-backed recall', 'Shared project context'],
        mockup: {
          type: 'memory',
          eyebrow: 'PROJECT MEMORY',
          title: 'Durable context timeline',
          events: [
            ['Owner correction', 'Preserved as a project constraint'],
            ['Validated outcome', 'Promoted for future retrieval'],
            ['Restart recovery', 'Project context restored']
          ]
        }
      },
      {
        id: 'tools',
        title: 'Tool execution and orchestration',
        short: 'Turn large requests into ordered work and give each task only the tools it actually needs.',
        description: 'The Multi-Prompt Project Orchestrator can normalize many prompts, detect dependencies and conflicts, build a durable task graph and select ready work. Tool execution remains governed through one ecosystem with explicit schemas, availability, policy checks, events and validation.',
        highlights: ['Dependency-aware backlog', 'Task graph / ready queue', 'Bounded tool selection', 'Pause, resume and recovery'],
        mockup: {
          type: 'orchestration',
          eyebrow: 'PROJECT ORCHESTRATION',
          title: 'Dependency-aware execution',
          nodes: [
            ['Inspect repository', 'done'],
            ['Map dependencies', 'done'],
            ['Apply change', 'running'],
            ['Run validation', 'queued']
          ]
        }
      },
      {
        id: 'multimodal',
        title: 'Multimodal processing',
        short: 'Use screenshots, images, documents, logs, archives, audio and video as engineering evidence.',
        description: 'Multimodal capabilities are coordinated as part of the same project workflow rather than treated as an isolated demo. SupporterAI can inspect visual and media evidence, correlate it with project context and route it toward the tools that can analyze, transform or validate it.',
        highlights: ['Image and screenshot analysis', 'Document and archive inspection', 'Audio/video workflows', 'Evidence correlation'],
        mockup: {
          type: 'media',
          eyebrow: 'MULTIMODAL EVIDENCE',
          title: 'Inspection workspace',
          media: ['Screenshot', 'Video', 'Document', 'Logs']
        }
      },
      {
        id: 'software-engineering',
        title: 'Software-engineering workflows',
        short: 'Inspect, modify, test and validate real software projects with explicit workspace boundaries.',
        description: 'The engineering workflow spans repository understanding, code analysis, structured editing, builds, tests, diffs, runtime logs, checkpoints and governed changes. The objective is not only to generate code, but to produce changes that can be inspected and validated as part of a durable project.',
        highlights: ['Repository inspection', 'Structured code changes', 'Build/test/diff workflows', 'Checkpoints and rollback'],
        mockup: {
          type: 'engineering',
          eyebrow: 'SOFTWARE ENGINEERING',
          title: 'Change set validation',
          files: ['backend/service.py', 'TESTS/integration/test_flow.py', 'docs/architecture.md'],
          checks: ['Build passed', 'Tests passed', 'Diff reviewed']
        }
      },
      {
        id: 'datasets',
        title: 'Dataset and evaluation workflows',
        short: 'Prepare knowledge, validate integrity and keep evaluation evidence connected to the product workflow.',
        description: 'SupporterAI includes Dataset Store, ingestion, integrity, embedding and evaluation concepts inside the same platform. The roadmap expands this into a canonical curation and retrieval fabric so datasets and corpora can be normalized, deduplicated, validated, indexed and reused with provenance.',
        highlights: ['Ingestion and normalization', 'Integrity and deduplication', 'Embeddings and indexing', 'Evaluation and provenance'],
        mockup: {
          type: 'dataset',
          eyebrow: 'DATA PIPELINE',
          title: 'Curated knowledge flow',
          steps: ['Ingest', 'Normalize', 'Deduplicate', 'Validate', 'Embed', 'Index']
        }
      },
      {
        id: 'offline-first',
        title: 'Offline-first operation',
        short: 'Keep the core useful with local models, local workspaces and locally controlled state even when optional services are absent.',
        description: 'Offline-first means the essential product path is designed around local execution and explicit degraded states. External services, browser automation, multimedia backends or specialist integrations can be added when configured, but they do not become hidden requirements for every task.',
        highlights: ['Local workspace', 'Local inference', 'Optional retrieval/services', 'Explicit degraded states'],
        mockup: {
          type: 'offline',
          eyebrow: 'LOCAL-FIRST MODE',
          title: 'Core services available locally',
          services: [
            ['Model runtime', 'online'],
            ['Workspace', 'online'],
            ['Memory', 'online'],
            ['External integrations', 'optional']
          ]
        }
      }
    ],
    principles: [
      'Local-first',
      'Modular',
      'Evidence-driven',
      'Resource-aware',
      'Safely autonomous',
      'Extensible',
      'Offline-capable',
      'Single canonical authority'
    ],
    milestones: [
      { label: 'PRE-PHASE-28 · Gates A–G', detail: 'Core cognitive, tool, memory and project capabilities validated.', state: 'complete' },
      { label: 'S01–S10 + S11-A', detail: 'Canonicalization work completed through the first S11 slice.', state: 'complete' },
      { label: 'S11-B-FIX-01', detail: 'Active certification checkpoint inside PRE-PHASE-28-FIX-01.', state: 'current' },
      { label: 'S11-C + S12 + hardening', detail: 'Finish legacy removal, cleanup and deterministic convergence.', state: 'next' },
      { label: 'Core v1.0-Beta', detail: 'Integrated empirical validation on one canonical execution path.', state: 'planned' },
      { label: 'ENHANCE-01', detail: 'Durable temporal, contractual and operational planning.', state: 'planned' },
      { label: 'ENHANCE-02', detail: 'Unified workspace, lightweight desktop and governed remote execution.', state: 'planned' },
      { label: 'Phases 28–31', detail: 'Engineering verification, specialist toolchains and visual/runtime evidence.', state: 'planned' },
      { label: 'PRE-PHASE-32 + Phase-32', detail: 'Canonical data curation, embeddings and knowledge retrieval fabric.', state: 'planned' },
      { label: 'Phase-33 + Phase-34', detail: 'Product frontend and multidomain capability packs, including deep engineering toolchains.', state: 'planned' },
      { label: 'SupporterAI Core v1.0.0', detail: 'First complete release after the planned v1 core roadmap closes.', state: 'planned' },
      { label: 'v1.1.0–v1.7.0', detail: 'Planned multimodal generation expansion across the established product architecture.', state: 'planned' },
      { label: 'Phases 35–36', detail: 'Reasoning governance, adaptive model runtime, voice and richer evidence workflows.', state: 'planned' },
      { label: 'PRE-PHASE-37 + PHASE-37', detail: 'Terminal benchmark reconciliation and quantitative certification for v2.0.0.', state: 'planned' }
    ],
    roadmap: [
      {
        phase: 'ENHANCE-01',
        title: 'Durable planning and execution contracts',
        description: 'Unify plans, dependencies, TODOs, checkpoints, approvals and operational timing so long projects can continue from durable state instead of relying on transient chat context.'
      },
      {
        phase: 'ENHANCE-02',
        title: 'Unified workspace and remote execution',
        description: 'Extend the same canonical SupporterAI authority across compatible computers, with a lightweight desktop and governed execution on the computer or runtime best suited to each task.'
      },
      {
        phase: 'PHASE 28',
        title: 'Engineering verification',
        description: 'Deepen dependency-impact analysis, compiler diagnostics, test-coverage mapping and API-contract validation so changes are evaluated as engineering systems, not isolated files.'
      },
      {
        phase: 'PHASES 29–31',
        title: 'Specialized toolchains and evidence',
        description: 'Expand specialist programming/runtime support, binary and asset inspection, and correlation between logs, runtime behavior, screenshots and video evidence.'
      },
      {
        phase: 'PRE-PHASE-32 / PHASE-32',
        title: 'Canonical knowledge fabric',
        description: 'Build the governed curation foundation, then clean, deduplicate, validate, embed and index the real SupporterAI corpus across semantic, lexical, graph and hierarchical retrieval.'
      },
      {
        phase: 'PHASES 33–34',
        title: 'Product UX and multidomain expansion',
        description: 'Deliver the mature product interface and generalize shared capabilities into reusable domain packs, including cross-platform reverse engineering, deep decompilation and pseudocode restoration, and emulation/compatibility engineering without duplicating the core agent, memory or orchestration authorities.'
      },
      {
        phase: 'v1.1–v1.7',
        title: 'Multimodal generation expansion',
        description: 'Extend the established inspection and media workflows with progressively richer native generation capabilities while keeping them inside the same coordinated product.'
      },
      {
        phase: 'PHASES 35–36',
        title: 'Reasoning, adaptive runtime and richer interaction',
        description: 'Strengthen epistemic reasoning and safe termination, then add user-governed model handoff, voice interaction, gameplay/visual evidence workflows and broader applied AI tool mastery.'
      },
      {
        phase: 'V2.0.0',
        title: 'Quantitatively certified platform',
        description: 'Close with benchmark reconciliation and quantitative certification after the substantive capability roadmap is complete.'
      }
    ],
    disclosure: 'SupporterAI is presented here at product and capability level. Source code, private datasets, proprietary implementation details, credentials and sensitive internal architecture remain private.'
  }
];

export const supporterAI = privateProjects[0];
