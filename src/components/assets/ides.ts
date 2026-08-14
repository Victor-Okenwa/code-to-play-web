export type SupportedIde = {
  name: string;
  src: string;
  href: string;
  invertOnDark?: boolean;
  hasWordmark?: boolean;
};

export const SUPPORTED_IDES: SupportedIde[] = [
  {
    name: "Visual Studio Code",
    src: "/ides/visual-studio-code.svg",
    href: "https://code.visualstudio.com",
  },
  {
    name: "GitHub Codespaces",
    src: "/ides/github-codespaces.svg",
    href: "https://github.com/features/codespaces",
    invertOnDark: true,
  },
  {
    name: "VSCodium",
    src: "/ides/vscodium.svg",
    href: "https://vscodium.com",
  },
  {
    name: "Gitpod",
    src: "/ides/gitpod.svg",
    href: "https://www.gitpod.io",
  },
  {
    name: "Eclipse Theia",
    src: "/ides/eclipse-theia.svg",
    href: "https://theia-ide.org",
  },
  {
    name: "Eclipse Che",
    src: "/ides/eclipse-che.svg",
    href: "https://eclipse.dev/che",
  },
  {
    name: "Cursor",
    src: "/ides/cursor.svg",
    href: "https://cursor.com",
  },
  {
    name: "Antigravity",
    src: "/ides/antigravity.png",
    href: "https://antigravity.google",
  },
  {
    name: "Windsurf",
    src: "/ides/windsurf.svg",
    href: "https://windsurf.com",
    invertOnDark: true,
    hasWordmark: true,
  },
  {
    name: "Trae",
    src: "/ides/trae.png",
    href: "https://www.trae.ai",
  },
  {
    name: "Positron",
    src: "/ides/positron.svg",
    href: "https://positron.posit.co",
  },
];
