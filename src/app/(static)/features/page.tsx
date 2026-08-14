import type { Metadata } from "next";

import { FeaturesAccordion } from "@/components/features/features-accordion";
import { PageShell } from "@/components/static/page-shell";

export const metadata: Metadata = {
  title: "Features — Code to Play",
  description:
    "Earn plays by writing meaningful code, then take a break with in-editor games.",
};

export default function FeaturesPage() {
  return (
    <PageShell
      title="Features"
      description="Stay focused while you ship, then spend plays on a short break in-editor. The loop is the product: write code, unlock plays, play, write more."
    >
      <FeaturesAccordion />
    </PageShell>
  );
}
