"use client";

import {
    AppWindow,
    Flame,
    HeartPulse,
    ListChecks,
    Smartphone,
    Timer,
} from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";

const copyReveal = {
    hidden: { y: -30, filter: "blur(12px)", opacity: 0 },
    visible: {
        y: 0,
        filter: "blur(0px)",
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

const BENEFITS = [
    {
        icon: Timer,
        title: "Built for long sessions",
        body: "When you have been in the editor for hours, a short play is the break you actually take. You earned it by writing code, not by switching apps.",
    },
    {
        icon: ListChecks,
        title: "Meaningful lines only",
        body: "Comments, blanks, and brace-only lines do not count. The meter moves when you write real code, so progress toward your next plays reflects work you actually did.",
    },
    {
        icon: Flame,
        title: "A finish line in the status bar",
        body: `${UNLOCK_LINES} lines unlock ${UNLOCK_PLAYS} plays, shared across Debug Snake and Whack-a-Bug. Seeing the count tick up is a reason to keep going without leaving your flow.`,
    },
    {
        icon: HeartPulse,
        title: "Rest without the guilt",
        body: "Burnout sneaks in when every pause feels like slacking. Here the break is the reward for shipping lines, so you can step away and come back to the same file.",
    },
    {
        icon: Smartphone,
        title: "Skip the phone spiral",
        body: "A quick check on your phone is never quick. Games live in the editor, so the break stays a break instead of a twenty-minute scroll.",
    },
    {
        icon: AppWindow,
        title: "Play without leaving VS Code",
        body: "Games open as a webview. Your tabs stay put, your context stays intact, and you return to the same cursor.",
    },
] as const;

export function WhyUse() {
    return (
        <section className="px-4 py-16 sm:px-6 sm:py-20 mt-12">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
                <motion.hgroup
                    className="flex flex-col items-center gap-3 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.14 } },
                    }}
                >
                    <motion.p
                        className="text-xs font-semibold tracking-wide text-primary uppercase"
                        variants={copyReveal}
                    >
                        Why use it?
                    </motion.p>
                    <motion.h2
                        className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                        variants={copyReveal}
                    >
                        Coding is intense. Rest is part of the work.
                    </motion.h2>
                    <motion.p
                        className="max-w-2xl text-lg text-muted-foreground"
                        variants={copyReveal}
                    >
                        Breaks shouldn&apos;t break your workflow. They should be earned.
                    </motion.p>
                </motion.hgroup>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {BENEFITS.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <li key={benefit.title}>
                                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:ring-primary/35 hover:shadow-lg hover:shadow-primary/10">
                                    <CardHeader className="gap-3">
                                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover/card:scale-110">
                                            <Icon className="size-4" aria-hidden="true" />
                                        </div>
                                        <CardTitle>{benefit.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {benefit.body}
                                        </p>
                                    </CardContent>
                                </Card>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

