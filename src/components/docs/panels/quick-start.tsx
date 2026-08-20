import { DocsProse } from "@/components/docs/docs-prose";
import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";
import {
  TRACKED_EXTENSIONS_URL,
  TRACKED_LANGUAGES_PREVIEW,
  UNLOCK_PROGRESS_DEMO,
} from "@/lib/features";
import { FREE_GAMES, PRO_UPCOMING_GAMES } from "@/lib/pricing";

export function QuickStartPanel() {
  return (
    <DocsProse>
      <p>
        After install, write real code in a supported file. Meaningful lines
        count toward unlocks — comments, blanks, and brace-only lines do not.
      </p>
      <h2>Status bar</h2>
      <ul>
        <li>
          While locked:{" "}
          <span className="font-mono text-xs text-foreground">
            {UNLOCK_PROGRESS_DEMO}/{UNLOCK_LINES} lines
          </span>
        </li>
        <li>
          When unlocked: remaining plays, default{" "}
          <span className="font-mono text-xs text-foreground">
            {UNLOCK_PLAYS} plays
          </span>
        </li>
      </ul>
      <p>
        Default unlock is {UNLOCK_LINES} meaningful lines for {UNLOCK_PLAYS}{" "}
        plays, shared across every game.
      </p>
      <h2>Spend a play</h2>
      <ol>
        <li>Open the Code to Play view in the Activity Bar.</li>
        <li>
          Pick a game ({FREE_GAMES.join(" or ")}, or Pro: {PRO_UPCOMING_GAMES}
          ). All have difficulty levels.
        </li>
        <li>
          Spend a play. Games open as a webview, so your files and cursor stay
          where they were.
        </li>
      </ol>
      <h2>What counts as a line</h2>
      <p>
        Function and class declarations, assignments, control flow, method
        calls, and import or export statements. Comments, JSDoc, blank lines,
        and lines that are only braces are skipped.
      </p>
      <h2>Tracked languages</h2>
      <p>
        {TRACKED_LANGUAGES_PREVIEW.join(", ")}, and more. If a file type is not
        tracked, the status bar will not move for that file. See the full list
        in{" "}
        <a
          href={TRACKED_EXTENSIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          TRACKEDEXTENSIONS.md
        </a>
        .
      </p>
      <h2>Stats and scores</h2>
      <p>
        High scores, stats, and play counts stay on your machine unless you opt
        in on the dashboard Analytics page. You do not need a network connection
        or an account to play. Sign in from the activity bar is optional.
      </p>
    </DocsProse>
  );
}
