import type { Metadata } from "next";

import { PageShell } from "@/components/static/page-shell";

export const metadata: Metadata = {
  title: "Legal — Code to Play",
  description: "Legal information for Code to Play.",
};

export default function LegalPage() {
  return (
    <PageShell
      title="Legal"
      description="This page is coming soon. Trademarks and product names belong to their respective owners."
    >
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Terms of use and other legal notices will be published here. Code to
        Play is an independent companion to supported editors and is not
        affiliated with or endorsed by those products.
      </p>
    </PageShell>
  );
}
