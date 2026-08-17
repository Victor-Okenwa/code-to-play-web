import type { Metadata } from "next";
import { AnalyticsOptIn } from "@/components/dashboard/analytics-opt-in";
import { DashboardPageShell } from "@/components/dashboard/page-shell";

export const metadata: Metadata = {
  title: "Analytics — Code to Play",
  description: "Opt in to local progress monitoring for Code to Play.",
};

export default function DashboardAnalyticsPage() {
  return (
    <DashboardPageShell
      title="Analytics"
      description="Progress lives in your editor unless you opt in. We do not collect plays, lines, or high scores until you grant permission."
    >
      <AnalyticsOptIn />
    </DashboardPageShell>
  );
}
