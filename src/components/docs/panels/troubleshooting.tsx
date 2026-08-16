import { DocsProse } from "@/components/docs/docs-prose";
import { GITHUB_ISSUES_URL, UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";
import { TRACKED_EXTENSIONS_URL } from "@/lib/features";

export function TroubleshootingPanel() {
  return (
    <DocsProse>
      <h2>The status bar is not moving</h2>
      <ul>
        <li>
          You may be in an untracked file type. Check{" "}
          <a
            href={TRACKED_EXTENSIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            TRACKEDEXTENSIONS.md
          </a>
          . If the type is not listed, the meter will not move.
        </li>
        <li>
          Comments, blanks, and brace-only lines do not count. Write a
          meaningful line — an assignment, a function, a call — and watch again.
        </li>
      </ul>
      <h2>I cannot open a game</h2>
      <p>
        Plays unlock after {UNLOCK_LINES} meaningful lines ({UNLOCK_PLAYS} plays
        by default). Until then the status bar shows progress, not remaining
        plays. Earn the unlock, then open the Code to Play view in the Activity
        Bar.
      </p>
      <h2>Reload the editor</h2>
      <p>
        If the extension is installed but the view or status bar is missing,
        reload the window from the command palette (<kbd>Ctrl+Shift+P</kbd> /{" "}
        <kbd>Cmd+Shift+P</kbd>, then “Reload Window”).
      </p>
      <h2>Still stuck?</h2>
      <p>
        Open an issue on{" "}
        <a href={GITHUB_ISSUES_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        with the editor you use, the file type, and what the status bar shows.
      </p>
    </DocsProse>
  );
}
