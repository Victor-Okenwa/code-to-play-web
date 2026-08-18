import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatSyncedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function AnalyticsBenefits() {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
      <li>
        See lifetime lines, language mix, plays remaining, and high scores in
        the browser — the same totals the editor already keeps.
      </li>
      <li>
        Check unlock progress without opening the editor, from any machine where
        you sign in.
      </li>
      <li>
        Keep a web copy of the write → unlock → play loop so you can review it
        after a session.
      </li>
      <li>
        Help us see which games and languages people actually use so we can
        improve the loop — not your source.
      </li>
    </ul>
  );
}

export function AnalyticsDataGuide() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">When a snapshot is sent</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Only if this switch is on and you are signed in from the Code to
            Play activity bar.
          </li>
          <li>Right after you finish a play, or when you unlock new plays.</li>
          <li>
            Shortly after you write while games are still locked (progress
            toward the next unlock).
          </li>
          <li>
            When you sign in from the editor, and otherwise at most every 15
            minutes while signed in.
          </li>
          <li>
            Not on each keystroke. Nothing is sent if you are signed out or this
            switch is off.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">How the data is managed</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            The editor stays the source of truth. Signing in does not upload
            anything by itself.
          </li>
          <li>
            This account stores one snapshot. Each upload replaces the last one
            — totals only, no source or file paths.
          </li>
          <li>
            Turn the switch off to stop uploads and delete the snapshot on this
            account. Local plays and scores in the editor stay put.
          </li>
        </ul>
      </div>
    </div>
  );
}

export function AnalyticsSyncStatus({
  optedIn,
  syncedAt,
}: {
  optedIn: boolean;
  syncedAt: Date | null;
}) {
  if (!optedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nothing is uploaded</CardTitle>
          <CardDescription>
            High scores, play counts, and line totals stay only in your editor
            until you allow progress monitoring.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!syncedAt) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Waiting for the editor</CardTitle>
          <CardDescription>
            Permission is on this account. Sign in from the Code to Play
            activity bar, then write or play. The first snapshot is sent after a
            play, an unlock, or within 15 minutes.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last snapshot received</CardTitle>
        <CardDescription>
          {formatSyncedAt(syncedAt)}. The next upload from the signed-in editor
          replaces this one. Refresh this page to see it.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
