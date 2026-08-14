"use client";

import type { ClassValue } from "clsx";
import { DownloadIcon } from "lucide-react";
import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

import { EditorMock } from "@/components/assets/editor-mock";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const VS_CODE_INSTALL_URL =
  "https://marketplace.visualstudio.com/items?itemName=morse-code.code-to-play";
const OPEN_VSX_INSTALL_URL =
  "https://open-vsx.org/extension/morse-code/code-to";

const STATS = {
  version: "1.0.0",
  installs: 1500,
  languages: 30,
} as const;

type AnimatedCounterProps = {
  to: number;
  suffix?: string;
  className?: ClassValue;
  shorten?: boolean; // Add the shorten prop
};

function formatShortNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1).replace(/\.0$/, "")}m`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1).replace(/\.0$/, "")}k`;
  }
  return num.toLocaleString();
}

function AnimatedCounter({ to, suffix = "", className, shorten = false }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!isInView || !node) {
      return;
    }

    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(value) {
        let displayValue: string;
        if (shorten) {
          displayValue = formatShortNumber(value);
        } else {
          displayValue = Math.round(value).toLocaleString();
        }
        node.textContent = `${displayValue}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, suffix, to, shorten]);

  return (
    <span ref={ref} className={cn(className)}>
      {shorten ? formatShortNumber(0) : "0"}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <article className="bg-linear-to-b from-primary/10 to-background">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="flex flex-col gap-8">
          <section className="space-y-4">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
              Earn playtime by writing code
            </h1>
            <p className="max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Write real code in VS Code and earn plays for Debug Snake and
              Whack-a-Bug. Stay focused, ship features, then take a break
              in-editor.
            </p>
          </section>

          <section className="flex flex-wrap items-center gap-3">
            <Link
              href="/documentation?tab=installation"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "h-13 px-8 grow")}
            >
              <DownloadIcon />
              Install Extension
            </Link>
            <Link
              href={OPEN_VSX_INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-13 px-8 grow")}
            >
              <DownloadIcon />
              Explore Pro
            </Link>
          </section>

          <section className="flex flex-wrap gap-6 sm:gap-10">
            <div className="space-y-1">
              <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                v{STATS.version}
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Current version
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                <AnimatedCounter to={STATS.installs} shorten suffix="+" />
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Installs
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                <AnimatedCounter to={STATS.languages} suffix="+" />
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Languages
              </p>
            </div>
          </section>
        </div>

        <section className="min-w-0">
          <EditorMock className="w-full" />
        </section>
      </div>
    </article>
  );
}
