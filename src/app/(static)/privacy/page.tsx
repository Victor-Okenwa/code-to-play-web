import type { Metadata } from "next";

import { PageShell } from "@/components/static/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — Code to Play",
  description: "How Code to Play handles your data.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="This policy is coming soon. Code to Play keeps high scores, stats, and play counts locally in your editor — no telemetry."
    >
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Full privacy terms will be published here. Until then, the extension
        does not send your code, scores, or usage data to our servers.
      </p>
    </PageShell>
  );
}
