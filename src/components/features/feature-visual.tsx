import { Download, HardDrive, Trophy, WifiOff } from "lucide-react";

import { DebugSnakeMock } from "@/components/assets/debug-snake-mock";
import { WhackABugMock } from "@/components/assets/whack-a-bug-mock";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UNLOCK_LINES } from "@/lib/extension";
import {
  type FeatureId,
  TRACKED_EXTENSION_GROUPS,
  TRACKED_EXTENSIONS_URL,
  TRACKED_LANGUAGES_PREVIEW,
  UNLOCK_PROGRESS_DEMO,
} from "@/lib/features";

const HIGH_SCORES = [
  { difficulty: "Easy", score: 11 },
  { difficulty: "Medium", score: 7 },
  { difficulty: "Hard", score: 3 },
] as const;

export function FeatureVisual({
  id,
  variant,
}: {
  id: FeatureId;
  variant: "preview" | "detail";
}) {
  switch (id) {
    case "meaningful-lines":
      return variant === "detail" ? (
        <TrackedExtensionsDetail />
      ) : (
        <LanguagePreview />
      );
    case "progressive-unlock":
      return <UnlockProgress />;
    case "local-high-scores":
      return <HighScoresPreview />;
    case "shareable-stats":
      return <ShareableStatsPreview />;
    case "in-editor-games":
      return <GamesPreview />;
    case "works-offline":
      return (
        <NoteVisual
          icon={WifiOff}
          title="No connection required"
          body="Tracking, unlocks, and both games run entirely in the editor."
        />
      );
    case "your-data":
      return (
        <NoteVisual
          icon={HardDrive}
          title="Local unless you say otherwise"
          body="Analytics would only happen if you grant access. Until then, nothing is sent."
        />
      );
    case "free":
      return (
        <NoteVisual
          icon={Trophy}
          title="Games included"
          body="In-editor games, high scores, and stats ship with the free install."
        />
      );
    default:
      return null;
  }
}

function LanguagePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      {TRACKED_LANGUAGES_PREVIEW.map((language) => (
        <Badge key={language} variant="outline">
          {language}
        </Badge>
      ))}
      <Badge variant="secondary" aria-label="More languages tracked">
        …
      </Badge>
    </div>
  );
}

function TrackedExtensionsDetail() {
  return (
    <div className="space-y-4">
      {TRACKED_EXTENSION_GROUPS.map((group) => (
        <div key={group.category} className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {group.category}
          </p>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="flex flex-wrap items-baseline gap-1.5"
              >
                <span className="mr-1 text-sm font-medium">{item.name}</span>
                {item.extensions.map((extension) => (
                  <Badge
                    key={extension}
                    variant="outline"
                    className="font-mono"
                  >
                    {extension}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <a
        href={TRACKED_EXTENSIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs text-muted-foreground underline-offset-3 hover:text-foreground hover:underline"
      >
        Full extension list on GitHub
      </a>
    </div>
  );
}

function UnlockProgress() {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3 font-mono text-sm">
        <span className="text-foreground">
          {UNLOCK_PROGRESS_DEMO}/{UNLOCK_LINES} lines
        </span>
        <span className="text-muted-foreground">locked</span>
      </div>
      <Progress value={UNLOCK_PROGRESS_DEMO} max={UNLOCK_LINES} />
    </div>
  );
}

function HighScoresPreview() {
  return (
    <div className="space-y-3">
      <ul className="divide-y divide-border overflow-hidden rounded-lg ring-1 ring-foreground/10">
        {HIGH_SCORES.map((row) => (
          <li
            key={row.difficulty}
            className="flex items-center justify-between gap-3 px-3 py-2"
          >
            <span className="text-muted-foreground">{row.difficulty}</span>
            <span className="font-mono tabular-nums">{row.score}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        Stored locally · reset anytime
      </p>
    </div>
  );
}

function ShareableStatsPreview() {
  return (
    <ul className="space-y-2 text-sm">
      <li className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2">
        <Trophy className="size-4 text-primary" aria-hidden="true" />
        View Statistics
      </li>
      <li className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2">
        <Download className="size-4 text-primary" aria-hidden="true" />
        Export Statistics
      </li>
    </ul>
  );
}

function GamesPreview() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <DebugSnakeMock className="w-full" />
      <WhackABugMock className="w-full" />
    </div>
  );
}

function NoteVisual({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof WifiOff;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg bg-muted/60 p-4">
      <Icon
        className="mt-0.5 size-5 shrink-0 text-primary"
        aria-hidden="true"
      />
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
