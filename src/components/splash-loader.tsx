"use client";

import { motion, useReducedMotion } from "motion/react";

import { Logo } from "@/components/assets/logo";

const SHAKE_SECONDS = 1;
const REST_SECONDS = 2;

export function SplashLoader() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-2xl"
    >
      <span className="sr-only">Loading Code to Play</span>
      <motion.div
        className="origin-bottom"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [0, 28, -8, 24, -6, 20, 0],
                x: [0, 6, -2, 5, -1.5, 4, 0],
                y: [0, -3, 2, -2.5, 1.5, -2, 0],
              }
        }
        transition={{
          duration: SHAKE_SECONDS,
          ease: [0.45, 0.05, 0.55, 0.95],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: REST_SECONDS,
        }}
      >
        <Logo className="size-20" />
      </motion.div>
    </div>
  );
}
