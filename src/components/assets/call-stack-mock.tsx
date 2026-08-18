import type { ClassValue } from "clsx";
import { Frame, Layers, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { IdeShell } from "./ide-shell";

type FrameKind = "call" | "ret";

type StackCell = {
  col: number;
  row: number;
  kind: FrameKind;
  color: number;
};

const COLS = 8;
const ROWS = 10;
const FRAME_COLORS = ["#4fc1ff", "#dcdcaa", "#c586c0"] as const;

const STACK: StackCell[] = [
  { col: 0, row: 9, kind: "call", color: 0 },
  { col: 1, row: 9, kind: "call", color: 1 },
  { col: 2, row: 9, kind: "call", color: 2 },
  { col: 4, row: 9, kind: "call", color: 0 },
  { col: 5, row: 9, kind: "call", color: 1 },
  { col: 0, row: 8, kind: "ret", color: 1 },
  { col: 1, row: 8, kind: "call", color: 0 },
  { col: 2, row: 8, kind: "ret", color: 2 },
  { col: 4, row: 8, kind: "ret", color: 0 },
  { col: 1, row: 7, kind: "ret", color: 0 },
  { col: 3, row: 2, kind: "ret", color: 0 },
  { col: 3, row: 3, kind: "call", color: 0 },
];

const STACK_LOOKUP = new Map(
  STACK.map((cell) => [`${cell.row}-${cell.col}`, cell]),
);

export function CallStackMock({ className }: { className?: ClassValue }) {
  return (
    <IdeShell
      className={className}
      windowTitle="Call Stack — code-to-play"
      ariaLabel="Call Stack running in a VS Code webview: the Pro Games sidebar highlights Call Stack, and the editor tab shows call and return frames dropping onto the stack."
      plays={3}
      selectedGame="Call Stack"
    >
      <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
        <span className="flex items-center gap-1.5 border-t-2 border-primary bg-editor px-3 py-2 font-mono">
          <Layers className="size-3 text-sky-300" />
          Call Stack
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
              Ctrl+M mute · Ctrl+F focus
            </span>
          </div>

          <h2 className="mt-4 text-center font-display text-[13px] tracking-wide text-sky-300 uppercase sm:text-sm">
            Call Stack
          </h2>
          <p className="mt-1 text-center text-[10px] text-editor-foreground/55">
            Land a return on a matching call to pop the frame.
          </p>

          <div className="mt-3 flex justify-between font-mono text-[10px] text-editor-foreground/70">
            <span>Score: 24</span>
            <span>High Score: 40</span>
            <span>Combo: 2</span>
            <span>Stack: 4</span>
          </div>

          <div
            className="mt-3 grid w-full gap-px rounded-md bg-editor-border p-px"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const row = Math.floor(i / COLS);
              const col = i % COLS;
              const cell = STACK_LOOKUP.get(`${row}-${col}`);
              const overflow = row < 2;

              return (
                <div
                  key={`${row}-${col}`}
                  className={cn(
                    "flex aspect-square items-center justify-center bg-editor p-[2px]",
                    overflow && "bg-[rgba(244,135,113,0.08)]",
                  )}
                >
                  {cell ? <StackFrame cell={cell} /> : null}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded bg-blue-600 py-1.5 text-center text-[11px] font-medium text-white">
              Pause
            </span>
            <span className="flex-1 rounded border border-editor-border py-1.5 text-center text-[11px] text-editor-foreground/70">
              Change Difficulty
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

function StackFrame({ cell }: { cell: StackCell }) {
  const color = FRAME_COLORS[cell.color] ?? FRAME_COLORS[0];
  const isCall = cell.kind === "call";

  return (
    <span
      className="flex size-full items-center justify-center rounded-[3px] font-mono text-[7px] font-bold sm:text-[8px]"
      style={
        isCall
          ? { backgroundColor: color, color: "#1e1e1e" }
          : {
              backgroundColor: "#1e1e1e",
              color,
              boxShadow: `inset 0 0 0 1.5px ${color}`,
            }
      }
    >
      {isCall ? "fn" : "ret"}
    </span>
  );
}
