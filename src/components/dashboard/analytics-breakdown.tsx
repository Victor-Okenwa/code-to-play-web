import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StatsSnapshot, StoredUserStats } from "@/lib/stats";

function formatSyncedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatLastPlayed(timestamp?: number): string {
  if (!timestamp) {
    return "Not played yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(timestamp));
}

function languageRows(snapshot: StatsSnapshot) {
  const entries = Object.entries(snapshot.linesByExtension).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );
  const max = entries[0]?.[1] ?? 0;
  return { entries, max };
}

export function AnalyticsBreakdown({ stats }: { stats: StoredUserStats }) {
  const { snapshot, syncedAt } = stats;
  const { entries, max } = languageRows(snapshot);
  const unlockMax = Math.max(snapshot.linesToUnlock, 1);
  const unlockValue = snapshot.isUnlocked
    ? unlockMax
    : Math.min(snapshot.linesTowardUnlock, unlockMax);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Snapshot from {formatSyncedAt(syncedAt)}. Totals only — no source or
        file paths.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Lifetime lines</CardTitle>
            <CardDescription>
              Meaningful lines counted in the editor
            </CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl font-semibold">
            {snapshot.totalLines}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plays remaining</CardTitle>
            <CardDescription>Shared across games</CardDescription>
          </CardHeader>
          <CardContent className="font-heading text-3xl font-semibold">
            {snapshot.playsRemaining}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unlock</CardTitle>
            <CardDescription>
              {snapshot.isUnlocked
                ? "Games are unlocked"
                : `${snapshot.linesTowardUnlock} / ${snapshot.linesToUnlock} lines`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={unlockValue} max={unlockMax} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lines by language</CardTitle>
          <CardDescription>Tracked file extensions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No language totals yet. Write code in a tracked file.
            </p>
          ) : (
            entries.map(([extension, lines]) => (
              <div key={extension} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono">{extension}</span>
                  <span className="text-muted-foreground">{lines}</span>
                </div>
                <Progress value={lines} max={max || 1} />
              </div>
            ))
          )}
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {snapshot.games.map((game) => {
          const scores = Object.entries(game.highScores).filter(
            ([, score]) => score > 0,
          );

          return (
            <Card key={game.id}>
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>
                  {game.totalPlays} {game.totalPlays === 1 ? "play" : "plays"} ·{" "}
                  {formatLastPlayed(game.lastPlayed)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant={game.isPremium ? "default" : "secondary"}>
                  {game.isPremium ? "Pro" : "Free"}
                </Badge>
                {scores.length === 0 ? (
                  <span className="text-sm text-muted-foreground">
                    No high scores yet
                  </span>
                ) : (
                  scores.map(([difficulty, score]) => (
                    <Badge key={difficulty} variant="outline">
                      {difficulty === "default" ? "High score" : difficulty}{" "}
                      {score}
                    </Badge>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
