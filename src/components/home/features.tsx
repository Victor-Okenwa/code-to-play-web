"use client";
import { motion } from "motion/react";

export function Features() {
    return (
        <section className="px-4 py-12 sm:px-6 sm:py-14">
            <motion.hgroup
                className="flex flex-col items-center gap-3 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.14 } },
                }}
            >                <motion.p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    Features
                </motion.p>
                <motion.h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Everything you need to play while you work
                </motion.h2>

                <motion.p className="max-w-2xl text-lg text-muted-foreground">
                    A complete gamification toolkit that lives in your IDE.
                </motion.p>
            </motion.hgroup>
        </section>
    );
}
