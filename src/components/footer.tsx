import { AtSign, Bug, FolderGit2, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/assets/logo";
import { STATIC_NAV_LINKS } from "@/components/navigations/shared/links";
import {
  CONTACT_EMAIL,
  GITHUB_ISSUES_URL,
  GITHUB_URL,
  MARKETPLACE_URL,
  OPEN_VSX_URL,
  X_HANDLE,
  X_URL,
} from "@/lib/extension";

const PRODUCT_LINKS = STATIC_NAV_LINKS.filter((link) => link.href !== "/");

const STORE_LINKS = [
  { href: OPEN_VSX_URL, label: "Open VSX", external: true },
  { href: MARKETPLACE_URL, label: "Visual Studio Marketplace", external: true },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/legal", label: "Legal" },
  { href: "/refund", label: "Refund Policy" },
] as const;

const CONTACT_LINKS = [
  {
    href: GITHUB_ISSUES_URL,
    label: "Report an issue",
    icon: Bug,
    external: true,
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    icon: FolderGit2,
    external: true,
  },
  {
    href: `mailto:${CONTACT_EMAIL}`,
    label: CONTACT_EMAIL,
    icon: Mail,
    external: false,
  },
  {
    href: X_URL,
    label: `@${X_HANDLE}`,
    icon: AtSign,
    external: true,
  },
] as const;

const linkClassName =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo />
            <span className="font-heading text-base font-semibold">
              Code to Play
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Unlock games while you code. Gamify your VS Code workflow — earn
            game breaks by writing meaningful code.
          </p>
        </div>

        <nav aria-label="Product" className="flex flex-col gap-3">
          <h2 className="font-heading text-sm font-semibold">Product</h2>
          <ul className="flex flex-col gap-2">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
            {STORE_LINKS.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href} external>
                  {link.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="flex flex-col gap-3">
          <h2 className="font-heading text-sm font-semibold">Legal</h2>
          <ul className="flex flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Contact" className="flex flex-col gap-3">
          <h2 className="font-heading text-sm font-semibold">Contact</h2>
          <ul className="flex flex-col gap-2">
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>
                    <span className="inline-flex items-center gap-2">
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {link.label}
                    </span>
                  </FooterLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <p className="text-sm text-muted-foreground">© {year} Code to Play</p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for Hardcore Developers
          </p>
        </div>
      </div>
    </footer>
  );
}
