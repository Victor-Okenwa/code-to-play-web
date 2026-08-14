export const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=morse-code.code-to-play";

export const OPEN_VSX_URL = "https://open-vsx.org/extension/morse-code/code-to";

export const GITHUB_URL = "https://github.com/Victor-Okenwa/code-to-play";

export const UNLOCK_LINES = 1000;
export const UNLOCK_PLAYS = 5;

const DOC_TABS = ["installation", "usage", "tracking"] as const;

export type DocTab = (typeof DOC_TABS)[number];

export function isDocTab(value: string | undefined): value is DocTab {
  return DOC_TABS.includes(value as DocTab);
}
