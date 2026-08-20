import { FREE_GAMES, PRO_GAMES } from "@/lib/pricing";

export type GameTier = "free" | "pro";

export type ListedGame = {
  name: string;
  tier: GameTier;
  description: string;
};

const FREE_GAME_DESCRIPTIONS: Record<(typeof FREE_GAMES)[number], string> = {
  "Debug Snake":
    "Steer the snake, eat bugs, and keep the streak going after you unlock plays.",
  "Whack-a-Bug":
    "Smash bugs as they pop up. Uses the same play pool as Debug Snake.",
};

const PRO_GAME_DESCRIPTIONS: Record<(typeof PRO_GAMES)[number], string> = {
  "Call Stack":
    "Drop call and return frames. Match a return onto its call to pop the stack.",
  "Merge Conflict":
    "Swap ours, theirs, and base hunks until matching lines merge. Don't let HEAD overflow.",
  "Kernel Panic":
    "Fly the kernel, shoot falling threats, and keep uptime until the clock runs out.",
};

export const LISTED_GAMES: ListedGame[] = [
  ...FREE_GAMES.map((name) => ({
    name,
    tier: "free" as const,
    description: FREE_GAME_DESCRIPTIONS[name],
  })),
  ...PRO_GAMES.map((name) => ({
    name,
    tier: "pro" as const,
    description: PRO_GAME_DESCRIPTIONS[name],
  })),
];
