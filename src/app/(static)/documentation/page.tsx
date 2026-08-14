import type { Metadata } from "next";
import { DocumentationTabs } from "@/components/documentation/docs-tabs";
import { PageShell } from "@/components/static/page-shell";
import { type DocTab, isDocTab } from "@/lib/extension";

export const metadata: Metadata = {
  title: "Documentation — Code to Play",
  description:
    "Install Code to Play, watch the status bar, and unlock plays by writing meaningful lines of code.",
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

  return (
    <PageShell
      title="Documentation"
      description="Install the extension, then write code until the status bar unlocks plays for Debug Snake and Whack-a-Bug."
    >
      <DocumentationTabs defaultTab={resolveTab(params)} />
    </PageShell>
  );
}
