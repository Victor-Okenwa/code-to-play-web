"use client";

import { motion } from "motion/react";

import { copyReveal, copyRevealStagger } from "@/lib/motion";

export function FeaturesHeading() {
  return (
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
        Features
      </motion.p>
      <motion.h2
        className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        variants={copyReveal}
      >
        Everything you need to play while you work
      </motion.h2>
      <motion.p
        className="max-w-2xl text-lg text-muted-foreground"
        variants={copyReveal}
      >
        A complete gamification toolkit that lives in your IDE.
      </motion.p>
    </motion.hgroup>
  );
}
