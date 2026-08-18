import { GITHUB_URL, UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";

export const UNLOCK_PROGRESS_DEMO = 450;

export const TRACKED_EXTENSIONS_URL = `${GITHUB_URL}/blob/main/TRACKEDEXTENSIONS.md`;

export const TRACKED_LANGUAGES_PREVIEW = [
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Rust",
  "Go",
  "Java",
  "Ruby",
] as const;

export const TRACKED_EXTENSION_GROUPS = [
  {
    category: "Programming languages",
    items: [
      {
        name: "JavaScript & TypeScript",
        extensions: [".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx"],
      },
      { name: "Python", extensions: [".py"] },
      { name: "Java", extensions: [".java"] },
      {
        name: "C / C++",
        extensions: [".c", ".h", ".cpp", ".cc", ".cxx", ".hpp"],
      },
      { name: "C#", extensions: [".cs"] },
      { name: "Go", extensions: [".go"] },
      { name: "Rust", extensions: [".rs"] },
      { name: "Ruby", extensions: [".rb"] },
      { name: "PHP", extensions: [".php"] },
      { name: "Swift", extensions: [".swift"] },
      { name: "Kotlin", extensions: [".kt", ".kts"] },
      { name: "Scala", extensions: [".scala"] },
      { name: "Dart", extensions: [".dart"] },
      { name: "R", extensions: [".r"] },
      { name: "Julia", extensions: [".jl"] },
      { name: "Lua", extensions: [".lua"] },
      { name: "Perl", extensions: [".pl"] },
      { name: "Shell", extensions: [".sh", ".bash", ".ps1"] },
      { name: "Assembly", extensions: [".asm", ".s"] },
      { name: "Fortran", extensions: [".f", ".f90"] },
      { name: "COBOL", extensions: [".cob"] },
      { name: "Groovy", extensions: [".groovy"] },
      { name: "Haskell", extensions: [".hs"] },
      { name: "Elixir", extensions: [".ex", ".exs"] },
      { name: "F#", extensions: [".fs", ".fsi", ".fsx"] },
      { name: "Clojure", extensions: [".clj", ".cljs", ".cljc"] },
      { name: "Lisp", extensions: [".lisp", ".el"] },
      { name: "Nim", extensions: [".nim"] },
      { name: "Zig", extensions: [".zig"] },
      { name: "V", extensions: [".v"] },
      { name: "Solidity", extensions: [".sol"] },
      { name: "Godot (GDScript)", extensions: [".gd"] },
      { name: "Ada", extensions: [".ada", ".adb", ".ads"] },
      { name: "OCaml", extensions: [".ml", ".mli"] },
      { name: "Crystal", extensions: [".cr"] },
      { name: "Pony", extensions: [".pony"] },
      {
        name: "Others",
        extensions: [".awk", ".pro", ".tcl", ".rkt", ".e", ".smalltalk"],
      },
    ],
  },
  {
    category: "Markup, documentation & data",
    items: [
      { name: "HTML", extensions: [".html", ".htm", ".xhtml"] },
      { name: "XML", extensions: [".xml", ".xaml", ".opml"] },
      { name: "Markdown", extensions: [".md", ".markdown", ".mdx"] },
      { name: "reStructuredText", extensions: [".rst"] },
      { name: "AsciiDoc", extensions: [".adoc"] },
      { name: "LaTeX", extensions: [".tex", ".bib"] },
      {
        name: "Config & data",
        extensions: [
          ".yml",
          ".yaml",
          ".json",
          ".jsonc",
          ".toml",
          ".ini",
          ".cfg",
        ],
      },
      { name: "Tabular data", extensions: [".csv", ".tsv"] },
      { name: "SVG", extensions: [".svg"] },
    ],
  },
  {
    category: "Styling / CSS / UI",
    items: [
      {
        name: "CSS & preprocessors",
        extensions: [
          ".css",
          ".scss",
          ".sass",
          ".less",
          ".styl",
          ".pcss",
          ".postcss",
        ],
      },
      { name: "Tailwind", extensions: [".tailwind.css"] },
      { name: "CSS Modules", extensions: [".module.css", ".module.scss"] },
    ],
  },
] as const;

export const TRACKED_LANGUAGE_COUNT =
  TRACKED_EXTENSION_GROUPS.find(
    (group) => group.category === "Programming languages",
  )?.items.filter((item) => item.name !== "Others").length ?? 30;

export const FEATURES = [
  {
    id: "meaningful-lines",
    title: "Meaningful line tracking",
    body: "Comments, blanks, and brace-only lines do not count. Only real code moves the meter toward your next plays.",
    home: true,
  },
  {
    id: "progressive-unlock",
    title: "Progressive unlock",
    body: `${UNLOCK_LINES} meaningful lines unlock ${UNLOCK_PLAYS} plays, shared across every game. The status bar shows progress while you work, then remaining plays once you unlock.`,
    home: true,
  },
  {
    id: "local-high-scores",
    title: "Local high scores",
    body: "High scores are split per difficulty. They live in the editor, so you can reset them anytime — nothing leaves your machine.",
    home: true,
  },
  {
    id: "shareable-stats",
    title: "Shareable stats",
    body: "Open statistics from the sidebar, or export a snapshot when you want to share progress. You choose what leaves the editor.",
    home: false,
  },
  {
    id: "in-editor-games",
    title: "Games in the editor",
    body: "Games open as a webview. Spend a play without leaving your files or your cursor. Free includes Debug Snake and Whack-a-Bug. Pro adds Call Stack and Merge Conflict.",
    home: false,
  },
  {
    id: "works-offline",
    title: "Works offline",
    body: "Write code, unlock plays, and play with no network. Some features may go online later — the loop itself does not need a connection.",
    home: false,
  },
  {
    id: "your-data",
    title: "Your data stays yours",
    body: "We do not own or control your performance data. High scores, stats, and play counts stay local unless you grant access so we can show analytics on usage and progress.",
    home: false,
  },
  {
    id: "free",
    title: "Free to install",
    body: "Install from the VS Code Marketplace or Open VSX. Games, local high scores, and stats are included — no account required to play, no subscription.",
    home: false,
  },
] as const;

export type FeatureId = (typeof FEATURES)[number]["id"];

export type Feature = {
  id: FeatureId;
  title: string;
  body: string;
  home: boolean;
};

export const HOME_FEATURES: Feature[] = FEATURES.filter(
  (feature) => feature.home,
);
