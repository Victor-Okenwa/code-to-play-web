"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function RollingDigit({ value }: { value: number }) {
  return (
    <span
      className="relative inline-block h-[1.5em] w-[1ch] overflow-hidden"
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        animate={{ y: `${-value * 1.5}em` }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
      >
        {DIGITS.map((digit) => (
          <span
            key={digit}
            className="flex h-[1.5em] items-center justify-center"
          >
            {digit}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function DigitPair({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(99, value));
  return (
    <>
      <RollingDigit value={Math.floor(clamped / 10)} />
      <RollingDigit value={clamped % 10} />
    </>
  );
}

function remainingMsUntil(endsAt: string) {
  return Math.max(0, new Date(endsAt).getTime() - Date.now());
}

export function CooldownCountdown({
  endsAt,
  onDone,
}: {
  endsAt: string;
  /** Called once when the countdown reaches zero. Must be referentially stable. */
  onDone?: () => void;
}) {
  const [remainingMs, setRemainingMs] = useState(() =>
    remainingMsUntil(endsAt),
  );

  useEffect(() => {
    setRemainingMs(remainingMsUntil(endsAt));
    const timer = setInterval(() => {
      const next = remainingMsUntil(endsAt);
      setRemainingMs(next);
      if (next === 0) {
        clearInterval(timer);
        onDone?.();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endsAt, onDone]);

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const label = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Next purchase unlocks in</span>
      <span
        className="inline-flex items-center font-heading text-base font-semibold text-foreground tabular-nums"
        role="timer"
        aria-label={`${label} remaining`}
      >
        <DigitPair value={hours} />
        <span aria-hidden="true">:</span>
        <DigitPair value={minutes} />
        <span aria-hidden="true">:</span>
        <DigitPair value={seconds} />
      </span>
    </div>
  );
}
