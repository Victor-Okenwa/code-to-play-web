import type { ClassValue } from "clsx";
import { Cpu, Frame, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { IdeShell } from "./ide-shell";

type Threat = {
  col: number;
  row: number;
  kind: "segv" | "zombie" | "leak" | "ok";
};

const COLS = 9;
const ROWS = 11;
const THREATS: Threat[] = [
  { col: 1, row: 1, kind: "segv" },
  { col: 4, row: 0, kind: "zombie" },
  { col: 7, row: 2, kind: "leak" },
  { col: 2, row: 3, kind: "ok" },
  { col: 6, row: 4, kind: "segv" },
  { col: 0, row: 5, kind: "zombie" },
];

const THREAT_LOOKUP = new Map(
  THREATS.map((cell) => [`${cell.row}-${cell.col}`, cell]),
);

const SHIP_COL = 4;
const SHIP_ROW = 9;
const SHOT_CELLS = [`8-4`, `7-4`, `6-4`];

const KIND_STYLE: Record<
  Threat["kind"],
  { fill: string; dashed?: boolean; label: string }
> = {
  segv: { fill: "#f48771", label: "segv" },
  zombie: { fill: "#c586c0", label: "zombie" },
  leak: { fill: "#ce9178", label: "leak" },
  ok: { fill: "#4ec9b0", dashed: true, label: "ok" },
};

export function KernelPanicMock({ className }: { className?: ClassValue }) {
  return (
    <IdeShell
      className={className}
      windowTitle="Kernel Panic — code-to-play"
      ariaLabel="Kernel Panic running in a VS Code webview: the Pro Games sidebar highlights Kernel Panic, and the editor tab shows a compact kernel craft firing at falling segfaults, zombies, and leaks, with a healthy process marked to avoid."
      plays={3}
      selectedGame="Kernel Panic"
    >
      <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
        <span className="flex items-center gap-1.5 border-t-2 border-primary bg-editor px-3 py-2 font-mono">
          <Cpu className="size-3 text-sky-300" />
          Kernel Panic
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
              Space fire · P pause
            </span>
          </div>

          <h2 className="mt-4 text-center font-display text-[13px] tracking-wide text-sky-300 uppercase sm:text-sm">
            Kernel Panic
          </h2>
          <p className="mt-1 text-center text-[10px] text-editor-foreground/55">
            Fly the kernel craft. Shoot threats. Leave healthy processes alone.
          </p>

          <div className="mt-3 flex justify-between font-mono text-[10px] text-editor-foreground/70">
            <span>Score: 45</span>
            <span>High Score: 90</span>
            <span>HP: 3</span>
            <span>Threat: 3</span>
          </div>

          <div
            className="mt-3 grid w-full gap-px rounded-md bg-editor-border p-px"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const row = Math.floor(i / COLS);
              const col = i % COLS;
              const threat = THREAT_LOOKUP.get(`${row}-${col}`);
              const isShip = row === SHIP_ROW && col === SHIP_COL;
              const isShot = SHOT_CELLS.includes(`${row}-${col}`);

              return (
                <div
                  key={`${row}-${col}`}
                  className="flex aspect-square items-center justify-center bg-[#111218] p-[2px]"
                >
                  {threat ? <ThreatCell threat={threat} /> : null}
                  {isShot && !threat ? (
                    <span className="h-2 w-0.5 rounded-full bg-sky-300" />
                  ) : null}
                  {isShip ? <ShipCell /> : null}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded bg-blue-600 py-1.5 text-center text-[11px] font-medium text-white">
              Pause (P)
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

function ThreatCell({ threat }: { threat: Threat }) {
  const style = KIND_STYLE[threat.kind];

  return (
    <span
      className={cn(
        "flex size-full items-center justify-center rounded-[3px] font-mono text-[6px] font-bold sm:text-[7px]",
        style.dashed && "bg-transparent",
      )}
      style={
        style.dashed
          ? {
              color: style.fill,
              boxShadow: `inset 0 0 0 1.5px ${style.fill}`,
              borderStyle: "dashed",
            }
          : { backgroundColor: style.fill, color: "#1e1e1e" }
      }
    >
      {style.label}
    </span>
  );
}

function ShipCell() {
  return (
    <svg viewBox="0 0 32 28" className="size-[95%]" aria-hidden="true">
      <path d="M12 11 L3 18 L5 22 L13 16 Z" fill="#165a82" />
      <path d="M20 11 L29 18 L27 22 L19 16 Z" fill="#165a82" />
      <path d="M12 11 L3 18 L6 18.4 L12 13 Z" fill="#3aa8e0" />
      <path d="M20 11 L29 18 L26 18.4 L20 13 Z" fill="#3aa8e0" />
      <rect x="2" y="17" width="5" height="2.2" fill="#c8c8c8" />
      <rect x="25" y="17" width="5" height="2.2" fill="#c8c8c8" />
      <path
        d="M16 1 L20 8 L21.5 15 L20.5 24 L11.5 24 L10.5 15 L12 8 Z"
        fill="#4fc1ff"
      />
      <rect x="15" y="7" width="2" height="12" fill="#9ee7ff" />
      <rect x="10.2" y="21" width="4.6" height="4" fill="#0b3a52" />
      <rect x="17.2" y="21" width="4.6" height="4" fill="#0b3a52" />
      <circle cx="12.5" cy="24.2" r="1.5" fill="#7ee7ff" />
      <circle cx="19.5" cy="24.2" r="1.5" fill="#7ee7ff" />
      <path d="M13.2 8 L18.8 8 L17.6 14 L14.4 14 Z" fill="#072433" />
      <path d="M14.2 9 L17.8 9 L17 13 L15 13 Z" fill="#d7f7ff" />
    </svg>
  );
}
