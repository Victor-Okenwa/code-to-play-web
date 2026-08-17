"use client";

import { Briefcase, DownloadIcon, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/extension";
import { copyReveal, copyRevealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PROJECT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Project inquiry")}`;

const ACTIONS = [
  {
    href: "/docs?tab=installation",
    label: "Install",
    description:
      "Add Code to Play to VS Code or Cursor and start earning plays.",
    icon: DownloadIcon,
    external: false,
    featured: true,
  },
  {
    href: "#pricing",
    label: "Go Pro",
    description:
      "Extra play spaces, Call Stack, and Merge Conflict when you want more than Free.",
    icon: Sparkles,
    external: false,
    featured: false,
  },
  {
    href: GITHUB_URL,
    label: "Star us on GitHub",
    description: "Help other developers find the extension.",
    icon: Star,
    external: true,
    featured: false,
  },
  {
    href: PROJECT_MAILTO,
    label: "Contact us for a project",
    description: "Need a custom build or integration? Send a note.",
    icon: Briefcase,
    external: false,
    featured: false,
  },
] as const;

function ActionLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function NextSteps() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <motion.hgroup
          className="flex flex-col items-center gap-3 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={copyRevealStagger}
        >
          <motion.p
            className="text-xs font-semibold tracking-wide text-primary uppercase"
            variants={copyReveal}
          >
            Next step
          </motion.p>
          <motion.h2
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            variants={copyReveal}
          >
            Now that you have heard about us
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground"
            variants={copyReveal}
          >
            Install the extension, go Pro, star the repo, or get in touch about
            a project.
          </motion.p>
        </motion.hgroup>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <li key={action.label}>
                <ActionLink
                  href={action.href}
                  external={action.external}
                  className="block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Card
                    className={cn(
                      "h-full transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:ring-primary/35 hover:shadow-lg hover:shadow-primary/10",
                      action.featured && "ring-primary/40",
                    )}
                  >
                    <CardHeader className="gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <CardTitle>{action.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </ActionLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
