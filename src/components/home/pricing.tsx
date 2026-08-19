"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { PricingCards } from "@/components/pricing/pricing-cards";
import { copyReveal, copyRevealStagger } from "@/lib/motion";
import { PRO_TRIAL_COPY } from "@/lib/pricing";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-14">
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
            Pricing
          </motion.p>
          <motion.h2
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            variants={copyReveal}
          >
            Earn plays, or add more when you need them
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground"
            variants={copyReveal}
          >
            The loop stays free: write code, unlock plays, take a break. Pro
            starts with a {PRO_TRIAL_COPY}. Play spaces are optional when you
            want extra.
          </motion.p>
        </motion.hgroup>

        <PricingCards />

        <p className="text-center text-sm text-muted-foreground">
          Full details on the{" "}
          <Link
            href="/pricing"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            pricing page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
