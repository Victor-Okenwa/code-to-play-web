"use client";

import type { ClassValue } from "clsx";
import { DownloadIcon } from "lucide-react";
import { animate, motion, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EditorMock } from "@/components/assets/editor-mock";
import { buttonVariants } from "@/components/ui/button";
import { OPEN_VSX_URL } from "@/lib/extension";
import { copyReveal, copyRevealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

function AnimatedCounter({
  to,
  suffix = "",
  className,
  shorten = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!isInView || !node) {
      return;
    }

    const controls = animate(0, to, {
      duration: 5,
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

export function Hero({
  installs,
  languages,
}: {
  installs: number;
  languages: number;
}) {
  return (
    <article className="overflow-x-clip bg-linear-to-b from-primary/10 to-background">
      <div className="flex flex-col gap-10 py-12 lg:flex-row lg:items-center lg:gap-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:mx-0 lg:max-w-xl lg:shrink-0 lg:pl-[max(1rem,calc((100vw-72rem)/2+1rem))] lg:pr-0">
          <motion.section
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={copyRevealStagger}
          >
            <motion.h1
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl"
              variants={copyReveal}
            >
              Earn playtime by writing code
            </motion.h1>
            <motion.p
              className="max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm"
              variants={copyReveal}
            >
              Write real code in VS Code and earn plays for in-editor games.
              Stay focused, ship features, then take a break without leaving
              your files.
            </motion.p>
          </motion.section>

          <section className="flex flex-wrap items-center gap-3">
            <Link
              href="/docs?tab=installation"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-13 px-8 max-sm:grow font-bold",
              )}
            >
              <DownloadIcon />
              Install Extension
            </Link>
            <Link
              href="/pricing"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-13 px-8 max-sm:grow font-bold",
              )}
            >
              <DownloadIcon />
              Explore Pro
            </Link>
          </section>

          <section className="flex flex-wrap gap-6 sm:gap-10">
            <div className="space-y-1">
              <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                <AnimatedCounter to={installs} shorten suffix="+" />
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Installs
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                <AnimatedCounter to={languages} suffix="+" />
              </p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Languages
              </p>
            </div>
          </section>
        </div>

        <section className="min-w-0 px-4 sm:px-6 lg:flex-1 lg:px-0">
          <EditorMock className="w-full lg:rounded-r-none" />
        </section>
      </div>
    </article>
  );
}
