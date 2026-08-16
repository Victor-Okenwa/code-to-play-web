import type { Metadata } from "next";
import { DocumentationTabs } from "@/components/documentation/docs-tabs";
import { PageShell } from "@/components/static/page-shell";
import { type DocTab, isDocTab } from "@/lib/extension";

export const metadata: Metadata = {
  title: "Documentation — Code to Play",
  description:
    "Install Code to Play, unlock plays by writing meaningful lines, and find answers in the FAQ.",
};

function resolveTab(
  searchParams: Record<string, string | string[] | undefined>,
): DocTab {
  const tab = searchParams.tab;
  const tabValue = Array.isArray(tab) ? tab[0] : tab;
  if (isDocTab(tabValue)) {
    return tabValue;
  }
  if (searchParams.installation !== undefined) {
    return "installation";
  }
  return "installation";
}

export default async function DocumentationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const tab = resolveTab(params);

  return (
    <PageShell
      title="Documentation"
      description="Install the extension, write code until the status bar unlocks plays, or jump to the FAQ."
    >
      <DocumentationTabs key={tab} defaultTab={tab} />
    </PageShell>
  );
}
