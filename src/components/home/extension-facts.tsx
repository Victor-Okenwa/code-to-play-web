"use client";
import { CodeXml, Gamepad2, ShieldCheck, Tag } from "lucide-react";

import { GITHUB_URL, MARKETPLACE_URL, OPEN_VSX_URL } from "@/lib/extension";

export function ExtensionFacts({
  version,
  vscodeEngine,
}: {
  version: string;
  vscodeEngine: string;
}) {
  const facts = [
    {
      icon: Tag,
      label: `v${version.replace(/^v/i, "")}`,
      href: MARKETPLACE_URL,
    },
    {
      icon: ShieldCheck,
      label: "Apache-2.0 licensed",
      href: `${GITHUB_URL}/blob/main/LICENSE`,
    },
    {
      icon: Gamepad2,
      label: "Available on Open VSX",
      href: OPEN_VSX_URL,
    },
    {
      icon: CodeXml,
      label: `VS Code ${vscodeEngine}`,
    },
  ] as const;

  return (
    <section className="border-y px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase sm:text-base">
          Built for Hardcore Developers
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground sm:gap-x-10">
          {facts.map((fact) => {
            const Icon = fact.icon;
            const content = (
              <>
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {fact.label}
              </>
            );

            return (
              <li key={fact.label}>
                {"href" in fact ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground"
                  >
                    {content}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    {content}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Open source on GitHub
        </a>
      </div>
    </section>
  );
}
