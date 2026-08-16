export const DOC_TAB_IDS = [
  "overview",
  "getting-started",
  "installation",
  "quick-start",
  "troubleshooting",
  "faq",
] as const;

export type DocTab = (typeof DOC_TAB_IDS)[number];

export const DOC_TABS = [
  {
    id: "overview",
    label: "Overview",
    description:
      "What Code to Play is, how the loop works, and where to go next.",
  },
  {
    id: "getting-started",
    label: "Getting started",
    description:
      "What you need before you install, and how write → unlock → play works.",
  },
  {
    id: "installation",
    label: "Installation",
    description: "Install from the VS Code Marketplace or Open VSX.",
  },
  {
    id: "quick-start",
    label: "Quick start",
    description:
      "Write code, watch the status bar, and spend plays on in-editor games.",
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    description:
      "Status bar stuck, untracked files, and how to report an issue.",
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Answers about plays, Pro, privacy, and supported editors.",
  },
] as const satisfies readonly {
  id: DocTab;
  label: string;
  description: string;
}[];

const DOC_TAB_ALIASES: Record<string, DocTab> = {
  usage: "quick-start",
  tracking: "quick-start",
};

export function isDocTab(value: string | undefined): value is DocTab {
  return DOC_TAB_IDS.includes(value as DocTab);
}

export function docsPath(tab: DocTab): string {
  return `/docs?tab=${tab}`;
}

export function resolveDocTab(
  searchParams: Record<string, string | string[] | undefined>,
): DocTab {
  const tab = searchParams.tab;
  const tabValue = Array.isArray(tab) ? tab[0] : tab;

  if (isDocTab(tabValue)) {
    return tabValue;
  }

  if (tabValue && tabValue in DOC_TAB_ALIASES) {
    return DOC_TAB_ALIASES[tabValue];
  }

  if (searchParams.installation !== undefined) {
    return "installation";
  }

  return "overview";
}
