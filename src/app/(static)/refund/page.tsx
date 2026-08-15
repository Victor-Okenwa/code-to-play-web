import type { Metadata } from "next";

import { PageShell } from "@/components/static/page-shell";

export const metadata: Metadata = {
  title: "Refund Policy — Code to Play",
  description: "Refund policy for Code to Play.",
};

export default function RefundPage() {
  return (
    <PageShell title="Refund Policy" description="This policy is coming soon.">
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Refund terms will be published here when paid plans are available. The
        extension itself is free to install today.
      </p>
    </PageShell>
  );
}
