import type { Metadata } from "next";

import { DocsShell } from "@/components/docs/docs-shell";
import { resolveDocTab } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation — Code to Play",
  description:
    "Install Code to Play, unlock plays by writing meaningful lines, and find answers in the FAQ.",
};

export default async function DocsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const tab = resolveDocTab(params);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 lg:py-16">
      <DocsShell key={tab} defaultTab={tab} />
    </main>
  );
}
