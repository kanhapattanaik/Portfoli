export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Agents' | 'Cloud & Systems' | 'Computer Vision' | 'Full-Stack & UI';
  image: string;
  year: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  stack: string[];
  description: string;
  problem: string;
  architecture: string;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
}

export interface Badge {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  iconName: string;
  skills: string[];
  verifyUrl: string;
}

export interface PipelineSimulation {
  id: string;
  name: string;
  description: string;
  steps: {
    node: string;
    agent: string;
    action: string;
    durationMs: number;
    outputSample: string;
  }[];
  finalOutput: Record<string, unknown>;
}

export const PORTFOLIO_HERO = {
  name: "KANHA PATTANAIK",
  role: "SOFTWARE ENGINEER & AI BUILDER",
  location: "Odisha, India",
  email: "kanhapattanaik018@gmail.com",
  status: "Open to Internships & Engineering Roles",
  gradYear: "'30",
  bio: "I build intelligent applications, automation pipelines, and AI-assisted workflows that actually ship. Computer Science & Engineering student and cloud builder in India.",
  stats: [
    { value: "40+", label: "PROJECTS & LABS" },
    { value: "05+", label: "CLOUD & AI BADGES" },
    { value: "'30", label: "GRADUATION YEAR" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "omniflow-ai",
    title: "OmniFlow AI",
    tagline: "Autonomous Multi-Agent Workflow Orchestrator & DAG Compiler",
    category: "AI & Agents",
    image: "/src/assets/images/project_omniflow_ai_1794373201483.jpg",
    year: "2026",
    featured: true,
    metrics: [
      { label: "Dispatch Latency", value: "<18ms" },
      { label: "Concurrent Agents", value: "64 nodes" },
      { label: "State Reliability", value: "99.98%" }
    ],
    stack: ["TypeScript", "Python", "FastAPI", "Gemini API", "Redis", "Docker", "WebSockets"],
    description: "An event-driven orchestration engine that coordinates autonomous agents to execute complex non-linear business pipelines with distributed checkpointing, self-healing retries, and token-budget constraints.",
    problem: "Chained agent workflows often fail unpredictably with cascading context drift and unbounded token costs when intermediate steps encounter edge cases.",
    architecture: "Built on an asynchronous Directed Acyclic Graph (DAG) state machine. Employs Redis pub/sub for node-level telemetry and dynamic context compression before dispatching downstream prompts.",
    githubUrl: "https://github.com/",
    liveUrl: "https://omniflow.demo.app",
    tags: ["Agentic AI", "DAG Engine", "Redis Pub/Sub", "State Machines"]
  },
  {
    id: "neurolab-vision",
    title: "Neurolab Vision",
    tagline: "Real-Time Multi-Stream Edge Computer Vision Platform",
    category: "Computer Vision",
    image: "/src/assets/images/project_neurolab_vision_1794373202094.jpg",
    year: "2026",
    featured: true,
    metrics: [
      { label: "Avg Inference", value: "24ms" },
      { label: "Simultaneous Streams", value: "8 Feeds" },
      { label: "Model Accuracy", value: "94.2% mAP" }
    ],
    stack: ["Python", "PyTorch", "TensorRT", "OpenCV", "WebRTC", "React", "Tailwind CSS"],
    description: "High-throughput edge intelligence dashboard for multi-camera video analytics, real-time object classification, spatial occupancy tracking, and sub-30ms anomaly alerts.",
    problem: "Transmitting 4K video streams directly to the cloud introduces unacceptable network latency and astronomical bandwidth costs for safety-critical facilities.",
    architecture: "Edge hardware performs lightweight YOLOv10 object detection accelerated via TensorRT, piping bounding-box coordinate vectors over WebRTC datachannels directly to the React canvas without raw video transcode overhead.",
    githubUrl: "https://github.com/",
    liveUrl: "https://neurolab.demo.app",
    tags: ["Edge AI", "WebRTC", "PyTorch", "TensorRT"]
  },
  {
    id: "aerocloud-guard",
    title: "AeroCloud Guard",
    tagline: "Kubernetes Policy Engine & Multi-Cloud Posture Sentinel",
    category: "Cloud & Systems",
    image: "/src/assets/images/project_aerocloud_guard_1794373202589.jpg",
    year: "2025",
    featured: true,
    metrics: [
      { label: "Cluster Scan Time", value: "1.2s" },
      { label: "CIS Controls", value: "100+ rules" },
      { label: "Auto-Remediation", value: "Sub-second" }
    ],
    stack: ["Go", "Kubernetes API", "Docker", "GCP", "AWS", "Prometheus", "Tailwind CSS"],
    description: "Cloud-native compliance inspector that watches Kubernetes admission controllers, identifies infrastructure drift against GitOps declarations, and simulates automated remediation before execution.",
    problem: "Configuration drift across multi-tenant clusters creates silent security vulnerabilities and accidental public endpoints that legacy weekly scanners fail to catch.",
    architecture: "A Go daemonset listens to the Kubernetes Admission Webhook API, evaluating resource specs against Open Policy Agent (OPA) policies in memory with zero impact on pod startup latency.",
    githubUrl: "https://github.com/",
    liveUrl: "https://aerocloud.demo.app",
    tags: ["Kubernetes", "Go", "Cloud Security", "DevSecOps"]
  },
  {
    id: "pulsevoice-ai",
    title: "PulseVoice AI",
    tagline: "Sub-50ms Speech Intelligence & Real-Time Action Synthesizer",
    category: "AI & Agents",
    image: "/src/assets/images/project_pulsevoice_ai_1794373202786.jpg",
    year: "2026",
    featured: true,
    metrics: [
      { label: "Speech-to-Text", value: "42ms" },
      { label: "Diarization Confidence", value: "98%" },
      { label: "Bandwidth Footprint", value: "16kbps" }
    ],
    stack: ["Web Audio API", "Gemini 2.0 Flash Live API", "TypeScript", "Node.js", "WebSockets"],
    description: "Low-latency voice analytics pipeline that streams bi-directional microphone audio, classifies speaker intent in real time, generates synchronized spectrogram visuals, and outputs actionable meeting outcomes.",
    problem: "Post-call transcription services process audio in batches, preventing real-time assistive guidance or automated live tool invocation during critical client conversations.",
    architecture: "Uses Web Audio API AudioWorklet threads to capture 16kHz PCM audio buffers, streaming them over persistent WebSockets to low-latency multimodal endpoints for streaming transcription and sentiment classification.",
    githubUrl: "https://github.com/",
    tags: ["Voice AI", "AudioWorklet", "Live API", "Streaming"]
  },
  {
    id: "vectorforge-db",
    title: "VectorForge Engine",
    tagline: "Embedded In-Memory Vector Search Engine with SIMD Cosine Indexing",
    category: "Cloud & Systems",
    image: "/src/assets/images/project_omniflow_ai_1794373201483.jpg",
    year: "2025",
    featured: false,
    metrics: [
      { label: "Lookup Speed", value: "0.8ms" },
      { label: "Index Footprint", value: "14MB / 100k" },
      { label: "Recall @ 10", value: "98.7%" }
    ],
    stack: ["C++", "Rust", "WebAssembly", "Python Bindings", "SIMD AVX-512"],
    description: "High-performance vector similarity search engine implemented from scratch without heavyweight external runtime dependencies, compiled to WebAssembly for client-side semantic search.",
    problem: "Hosting cloud vector databases for small-to-medium datasets introduces network round-trips and expensive recurring monthly fees for applications that could run locally in-memory.",
    architecture: "Hierarchical Navigable Small World (HNSW) graph structure with 8-bit scalar quantization and hardware-accelerated SIMD dot-product operations.",
    githubUrl: "https://github.com/",
    tags: ["Vector Search", "HNSW", "Algorithms", "Wasm"]
  },
  {
    id: "autospec-canvas",
    title: "AutoSpec Canvas",
    tagline: "Autonomous Figma Token to Clean React AST Code Synthesizer",
    category: "Full-Stack & UI",
    image: "/src/assets/images/project_aerocloud_guard_1794373202589.jpg",
    year: "2025",
    featured: false,
    metrics: [
      { label: "Code Accuracy", value: "99.4%" },
      { label: "Render Time", value: "450ms" },
      { label: "Zero-Pill Enforced", value: "100%" }
    ],
    stack: ["TypeScript", "React 19", "Tailwind CSS v4", "Babel Core", "Bento Grid"],
    description: "Developer tooling that parses design tokens from vector specs and emits production-ready TypeScript + Tailwind React components with zero unnecessary wrappers and guaranteed accessibility compliance.",
    problem: "Conventional design-to-code converters produce unmaintainable, nested 'div soup' with absolute positioning and broken responsive styles.",
    architecture: "Constructs an Abstract Syntax Tree (AST) using Babel parser, applies layout optimization passes to fold redundant wrappers, and verifies Tailwind utility constraints before emitting final code.",
    githubUrl: "https://github.com/",
    tags: ["Design Systems", "AST Parser", "Developer Tools"]
  }
];

export const BADGES: Badge[] = [
  {
    id: "gcp-genai",
    title: "Google Cloud — Generative AI Leader & Cloud Architect",
    issuer: "Google Cloud",
    date: "2025",
    credentialId: "GCP-GENAI-89410",
    iconName: "Cloud",
    skills: ["Vertex AI", "Gemini API", "Cloud Run", "BigQuery ML", "RAG Pipelines"],
    verifyUrl: "https://cloud.google.com/certification"
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Practitioner & Solutions Architecture",
    issuer: "Amazon Web Services",
    date: "2025",
    credentialId: "AWS-CP-55823",
    iconName: "Server",
    skills: ["EC2 & ECS", "S3 Storage", "IAM Governance", "VPC Networking", "Lambda Functions"],
    verifyUrl: "https://aws.amazon.com/verification"
  },
  {
    id: "dl-agents",
    title: "Multi-Agent Architectures with AutoGen & CrewAI",
    issuer: "DeepLearning.AI",
    date: "2025",
    credentialId: "DL-AGENTS-1029",
    iconName: "Cpu",
    skills: ["Autonomous Workflows", "Agent Delegation", "Tool Calling", "Memory Buffers"],
    verifyUrl: "https://deeplearning.ai"
  },
  {
    id: "postman-expert",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "2024",
    credentialId: "PST-STUDENT-7741",
    iconName: "Terminal",
    skills: ["RESTful Design", "API Mocking", "Automated Testing", "CI/CD Newman Runners"],
    verifyUrl: "https://badgr.com"
  },
  {
    id: "oracle-cloud",
    title: "Oracle Cloud Infrastructure 2024 Certified Foundations",
    issuer: "Oracle University",
    date: "2024",
    credentialId: "OCI-FND-44912",
    iconName: "Database",
    skills: ["Compute Shapes", "Virtual Cloud Networks", "Identity Management", "Autonomous DB"],
    verifyUrl: "https://catalog-education.oracle.com"
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "AI & Autonomous Systems",
    icon: "Bot",
    skills: [
      { name: "Gemini API & Vertex AI", level: 95 },
      { name: "Multi-Agent Workflows", level: 90 },
      { name: "RAG & Vector Embeddings", level: 92 },
      { name: "PyTorch & Computer Vision", level: 85 },
      { name: "Prompt & DSPy Optimization", level: 90 }
    ]
  },
  {
    name: "Backend & Systems",
    icon: "Server",
    skills: [
      { name: "Python / FastAPI / AsyncIO", level: 94 },
      { name: "TypeScript & Node.js", level: 96 },
      { name: "Go (Golang Systems)", level: 82 },
      { name: "C++ & Algorithms", level: 88 },
      { name: "REST & WebSockets", level: 95 }
    ]
  },
  {
    name: "Cloud, DevOps & Data",
    icon: "Cloud",
    skills: [
      { name: "Docker & Containerization", level: 92 },
      { name: "Kubernetes & Cloud Run", level: 86 },
      { name: "PostgreSQL & Redis", level: 90 },
      { name: "CI/CD & GitHub Actions", level: 88 },
      { name: "Linux Systems & Bash", level: 90 }
    ]
  },
  {
    name: "Frontend & Interface Engineering",
    icon: "Layout",
    skills: [
      { name: "React 19 & Next.js", level: 94 },
      { name: "Tailwind CSS v4 & Styling", level: 96 },
      { name: "Canvas & Interactive Visuals", level: 85 },
      { name: "State Machines & Performance", level: 88 }
    ]
  }
];

export const PIPELINE_SIMULATIONS: PipelineSimulation[] = [
  {
    id: "triage-pipeline",
    name: "Autonomous Incident Triage & Auto-Remediation",
    description: "Multi-agent cluster that monitors production alerts, isolates failing microservices, queries runbooks, and drafts verified PR fixes.",
    steps: [
      {
        node: "Alert Ingestion",
        agent: "Watchdog Daemon",
        action: "Parsed PagerDuty P1 payload: 'API Gateway 504 Gateway Timeout in us-east-1'",
        durationMs: 340,
        outputSample: "{ event_id: 'inc_8401', service: 'auth-svc', err_rate: '42%' }"
      },
      {
        node: "Root Cause Diagnosis",
        agent: "Telemetry Reasoner",
        action: "Correlated distributed traces; identified unindexed PostgreSQL query on 'sessions' table.",
        durationMs: 580,
        outputSample: "{ bottleneck: 'Seq Scan on sessions (cost=0.00..4210.00)', rows: 450000 }"
      },
      {
        node: "Sandbox Mitigation Test",
        agent: "DevOps Executor",
        action: "Synthesized 'CREATE INDEX CONCURRENTLY idx_sessions_user_id' in staging clone. Latency dropped to 4ms.",
        durationMs: 820,
        outputSample: "{ verification: 'PASSED', staging_latency_p99: '4.2ms' }"
      },
      {
        node: "Pull Request & Notification",
        agent: "Dispatcher Agent",
        action: "Opened GitHub PR #214 with migration script and alerted On-Call Engineer on Slack.",
        durationMs: 290,
        outputSample: "{ pr_url: 'github.com/org/repo/pull/214', status: 'Awaiting 1 Approval' }"
      }
    ],
    finalOutput: {
      status: "RESOLVED_WITH_PR",
      meanTimeToDetectMs: 340,
      meanTimeToMitigateMs: 1740,
      confidenceScore: "99.2%",
      costSavingsUSD: "$12,400 est."
    }
  },
  {
    id: "rag-document-pipeline",
    name: "Hybrid Multi-Hop RAG Search & Citations",
    description: "Evaluates ambiguous queries against 100k+ technical documents using dense embeddings + BM25 reciprocal rank fusion.",
    steps: [
      {
        node: "Query Decomposition",
        agent: "Planner Agent",
        action: "Deconstructed user question into 3 orthogonal sub-queries with temporal boundaries.",
        durationMs: 220,
        outputSample: "{ sub_queries: ['K8s pod lifecycle', 'Graceful termination timeouts', 'PreStop hook specs'] }"
      },
      {
        node: "Hybrid Vector + BM25 Retrieval",
        agent: "Search Agent",
        action: "Retrieved top 40 passages from VectorForge DB with reciprocal rank fusion (RRF alpha=60).",
        durationMs: 410,
        outputSample: "{ candidate_passages: 40, top_score: 0.941 }"
      },
      {
        node: "Cross-Encoder Re-Ranking",
        agent: "Re-ranker",
        action: "Ranked passages by contextual relevance; discarded 32 irrelevant distractor chunks.",
        durationMs: 510,
        outputSample: "{ retained_chunks: 8, avg_relevance: 0.962 }"
      },
      {
        node: "Grounded Generation",
        agent: "Synthesizer",
        action: "Formulated verified response with strict paragraph citations and zero hallucinations.",
        durationMs: 650,
        outputSample: "{ citations: ['RFC-9110#sec-3', 'K8s-Docs/v1.31#termination'], hallucination_risk: '<0.01%' }"
      }
    ],
    finalOutput: {
      status: "COMPLETED",
      totalRetrievalTimeMs: 1140,
      groundingConfidence: "99.8%",
      tokenEfficiency: "+68% over naive RAG"
    }
  }
];

export const TIMELINE_MILESTONES = [
  {
    period: "2026 – 2030 (Expected)",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Silicon Institute of Technology / BPUT, Odisha",
    description: "Specializing in Distributed Systems, Artificial Intelligence, Algorithms, and Cloud Architecture. Active builder in campus tech communities and developer workshops.",
    tags: ["Data Structures", "Operating Systems", "Computer Networks", "DBMS", "AI/ML"]
  },
  {
    period: "2025 – Present",
    role: "Autonomous AI Pipeline Builder & Research Contributor",
    organization: "Independent Open Source & Labs",
    description: "Engineered 40+ labs ranging from multi-agent DAG executors to real-time WebRTC edge computer vision systems. Published open source developer tooling for developer productivity.",
    tags: ["Multi-Agent AI", "FastAPI", "WebSockets", "Go", "Docker", "Edge Systems"]
  },
  {
    period: "2024 – 2025",
    role: "Cloud & AI Badges Achievement Cohort",
    organization: "Google Cloud & AWS Learning Foundations",
    description: "Completed 5+ industry-recognized cloud and API credentials covering Generative AI architecture, container orchestration, microservices testing, and enterprise API design.",
    tags: ["Vertex AI", "AWS Cloud", "Postman Student Expert", "OCI Foundations"]
  }
];
