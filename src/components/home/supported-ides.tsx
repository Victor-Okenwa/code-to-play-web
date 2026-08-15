"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

import { SUPPORTED_IDES, type SupportedIde } from "@/components/assets/ides";
import { cn } from "@/lib/utils";

type MarqueeRowProps = {
  items: SupportedIde[];
  direction: "ltr" | "rtl";
  paused: boolean;
};

function IdeMark({ ide }: { ide: SupportedIde }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5">
      <Image
        src={ide.src}
        alt={ide.hasWordmark ? ide.name : ""}
        width={112}
        height={28}
        unoptimized
        className={cn(
          "h-7 w-auto max-w-36 object-contain",
          ide.invertOnDark && "dark:brightness-0 dark:invert",
        )}
      />
      {!ide.hasWordmark ? (
        <span className="font-heading text-sm whitespace-nowrap text-foreground">
          {ide.name}
        </span>
      ) : null}
    </span>
  );
}

function MarqueeItem({
  ide,
  interactive,
}: {
  ide: SupportedIde;
  interactive: boolean;
}) {
  if (!interactive) {
    return (
      <span className="inline-flex" aria-hidden="true">
        <IdeMark ide={ide} />
      </span>
    );
  }

  return (
    <a
      href={ide.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground hover:text-primary"
    >
      <IdeMark ide={ide} />
    </a>
  );
}

function MarqueeRow({ items, direction, paused }: MarqueeRowProps) {
  const reduceMotion = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const startedRtl = useRef(false);
  const loop = [...items, ...items];

  useAnimationFrame((_, delta) => {
    const width = rowRef.current?.scrollWidth ?? 0;
    const half = width / 2;
    if (half === 0) {
      return;
    }

    if (direction === "rtl" && !startedRtl.current) {
      x.set(-half);
      startedRtl.current = true;
    }

    if (paused || reduceMotion) {
      return;
    }

    const speed = 36;
    const next =
      x.get() + (direction === "ltr" ? -1 : 1) * speed * (delta / 1000);

    if (direction === "ltr" && next <= -half) {
      x.set(next + half);
      return;
    }
    if (direction === "rtl" && next >= 0) {
      x.set(next - half);
      return;
    }

    x.set(next);
  });

  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        ref={rowRef}
        className="flex w-max items-center gap-10 pr-10"
        style={{ x }}
      >
        {loop.map((ide, index) => (
          <MarqueeItem
            key={`${ide.name}-${index}`}
            ide={ide}
            interactive={index < items.length}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function SupportedIdes() {
  const [paused, setPaused] = useState(false);
  const reversed = [...SUPPORTED_IDES].reverse();

  return (
    <section
      aria-label="Supported IDEs"
      className="px-4 py-8 sm:px-6 sm:py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Works in your favorite editor
        </p>
        <div className="flex flex-col gap-4">
          <MarqueeRow items={SUPPORTED_IDES} direction="ltr" paused={paused} />
          <MarqueeRow items={reversed} direction="rtl" paused={paused} />
        </div>
      </div>
    </section>
  );
}
