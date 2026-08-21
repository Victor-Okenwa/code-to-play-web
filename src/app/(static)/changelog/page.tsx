import type { Metadata } from "next";

import { ReleaseList } from "@/components/changelog/release-list";
import { PageShell } from "@/components/static/page-shell";
import { getChangelogReleases } from "@/lib/changelog";
import { CHANGELOG_URL, OPEN_VSX_URL } from "@/lib/extension";

export const metadata: Metadata = {
  title: "Changelog — Code to Play",
  description: "Release notes for the Code to Play VS Code extension.",
};

export const dynamic = "force-dynamic";

export default async function ChangelogPage() {
  const releases = await getChangelogReleases();

  return (
    <PageShell
      title="Changelog"
      description="What shipped in the extension. Plays, line counting, and games stay in-editor."
    >
      <ReleaseList releases={releases} />
      <p className="text-sm text-muted-foreground">
        Source:{" "}
        <a
          href={OPEN_VSX_URL}
          className="underline underline-offset-3 hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open VSX
        </a>
        {" · "}
        <a
          href={CHANGELOG_URL}
          className="underline underline-offset-3 hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          CHANGELOG.md
        </a>
      </p>
    </PageShell>
  );
}
