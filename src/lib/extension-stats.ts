import { CHANGELOG_RAW_URL, OPEN_VSX_API_URL } from "@/lib/extension";

export const REVALIDATE_DAILY = 86400;

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

type OpenVsxResponse = {
  version?: string;
  downloadCount?: number;
  engines?: {
    vscode?: string;
  };
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_DAILY },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchChangelogMarkdown(): Promise<string | null> {
  try {
    const response = await fetch(CHANGELOG_RAW_URL, {
      next: { revalidate: REVALIDATE_DAILY },
      headers: { Accept: "text/plain" },
    });

    if (!response.ok) {
      return null;
    }

    const markdown = await response.text();
    return markdown.trim() ? markdown : null;
  } catch {
    return null;
  }
}

export async function getExtensionStats(): Promise<ExtensionStats> {
  const data = await fetchJson<OpenVsxResponse>(OPEN_VSX_API_URL);

  const version = data?.version?.trim() || FALLBACK_EXTENSION_STATS.version;
  const installs =
    typeof data?.downloadCount === "number" && data.downloadCount >= 0
      ? data.downloadCount
      : FALLBACK_EXTENSION_STATS.installs;
  const vscodeEngine =
    data?.engines?.vscode?.trim() || FALLBACK_EXTENSION_STATS.vscodeEngine;

  return { version, installs, vscodeEngine };
}
