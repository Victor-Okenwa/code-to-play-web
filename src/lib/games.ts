import { FREE_GAMES, PRO_UPCOMING_GAMES } from "@/lib/pricing";

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

export const LISTED_GAMES: ListedGame[] = [
  ...FREE_GAMES.map((name) => ({
    name,
    tier: "free" as const,
    description: FREE_GAME_DESCRIPTIONS[name],
  })),
  {
    name: PRO_UPCOMING_GAMES,
    tier: "pro",
    description:
      "Pro adds extra play spaces and upcoming titles. Names coming when they ship.",
  },
];
