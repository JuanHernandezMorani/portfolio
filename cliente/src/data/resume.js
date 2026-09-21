const sharedCertificationLinks = {
  ayi: 'https://drive.google.com/file/d/18GmUzO05CJpPmntufBdRNtQGR043W3dK/view?usp=drive_link',
  henry: 'https://certificates.soyhenry.com/cert?id=055b5837-3f1b-4a32-93d8-12d54841bb5e',
  efset: 'https://cert.efset.org/aAFqN1'
};

export const resumes = {
  en: {
    summary: 'AI engineer and full stack developer building local-first AI and software engineering systems. Creator of SupporterAI Core v1.0-Alpha, integrating local LLM inference, hybrid RAG, vector-backed memory, MCP/tool orchestration, durable project state, and evidence-driven validation. Strong in Python, JavaScript/TypeScript, Java, C#, SQL, and C1-level English.',
    experience: [
      {
        role: 'SupporterAI',
        company: 'AI Engineer / Full Stack Developer',
        period: '2025 - Present',
        context: 'Private R&D',
        bullets: [
          'Build a local-first AI workbench with Python/FastAPI, JavaFX, GGUF/llama.cpp runtimes, Qdrant-backed RAG/memory, and MCP/JSON-RPC integrations.',
          'Engineer hybrid semantic and lexical retrieval with embeddings, reranking, context pruning, long-term project memory, planning/replanning, and orchestration across 80+ registered tools and capabilities.',
          'Validate autonomous engineering workflows through 7/7 canonical gates, covering real local-model execution, tool expansion, supervised correction, restart recovery, checkpoints, tests, diffs, and durable continuation.'
        ]
      },
      {
        role: 'SAItron',
        company: 'Multimodal Model Systems Research',
        period: '2026 - Present',
        context: 'Private R&D',
        bullets: [
          'Design and validate a local-first multimodal architecture spanning 3 primary model systems: cognition, perception/world modeling, and generation, coordinated through asynchronous routing, verification, and resource-aware execution.',
          'Completed 2 TIES model-merging experiments across Nemotron-based H0 and Qwen-based H1, preserving expected logical behavior in both candidates and multimodal operation in H0, with causal/runtime validation across checkpoints and llama.cpp/Vulkan execution paths.'
        ]
      },
      {
        role: 'Selected Software Engineering & AI Projects',
        company: '',
        period: '2023 - Present',
        context: '',
        bullets: [
          'OverhaulCrafter: built a unified C#/Unity/BepInEx/Harmony plugin for The Planet Crafter spanning RPG, QoL, NPC, and quest systems; the current release build compiles with 0 warnings and 0 errors; multiple workflows have been validated in-game.',
          'ZombiesDeOP7DtD: engineered C#/Harmony perception and diagnostics systems using source analysis and decompilation, including physical line of sight, audio occlusion, and deterministic runtime evidence.',
          'Additional public work includes Storefront Change Guard (local llama.cpp code review), YOLOv11 dual-head training, the PyHelper package published on PyPI, and React/Next.js/Node/PostgreSQL applications.'
        ]
      }
    ],
    education: [
      {
        institution: 'AYI Academy',
        title: 'AI & Big Data',
        period: 'Aug 2025 - Nov 2025',
        detail: 'LLMs, Machine Learning & Deep Learning'
      },
      {
        institution: 'Egg LXP',
        title: 'Backend Developer',
        period: 'Mar 2023 - Dec 2023',
        detail: 'Application Development'
      },
      {
        institution: 'SoyHenry',
        title: 'PERN Full Stack Developer',
        period: 'May 2022 - Oct 2022',
        detail: 'Web Development, Node.js, React & PostgreSQL'
      }
    ],
    certifications: [
      { label: 'AYI Academy - AI & Big Data certificate', href: sharedCertificationLinks.ayi },
      { label: 'SoyHenry - Full Stack certificate', href: sharedCertificationLinks.henry },
      { label: 'EF SET - English C1 credential', href: sharedCertificationLinks.efset }
    ],
    skills: [
      { label: 'AI / LLM', items: ['RAG', 'Embeddings', 'Qdrant / vector databases', 'Semantic + lexical retrieval', 'Reranking', 'Local LLMs', 'llama.cpp / GGUF', 'Agent / tool orchestration', 'MCP'] },
      { label: 'ML / Data', items: ['Machine Learning', 'Deep Learning', 'PyTorch', 'PySpark', 'NumPy', 'Pandas', 'Statistical analysis'] },
      { label: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Express', 'REST APIs', 'OAuth / JWT', 'SQL', 'PostgreSQL', 'MySQL'] },
      { label: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3'] },
      { label: 'Engineering', items: ['Java', 'C#', 'Git / GitHub', 'CI/CD', 'Linux / WSL2', 'Automated testing', 'Reverse engineering / decompilation', 'Unity', 'Harmony', 'BepInEx'] }
    ],
    languages: ['Spanish - Native', 'English - C1 (EF SET)']
  },
  es: {
    summary: 'Ingeniero de IA y desarrollador full stack que construye sistemas de IA local-first y de ingeniería de software. Creador de SupporterAI Core v1.0-Alpha, que integra inferencia local de LLM, RAG híbrido, memoria vectorial, orquestación de herramientas/MCP, estado persistente de proyectos y validación basada en evidencia. Sólido dominio de Python, JavaScript/TypeScript, Java, C#, SQL e inglés nivel C1.',
    experience: [
      {
        role: 'SupporterAI',
        company: 'Ingeniero de IA / Desarrollador Full Stack',
        period: '2025 - Presente',
        context: 'I+D privado',
        bullets: [
          'Construyo un entorno de trabajo de IA local-first con Python/FastAPI, JavaFX, runtimes GGUF/llama.cpp, RAG/memoria respaldados por Qdrant e integraciones MCP/JSON-RPC.',
          'Desarrollo recuperación semántica y léxica híbrida con embeddings, reranking, poda de contexto, memoria de proyecto a largo plazo, planificación/replanificación y orquestación de más de 80 herramientas y capacidades registradas.',
          'Valido flujos autónomos de ingeniería mediante 7/7 etapas canónicas, cubriendo ejecución real de modelos locales, expansión de herramientas, corrección supervisada, recuperación tras reinicios, checkpoints, tests, diffs y continuación persistente.'
        ]
      },
      {
        role: 'SAItron',
        company: 'Investigación de Sistemas de Modelos Multimodales',
        period: '2026 - Presente',
        context: 'I+D privado',
        bullets: [
          'Diseño y valido una arquitectura multimodal local-first que abarca 3 sistemas principales del modelo: cognición, percepción/modelado del mundo y generación, coordinados mediante enrutamiento asíncrono, verificación y ejecución consciente de recursos.',
          'Completé 2 experimentos de model merging con TIES sobre H0 basado en Nemotron y H1 basado en Qwen, preservando el comportamiento lógico esperado en ambos candidatos y la operación multimodal en H0, con validación causal/runtime mediante checkpoints y rutas de ejecución llama.cpp/Vulkan.'
        ]
      },
      {
        role: 'Proyectos seleccionados de Ingeniería de Software e IA',
        company: '',
        period: '2023 - Presente',
        context: '',
        bullets: [
          'OverhaulCrafter: construí un plugin unificado C#/Unity/BepInEx/Harmony para The Planet Crafter que integra sistemas RPG, QoL, NPC y quests; el build release actual compila con 0 warnings y 0 errors; múltiples flujos fueron validados in-game.',
          'ZombiesDeOP7DtD: desarrollé sistemas de percepción y diagnóstico en C#/Harmony mediante análisis de código y decompilación, incluyendo línea de visión física, oclusión de audio y evidencia determinística de runtime.',
          'Otros trabajos públicos incluyen Storefront Change Guard (revisión de código local con llama.cpp), entrenamiento YOLOv11 dual-head, el paquete PyHelper publicado en PyPI y aplicaciones con React/Next.js/Node/PostgreSQL.'
        ]
      }
    ],
    education: [
      {
        institution: 'AYI Academy',
        title: 'IA y Big Data',
        period: 'ago 2025 - nov 2025',
        detail: 'LLM, Machine Learning y Deep Learning'
      },
      {
        institution: 'Egg LXP',
        title: 'Desarrollador Backend',
        period: 'mar 2023 - dic 2023',
        detail: 'Desarrollo de aplicaciones'
      },
      {
        institution: 'SoyHenry',
        title: 'Desarrollador Full Stack PERN',
        period: 'may 2022 - oct 2022',
        detail: 'Desarrollo web, Node.js, React y PostgreSQL'
      }
    ],
    certifications: [
      { label: 'AYI Academy - certificado de IA y Big Data', href: sharedCertificationLinks.ayi },
      { label: 'SoyHenry - certificado Full Stack', href: sharedCertificationLinks.henry },
      { label: 'EF SET - credencial de inglés C1', href: sharedCertificationLinks.efset }
    ],
    skills: [
      { label: 'IA / LLM', items: ['RAG', 'Embeddings', 'Qdrant / bases vectoriales', 'Recuperación semántica + léxica', 'Reranking', 'LLM locales', 'llama.cpp / GGUF', 'Orquestación de agentes / herramientas', 'MCP'] },
      { label: 'ML / Datos', items: ['Machine Learning', 'Deep Learning', 'PyTorch', 'PySpark', 'NumPy', 'Pandas', 'Análisis estadístico'] },
      { label: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'Express', 'APIs REST', 'OAuth / JWT', 'SQL', 'PostgreSQL', 'MySQL'] },
      { label: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3'] },
      { label: 'Ingeniería', items: ['Java', 'C#', 'Git / GitHub', 'CI/CD', 'Linux / WSL2', 'Testing automatizado', 'Ingeniería inversa / decompilación', 'Unity', 'Harmony', 'BepInEx'] }
    ],
    languages: ['Español - Nativo', 'Inglés - C1 (EF SET)']
  }
};

// English remains the default export for pages that are not language-switchable yet.
export const resume = resumes.en;
