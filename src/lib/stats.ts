export type StatsGame = {
  id: string;
  name: string;
  isPremium: boolean;
  totalPlays: number;
  highScores: Record<string, number>;
  lastPlayed?: number;
};

export type StatsSnapshot = {
  totalLines: number;
  linesByExtension: Record<string, number>;
  playsRemaining: number;
  linesTowardUnlock: number;
  linesToUnlock: number;
  isUnlocked: boolean;
  games: StatsGame[];
};

export type StoredUserStats = {
  snapshot: StatsSnapshot;
  syncedAt: Date;
};

const GAME_ID = /^[a-z0-9-]{1,64}$/;
const EXTENSION = /^\.([a-z0-9+]+\.)*[a-z0-9+]{1,16}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function asNonNegativeInt(value: unknown): number | undefined {
  const number = asFiniteNumber(value);
  if (number === undefined || number < 0 || !Number.isInteger(number)) {
    return undefined;
  }
  return number;
}

function parseHighScores(value: unknown): Record<string, number> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const highScores: Record<string, number> = {};
  for (const [key, score] of Object.entries(value)) {
    const parsed = asNonNegativeInt(score);
    if (!key || key.length > 32 || parsed === undefined) {
      return undefined;
    }
    highScores[key] = parsed;
  }
  return highScores;
}

function parseGame(value: unknown): StatsGame | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const id = typeof value.id === "string" ? value.id : undefined;
  const name = typeof value.name === "string" ? value.name : undefined;
  const totalPlays = asNonNegativeInt(value.totalPlays);
  const highScores = parseHighScores(value.highScores);

  if (
    !id ||
    !GAME_ID.test(id) ||
    !name ||
    name.length > 64 ||
    typeof value.isPremium !== "boolean" ||
    totalPlays === undefined ||
    !highScores
  ) {
    return undefined;
  }

  const lastPlayed = asNonNegativeInt(value.lastPlayed);

  return {
    id,
    name,
    isPremium: value.isPremium,
    totalPlays,
    highScores,
    lastPlayed,
  };
}

function parseLinesByExtension(
  value: unknown,
): Record<string, number> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const linesByExtension: Record<string, number> = {};
  for (const [extension, lines] of Object.entries(value)) {
    const parsed = asNonNegativeInt(lines);
    if (!EXTENSION.test(extension) || parsed === undefined) {
      return undefined;
    }
    linesByExtension[extension] = parsed;
  }
  return linesByExtension;
}

export function parseStatsSnapshot(value: unknown): StatsSnapshot | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const totalLines = asNonNegativeInt(value.totalLines);
  const linesByExtension = parseLinesByExtension(value.linesByExtension);
  const playsRemaining = asNonNegativeInt(value.playsRemaining);
  const linesTowardUnlock = asNonNegativeInt(value.linesTowardUnlock);
  const linesToUnlock = asNonNegativeInt(value.linesToUnlock);

  if (
    totalLines === undefined ||
    !linesByExtension ||
    playsRemaining === undefined ||
    linesTowardUnlock === undefined ||
    linesToUnlock === undefined ||
    typeof value.isUnlocked !== "boolean" ||
    !Array.isArray(value.games) ||
    value.games.length > 20
  ) {
    return undefined;
  }

  const games: StatsGame[] = [];
  for (const game of value.games) {
    const parsed = parseGame(game);
    if (!parsed) {
      return undefined;
    }
    games.push(parsed);
  }

  return {
    totalLines,
    linesByExtension,
    playsRemaining,
    linesTowardUnlock,
    linesToUnlock,
    isUnlocked: value.isUnlocked,
    games,
  };
}

export function parseStoredSnapshot(raw: string): StatsSnapshot | undefined {
  try {
    return parseStatsSnapshot(JSON.parse(raw));
  } catch {
    return undefined;
  }
}
