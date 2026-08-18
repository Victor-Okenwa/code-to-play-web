import type { Metadata } from "next";
import { AnalyticsBreakdown } from "@/components/dashboard/analytics-breakdown";
import {
  AnalyticsBenefits,
  AnalyticsDataGuide,
  AnalyticsSyncStatus,
} from "@/components/dashboard/analytics-guide";
import { AnalyticsOptIn } from "@/components/dashboard/analytics-opt-in";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAnalyticsOptIn, getUserStats } from "@/lib/analytics";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Analytics — Code to Play",
  description:
    "See a breakdown of lines, plays, and high scores after you opt in.",
};

export default async function DashboardAnalyticsPage() {
  const session = await requireSession();
  const optedIn = await getAnalyticsOptIn(session.user.id);
  const stats = optedIn ? await getUserStats(session.user.id) : null;

  return (
    <DashboardPageShell
      title="Analytics"
      description="Off by default. Allow progress monitoring to see your editor totals here — one snapshot at a time, no source or file paths."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progress monitoring</CardTitle>
            <CardDescription>
              Turn this on to share a snapshot from the signed-in editor. Turn
              it off anytime to stop uploads and delete the copy on this
              account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnalyticsOptIn optedIn={optedIn} />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Why allow this</h3>
              <AnalyticsBenefits />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>When data is sent</CardTitle>
            <CardDescription>
              The extension uploads totals, not your files. You control the
              switch; the editor stays the source of truth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsDataGuide />
          </CardContent>
        </Card>
      </div>
      <AnalyticsSyncStatus
        optedIn={optedIn}
        syncedAt={stats?.syncedAt ?? null}
      />
      {optedIn && stats ? <AnalyticsBreakdown stats={stats} /> : null}
    </DashboardPageShell>
  );
}
