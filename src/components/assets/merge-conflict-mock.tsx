/** biome-ignore-all lint/suspicious/noArrayIndexKey: hunk cells are a fixed 6x10 grid */
import type { ClassValue } from "clsx";
import { Frame, GitMerge, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { IdeShell } from "./ide-shell";

const COLS = 6;
const HUNKS = [
  { color: "#569cd6", label: "ours" },
  { color: "#ce9178", label: "theirs" },
  { color: "#808080", label: "base" },
] as const;

const BOARD: Array<Array<0 | 1 | 2 | null>> = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, 1, null, null, null],
  [0, 0, 1, 2, 1, 0],
  [2, 1, 0, 0, 2, 1],
  [1, 2, 2, 1, 0, 0],
  [0, 1, 0, 2, 1, 2],
  [2, 0, 1, 0, 2, 1],
  [1, 1, 2, 0, 0, 2],
  [0, 2, 1, 1, 2, 0],
];

const CURSOR_ROW = 3;
const CURSOR_COL = 0;

export function MergeConflictMock({ className }: { className?: ClassValue }) {
  return (
    <IdeShell
      className={className}
      windowTitle="Merge Conflict — code-to-play"
      ariaLabel="Merge Conflict running in a VS Code webview: the Pro Games sidebar highlights Merge Conflict, and the editor tab shows ours, theirs, and base hunks with a two-cell cursor."
      plays={3}
      selectedGame="Merge Conflict"
    >
      <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
        <span className="flex items-center gap-1.5 border-t-2 border-primary bg-editor px-3 py-2 font-mono">
          <GitMerge className="size-3 text-orange-300" />
          Merge Conflict
        </span>
      </div>

      <div className="flex justify-center bg-editor px-3 py-4 sm:px-6">
        <div className="w-full max-w-sm rounded-lg border border-editor-border bg-editor-panel p-3">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="inline-flex items-center gap-1 rounded border border-editor-border px-1.5 py-0.5">
              <Volume2 className="size-3" />
              Sound On
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-editor-border px-1.5 py-0.5">
              <Frame className="size-3" />
              Focus Play
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-emerald-500/70 px-1.5 py-0.5 text-emerald-400">
              Easy
            </span>
            <span className="ml-auto hidden text-editor-foreground/45 sm:inline">
              Enter swap · Space pause
            </span>
          </div>

          <h2 className="mt-4 text-center font-display text-[13px] tracking-wide text-orange-300 uppercase sm:text-sm">
            Merge Conflict
          </h2>
          <p className="mt-1 text-center text-[10px] text-editor-foreground/55">
            Swap hunks to merge matching lines before HEAD overflows.
          </p>

          <div className="mt-3 flex justify-between font-mono text-[10px] text-editor-foreground/70">
            <span>Score: 18</span>
            <span>High Score: 36</span>
            <span>Combo: 1</span>
          </div>

          <div
            className="mt-3 grid w-full gap-px rounded-md bg-editor-border p-px"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {BOARD.flatMap((line, row) =>
              line.map((hunk, col) => {
                const overflow = row < 2;
                const cursorStart = row === CURSOR_ROW && col === CURSOR_COL;
                const cursorEnd = row === CURSOR_ROW && col === CURSOR_COL + 1;

                return (
                  <div
                    key={`${row}-${col}`}
                    className={cn(
                      "relative flex aspect-[5/4] items-center justify-center bg-editor p-[2px]",
                      overflow && "bg-[rgba(244,135,113,0.08)]",
                      cursorStart &&
                        "rounded-l-sm ring-2 ring-white ring-inset",
                      cursorEnd && "rounded-r-sm ring-2 ring-white ring-inset",
                      (cursorStart || cursorEnd) && "z-1",
                    )}
                  >
                    {hunk !== null ? (
                      <span
                        className="flex size-full items-center justify-center rounded-[3px] font-mono text-[6px] font-bold text-[#1e1e1e] sm:text-[7px]"
                        style={{ backgroundColor: HUNKS[hunk].color }}
                      >
                        {HUNKS[hunk].label}
                      </span>
                    ) : null}
                  </div>
                );
              }),
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded bg-blue-600 py-1.5 text-center text-[11px] font-medium text-white">
              Pause
            </span>
            <span className="flex-1 rounded border border-editor-border py-1.5 text-center text-[11px] text-editor-foreground/70">
              Back to Menu
            </span>
          </div>
          <p className="mt-2 text-center text-[10px] text-emerald-400">
            How to Play
          </p>
        </div>
      </div>
    </IdeShell>
  );
}
