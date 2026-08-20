import type { ClassValue } from "clsx";
import {
  Bug,
  CircleUser,
  CircleX,
  Files,
  Folder,
  GitBranch,
  Play,
  Puzzle,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Logo } from "./logo";

export type IdeGame =
  | "Debug Snake"
  | "Whack-a-Bug"
  | "Call Stack"
  | "Merge Conflict"
  | "Kernel Panic";

type IdeShellProps = {
  className?: ClassValue;
  windowTitle: string;
  ariaLabel: string;
  plays?: number;
  selectedGame?: IdeGame;
  statusRight?: ReactNode;
  children: ReactNode;
};

function ActivityIcon({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative flex w-full items-center justify-center py-2",
        active
          ? "text-editor-foreground before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:bg-editor-foreground"
          : "text-editor-foreground/45",
      )}
    >
      {children}
    </span>
  );
}

function GameRow({
  name,
  plays,
  selected = false,
  premium = false,
}: {
  name: IdeGame;
  plays: number;
  selected?: boolean;
  premium?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 rounded-sm py-0.5 pl-3 pr-1",
        selected && "bg-editor-foreground/8 text-editor-foreground",
      )}
    >
      <span className="truncate">
        {name}
        {premium ? (
          <span className="ml-1 text-[9px] tracking-wide text-primary uppercase">
            Pro
          </span>
        ) : null}
      </span>
      <span className="flex shrink-0 items-center gap-0.5 text-primary">
        <Play className="size-3 fill-primary" />
        {plays} plays
      </span>
    </div>
  );
}

export function IdeShell({
  className,
  windowTitle,
  ariaLabel,
  plays = 5,
  selectedGame,
  statusRight,
  children,
}: IdeShellProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-editor-border bg-editor text-editor-foreground shadow-2xl shadow-black/20",
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-2 border-b border-editor-border bg-editor-panel px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.7_0.16_25)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.82_0.14_85)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.75_0.15_145)]" />
        <span className="ml-3 font-mono text-[11px] text-editor-foreground/60">
          {windowTitle}
        </span>
      </div>

      <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[44px_200px_1fr]">
        <div className="flex flex-col items-center self-stretch border-r border-editor-border bg-editor-panel py-1">
          <ActivityIcon>
            <Files className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <Search className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <GitBranch className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <Bug className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <Puzzle className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon active>
            <Logo className="size-4.5" />
          </ActivityIcon>
          <div className="mt-auto flex w-full flex-col">
            <ActivityIcon>
              <CircleUser className="size-4.5" />
            </ActivityIcon>
            <ActivityIcon>
              <Settings className="size-4.5" />
            </ActivityIcon>
          </div>
        </div>

        <div className="hidden flex-col gap-2 self-stretch border-r border-editor-border px-2.5 py-3 font-mono text-[11px] text-editor-foreground/70 sm:flex">
          <span className="tracking-widest text-editor-foreground/40 uppercase">
            Available Games
          </span>
          <span className="flex items-center gap-1.5">
            <Play className="size-3 fill-primary text-primary" />
            Plays remaining: {plays}
          </span>
          <span className="mt-1 flex items-center gap-1 text-editor-foreground/50">
            <Folder className="size-3" />
            Free Games
          </span>
          <GameRow
            name="Debug Snake"
            plays={plays}
            selected={selectedGame === "Debug Snake"}
          />
          <GameRow
            name="Whack-a-Bug"
            plays={plays}
            selected={selectedGame === "Whack-a-Bug"}
          />
          <span className="mt-1 flex items-center gap-1 text-editor-foreground/50">
            <Folder className="size-3" />
            Pro Games
          </span>
          <GameRow
            name="Call Stack"
            plays={plays}
            selected={selectedGame === "Call Stack"}
            premium
          />
          <GameRow
            name="Merge Conflict"
            plays={plays}
            selected={selectedGame === "Merge Conflict"}
            premium
          />
          <GameRow
            name="Kernel Panic"
            plays={plays}
            selected={selectedGame === "Kernel Panic"}
            premium
          />
          <div className="mt-auto flex flex-col gap-1.5 border-t border-dashed border-editor-border pt-3 text-editor-foreground/50">
            <span>View Statistics</span>
            <span>Export Statistics</span>
          </div>
        </div>

        <div className="min-w-0">{children}</div>
      </div>

      <div className="flex items-center justify-between border-t border-editor-border bg-editor-panel px-2 py-1 font-mono text-[11px] text-editor-foreground/70">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranch className="size-3" /> main
          </span>
          <span className="flex items-center gap-1">
            <CircleX className="size-3" /> 0
            <TriangleAlert className="size-3" /> 0
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-[2px] bg-primary" />
            Code to Play ({plays})
          </span>
          {statusRight}
        </span>
      </div>
    </div>
  );
}
