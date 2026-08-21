import { getChangelogMarkdown } from "@/lib/extension-catalog";

export type ChangelogSection = {
  title: string;
  items: string[];
};

export type ChangelogRelease = {
  version: string;
  date: string;
  latest?: boolean;
  sections: ChangelogSection[];
};

export const FALLBACK_CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: "1.1.0",
    date: "2026-08-21",
    latest: true,
    sections: [
      {
        title: "Added",
        items: [
          "Pro games: Call Stack, Merge Conflict, and Kernel Panic, with a 7-day Pro trial and extra play spaces.",
          "Kernel Panic flies a kernel craft with colored power-ups (shield, rapid fire, spread, weaker enemies, score boost, health).",
          "Kernel Panic is a survival run: no 60-second clock. Threat climbs until HP hits zero.",
          "Always-visible About this game section on every game.",
          "Optional stats sync for signed-in players who opt in on the website.",
        ],
      },
      {
        title: "Changed",
        items: [
          "Locked Pro games and exhausted-play toasts point to subscription or extra play spaces.",
          "Code tracking seeds a baseline when a file is opened so the first edit counts more reliably.",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-08-07",
    sections: [
      {
        title: "Changed",
        items: [
          "Default unlock raised from 100 to 1000 meaningful lines.",
          "Status bar, unlock notifications, and in-game messages use the shared default instead of a hardcoded threshold.",
        ],
      },
      {
        title: "Notes",
        items: [
          "First major release — a stable milestone for Code to Play.",
          "A previously saved custom config may still use the old 100-line threshold until it is reset.",
        ],
      },
    ],
  },
];

const VERSION_HEADING = /^##\s+\[([^\]]+)\](?:\s*[-–]\s*(\d{4}-\d{2}-\d{2}))?/;
const SECTION_HEADING = /^###\s+(.+)/;
const LIST_ITEM = /^\s*-\s+(.+)/;

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+:\s*$/, "")
    .trim();
}

function normalizeSectionTitle(title: string): string {
  return title.replace(/\s+in\s+[\d.]+$/, "").trim();
}

export function parseChangelog(markdown: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  let current: ChangelogRelease | null = null;
  let currentSection: ChangelogSection | null = null;

  const flushSection = () => {
    if (current && currentSection && currentSection.items.length > 0) {
      current.sections.push(currentSection);
    }
    currentSection = null;
  };

  const flushRelease = () => {
    flushSection();
    if (current && current.sections.length > 0) {
      releases.push(current);
    }
    current = null;
  };

  for (const rawLine of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const line = rawLine.trimEnd();
    const versionMatch = line.match(VERSION_HEADING);

    if (versionMatch) {
      flushRelease();
      current = {
        version: versionMatch[1],
        date: versionMatch[2] ?? "",
        sections: [],
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const sectionMatch = line.match(SECTION_HEADING);
    if (sectionMatch) {
      flushSection();
      currentSection = {
        title: normalizeSectionTitle(sectionMatch[1]),
        items: [],
      };
      continue;
    }

    const itemMatch = line.match(LIST_ITEM);
    if (itemMatch) {
      if (!currentSection) {
        currentSection = { title: "Notes", items: [] };
      }
      const item = stripMarkdown(itemMatch[1]);
      if (item) {
        currentSection.items.push(item);
      }
    }
  }

  flushRelease();

  return releases.map((release, index) => ({
    ...release,
    latest: index === 0,
  }));
}

export async function getChangelogReleases(): Promise<ChangelogRelease[]> {
  const markdown = await getChangelogMarkdown();
  if (!markdown) {
    return FALLBACK_CHANGELOG_RELEASES;
  }

  const releases = parseChangelog(markdown);
  return releases.length > 0 ? releases : FALLBACK_CHANGELOG_RELEASES;
}

export function formatReleaseDate(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00.000Z`));
}
