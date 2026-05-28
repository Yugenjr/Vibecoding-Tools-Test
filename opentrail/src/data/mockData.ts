import { Repository, LearningModule, SkillProgress, QuickReference } from "../types";

export const ECOSYSTEMS = [
  "React", "Next.js", "Rust", "Tailwind", "Vue", "Svelte", "Node.js",
  "React", "Next.js", "Rust", "Tailwind", "Vue", "Svelte", "Node.js"
];

export const PRECONFIGURED_REPOSITORIES: Record<string, Repository> = {
  "facebook/react": {
    name: "facebook/react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    healthScore: 98,
    learningPath: "React Internals & Suspense Architecture",
    issues: [
      {
        id: "28103",
        title: "Fix hydration mismatch in server components",
        label: "Good First Issue",
        difficulty: "Easy"
      },
      {
        id: "27991",
        title: "Add comprehensive tests for useOptimistic hook",
        label: "Testing",
        difficulty: "Medium"
      },
      {
         id: "27419",
         title: "Support high-performance reactive scheduling parameters",
         label: "Performance",
         difficulty: "Hard"
      }
    ]
  },
  "rust-lang/rust": {
    name: "rust-lang/rust",
    description: "Empowering everyone to build reliable and efficient software. Main compiler implementation.",
    healthScore: 92,
    learningPath: "Rust AST Parser and Compiler Diagnostics",
    issues: [
      {
        id: "114532",
        title: "Refactor standard library allocator error traces",
        label: "Good First Issue",
        difficulty: "Easy"
      },
      {
        id: "119022",
        title: "Implement cargo lint diagnostics for unused modules",
        label: "Feature",
        difficulty: "Medium"
      }
    ]
  },
  "tailwindlabs/tailwindcss": {
    name: "tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework for rapid UI development, featuring v4 lightning compile times.",
    healthScore: 96,
    learningPath: "Tailwind Oxide Compiler Optimization",
    issues: [
      {
        id: "14210",
        title: "Support dynamic container grid resolution inside engine templates",
        label: "Good First Issue",
        difficulty: "Easy"
      },
      {
        id: "13990",
        title: "Resolve nested layer prioritization mismatches",
        label: "Bug",
        difficulty: "Medium"
      }
    ]
  },
  "vercel/next.js": {
    name: "vercel/next.js",
    description: "The React Framework for the Web. Built on top of Rust compiler optimization tools.",
    healthScore: 94,
    learningPath: "Next.js App Router & PPR Streaming",
    issues: [
      {
        id: "63211",
        title: "Optimize build bundle pre-compilation caching headers",
        label: "Performance",
        difficulty: "Hard"
      },
      {
        id: "62309",
        title: "Resolve static pre-rendering stream timeout warnings",
        label: "Bug",
        difficulty: "Medium"
      }
    ]
  }
};

export const INITIAL_LEARNING_MODULES: LearningModule[] = [
  {
    id: "m1",
    title: "Your First Pull Request",
    category: "Newcomer",
    duration: "15m",
    description: "Learn the standard git flow, branching strategies, and how to write a compelling PR description.",
    chaptersCount: 3,
    steps: [
      "Fork the upstream repository and pull a local clone to your workspace.",
      "Check out a descriptive staging branch: git checkout -b fix/issue-details.",
      "Amend targeted bug instances and push. Draft a comprehensive pull request description highlighting tests run.",
      "Review continuous integration status logs and incorporate feedback."
    ],
    progressPercent: 0
  },
  {
    id: "m2",
    title: "Setting Up the Dev Environment",
    category: "Newcomer",
    duration: "25m",
    description: "Configure Docker containers, install workspace npm modules, and run active unit tests locally.",
    chaptersCount: 4,
    steps: [
      "Ensure Docker Daemon is online in your local background workspace.",
      "Pull targeted developer container imagery via: docker pull node:alpine.",
      "Install required module extensions with rapid package operations: npm ci.",
      "Launch live validation routines in active watch cycles using npm run test:watch."
    ],
    progressPercent: 0
  },
  {
    id: "m3",
    title: "Optimizing CI/CD Pipelines",
    category: "Pro",
    isAiAssisted: true,
    duration: "1h 20m",
    description: "Deep dive into GitHub Actions caching, matrix build variables, and parallelizing build testing workflows.",
    chaptersCount: 4,
    steps: [
      "Enable persistent file caching dependencies in targeted Action config layers.",
      "Configure standard test parallelization parameters via matrix variables.",
      "Structure multi-threaded performance routines to reduce compile delays.",
      "Deploy custom validation checks into standard delivery configurations."
    ],
    progressPercent: 0
  }
];

export const INITIAL_SKILLS: SkillProgress[] = [
  { name: "Git Fundamentals", percent: 85 },
  { name: "OSS Etiquette", percent: 40 },
  { name: "Advanced Testing", percent: 0 }
];

export const QUICK_REFERENCES: QuickReference[] = [
  {
    id: "r1",
    command: "git rebase -i HEAD~3",
    description: "Squashing commits before PR integration"
  },
  {
    id: "r2",
    command: "npm run test:watch",
    description: "Continuous test execution workflow"
  },
  {
    id: "r3",
    command: "git commit --amend --no-edit",
    description: "Adding instant localized updates to previous commit"
  }
];
