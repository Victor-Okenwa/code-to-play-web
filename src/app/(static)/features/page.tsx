import { Bug, Code2, Gamepad2, Shield } from "lucide-react";
import type { Metadata } from "next";
import { PageShell } from "@/components/static/page-shell";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";

export const metadata: Metadata = {
  title: "Features — Code to Play",
  description:
    "Earn plays by writing meaningful code, then take a break with Debug Snake and Whack-a-Bug inside your editor.",
};

const FEATURES = [
  {
    icon: Code2,
    title: "Write code, earn plays",
    body: `Meaningful lines count toward unlocks. Default is ${UNLOCK_LINES} lines for ${UNLOCK_PLAYS} plays, shared across every game.`,
  },
  {
    icon: Gamepad2,
    title: "Debug Snake",
    body: "Catch bugs and grow your snake without leaving the editor. Each run spends one play.",
  },
  {
    icon: Bug,
    title: "Whack-a-Bug",
    body: "A fast in-editor round: click bugs before they escape. Same play pool as Debug Snake.",
  },
  {
    icon: Shield,
    title: "Local by default",
    body: "High scores, stats, and play counts live in the editor. No telemetry, no account required to play.",
  },
] as const;

export default function FeaturesPage() {
  return (
    <PageShell
      title="Features"
      description="Stay focused while you ship, then spend plays on a short break in-editor. The loop is the product: write code, unlock plays, play, write more."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="size-5 text-primary" aria-hidden />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
