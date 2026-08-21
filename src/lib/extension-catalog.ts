import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { extensionChangelog, extensionStats } from "@/db/schema";
import { CHANGELOG_RAW_URL, OPEN_VSX_API_URL } from "@/lib/extension";

export const EXTENSION_STATS_ID = "open-vsx";
export const EXTENSION_CHANGELOG_ID = "github-main";

export const STATS_MAX_AGE_MS = 3 * 60 * 60 * 1000;
export const CHANGELOG_MAX_AGE_MS = 2 * 24 * 60 * 60 * 1000;

export const FALLBACK_EXTENSION_STATS = {
  version: "1.0.0",
  installs: 1500,
  vscodeEngine: "^1.95.0",
} as const;

export type ExtensionStats = {
  version: string;
  installs: number;
  vscodeEngine: string;
};

export type CatalogJob = "stats" | "changelog";

export type CatalogJobResult = {
  job: CatalogJob;
  updated: boolean;
  reason: "fresh" | "unchanged" | "fetched";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asNonNegativeInt(value: unknown): number | undefined {
  return typeof value === "number" && Number.isInteger(value) && value >= 0
    ? value
    : undefined;
}

function isStale(fetchedAt: Date, maxAgeMs: number): boolean {
  return Date.now() - fetchedAt.getTime() >= maxAgeMs;
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "text/plain" },
    });
    if (!response.ok) {
      return null;
    }
    const text = await response.text();
    return text.trim() ? text : null;
  } catch {
    return null;
  }
}

async function fetchOpenVsxStats(): Promise<ExtensionStats | null> {
  try {
    const response = await fetch(OPEN_VSX_API_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();
    if (!isRecord(payload)) {
      return null;
    }

    const version =
      typeof payload.version === "string" ? payload.version.trim() : "";
    const installs = asNonNegativeInt(payload.downloadCount);
    const engines = isRecord(payload.engines) ? payload.engines : undefined;
    const vscodeEngine =
      engines && typeof engines.vscode === "string"
        ? engines.vscode.trim()
        : "";

    if (!version || installs === undefined || !vscodeEngine) {
      return null;
    }

    return { version, installs, vscodeEngine };
  } catch {
    return null;
  }
}

export async function refreshExtensionStats(): Promise<boolean> {
  const stats = await fetchOpenVsxStats();
  if (!stats) {
    return false;
  }

  const db = await getDb();
  const fetchedAt = new Date();

  await db
    .insert(extensionStats)
    .values({
      id: EXTENSION_STATS_ID,
      installs: stats.installs,
      version: stats.version,
      vscodeEngine: stats.vscodeEngine,
      fetchedAt,
    })
    .onConflictDoUpdate({
      target: extensionStats.id,
      set: {
        installs: stats.installs,
        version: stats.version,
        vscodeEngine: stats.vscodeEngine,
        fetchedAt,
      },
    });

  return true;
}

export async function refreshExtensionChangelog(): Promise<boolean> {
  const markdown = await fetchText(CHANGELOG_RAW_URL);
  if (!markdown) {
    return false;
  }

  const db = await getDb();
  const fetchedAt = new Date();

  await db
    .insert(extensionChangelog)
    .values({
      id: EXTENSION_CHANGELOG_ID,
      markdown,
      fetchedAt,
    })
    .onConflictDoUpdate({
      target: extensionChangelog.id,
      set: {
        markdown,
        fetchedAt,
      },
    });

  return true;
}

export async function getStoredExtensionStats(): Promise<
  (ExtensionStats & { fetchedAt: Date }) | null
> {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(extensionStats)
    .where(eq(extensionStats.id, EXTENSION_STATS_ID))
    .limit(1);

  if (!row) {
    return null;
  }

  return {
    version: row.version,
    installs: row.installs,
    vscodeEngine: row.vscodeEngine,
    fetchedAt: row.fetchedAt,
  };
}

export async function getStoredChangelogMarkdown(): Promise<{
  markdown: string;
  fetchedAt: Date;
} | null> {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(extensionChangelog)
    .where(eq(extensionChangelog.id, EXTENSION_CHANGELOG_ID))
    .limit(1);

  if (!row) {
    return null;
  }

  return { markdown: row.markdown, fetchedAt: row.fetchedAt };
}

export async function getExtensionStats(): Promise<ExtensionStats> {
  const stored = await getStoredExtensionStats();
  if (!stored || isStale(stored.fetchedAt, STATS_MAX_AGE_MS)) {
    const updated = await refreshExtensionStats();
    if (updated) {
      const fresh = await getStoredExtensionStats();
      if (fresh) {
        return fresh;
      }
    }
  }

  if (stored) {
    return stored;
  }

  return FALLBACK_EXTENSION_STATS;
}

export async function getChangelogMarkdown(): Promise<string | null> {
  const stored = await getStoredChangelogMarkdown();
  if (!stored || isStale(stored.fetchedAt, CHANGELOG_MAX_AGE_MS)) {
    const updated = await refreshExtensionChangelog();
    if (updated) {
      const fresh = await getStoredChangelogMarkdown();
      if (fresh) {
        return fresh.markdown;
      }
    }
  }

  return stored?.markdown ?? null;
}

export async function runCatalogJob(
  job: CatalogJob,
  force: boolean,
): Promise<CatalogJobResult> {
  if (job === "stats") {
    const stored = await getStoredExtensionStats();
    if (!force && stored && !isStale(stored.fetchedAt, STATS_MAX_AGE_MS)) {
      return { job, updated: false, reason: "fresh" };
    }
    const updated = await refreshExtensionStats();
    return { job, updated, reason: updated ? "fetched" : "unchanged" };
  }

  const stored = await getStoredChangelogMarkdown();
  if (!force && stored && !isStale(stored.fetchedAt, CHANGELOG_MAX_AGE_MS)) {
    return { job, updated: false, reason: "fresh" };
  }
  const updated = await refreshExtensionChangelog();
  return { job, updated, reason: updated ? "fetched" : "unchanged" };
}
