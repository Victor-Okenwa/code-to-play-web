import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";

export const PRO_MONTHLY = 4;
export const PRO_MONTHLY_WAS = 6;
export const PRO_YEARLY_DISCOUNT = 0.15;
export const PRO_YEARLY = PRO_MONTHLY * 12 * (1 - PRO_YEARLY_DISCOUNT);
export const PRO_YEARLY_WAS = PRO_MONTHLY * 12;
export const PRO_EXTRA_PLAY_SPACES = 2;
export const PRO_TRIAL_DAYS = 7;
export const PRO_TRIAL_COPY = `${PRO_TRIAL_DAYS}-day free trial`;

export const PLAY_SPACE_PRICE = 1;
export const PLAY_SPACE_MIN = 1;
export const PLAY_SPACE_MAX = 10;
export const PLAY_SPACE_COOLDOWN_HOURS = 5;
export const PLAY_SPACE_COOLDOWN_MS =
  PLAY_SPACE_COOLDOWN_HOURS * 60 * 60 * 1000;

export const FREE_GAMES = ["Whack-a-Bug", "Debug Snake"] as const;
export const PRO_GAMES = [
  "Call Stack",
  "Merge Conflict",
  "Kernel Panic",
] as const;

export function formatGameList(names: readonly string[]): string {
  if (names.length === 0) {
    return "";
  }
  if (names.length === 1) {
    return names[0] ?? "";
  }
  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export const PRO_UPCOMING_GAMES = formatGameList(PRO_GAMES);

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const FREE_FEATURES = [
  `Games: ${FREE_GAMES.join(" and ")}`,
  "Difficulty levels on both games",
  `${UNLOCK_LINES} meaningful lines unlock ${UNLOCK_PLAYS} plays, shared across games`,
  "Local high scores and stats — no telemetry",
  "Works in supported editors",
] as const;

export const PRO_FEATURES = [
  "Everything in Free",
  `+${PRO_EXTRA_PLAY_SPACES} play spaces`,
  PRO_UPCOMING_GAMES,
  `${PRO_TRIAL_COPY} — cancel before it ends and you are not charged`,
] as const;
