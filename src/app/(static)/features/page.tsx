import type { Metadata } from "next";

import { FeatureCard } from "@/components/features/feature-card";
import { PageShell } from "@/components/static/page-shell";
import { FEATURES } from "@/lib/features";

export const metadata: Metadata = {
  title: "Features — Code to Play",
  description:
    "Earn plays by writing meaningful code, then take a break with Debug Snake and Whack-a-Bug inside your editor.",
};

export default function FeaturesPage() {
  return (
    <PageShell
      title="Features"
      description="Stay focused while you ship, then spend plays on a short break in-editor. The loop is the product: write code, unlock plays, play, write more."
    >
      <ul className="flex flex-col gap-4">
        {FEATURES.map((feature, index) => (
          <li key={feature.id}>
            <FeatureCard feature={feature} index={index} variant="detail" />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
