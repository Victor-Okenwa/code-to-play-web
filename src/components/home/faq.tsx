"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { FaqAccordion } from "@/components/faq/faq-accordion";
import { buttonVariants } from "@/components/ui/button";
import { HOME_FAQS } from "@/lib/faq";
import { copyReveal, copyRevealStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Faq() {
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
            FAQ
          </motion.p>
          <motion.h2
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            variants={copyReveal}
          >
            Questions before you install
          </motion.h2>
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground"
            variants={copyReveal}
          >
            What it is, why it helps, and what Pro adds — then write code until
            the status bar unlocks plays.
          </motion.p>
        </motion.hgroup>

        <FaqAccordion items={HOME_FAQS} defaultOpenId={HOME_FAQS[0].id} />

        <div className="flex justify-center">
          <Link
            href="/documentation?tab=faq"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Read the full FAQ
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
