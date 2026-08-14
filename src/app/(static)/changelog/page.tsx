import type { Metadata } from "next";
import { PageShell } from "@/components/static/page-shell";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";

export const metadata: Metadata = {
  title: "Changelog — Code to Play",
  description: "Release notes for the Code to Play VS Code extension.",
};

const RELEASES = [
  {
    version: "1.0.0",
    date: "2026",
    items: [
      `Unlock ${UNLOCK_PLAYS} plays per ${UNLOCK_LINES} meaningful lines, shared across games.`,
      "Debug Snake and Whack-a-Bug in the editor.",
      "Status bar progress while locked, remaining plays when unlocked.",
      "High scores and stats stored locally — no telemetry.",
    ],
  },
] as const;

export default function ChangelogPage() {
  return (
    <PageShell
      title="Changelog"
      description="What shipped in the extension. Plays, line counting, and games stay in-editor."
    >
      <div className="space-y-4">
        {RELEASES.map((release) => (
          <Card key={release.version}>
            <CardHeader>
              <CardTitle className="font-mono text-lg">
                v{release.version}
              </CardTitle>
              <CardDescription>{release.date}</CardDescription>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {release.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
