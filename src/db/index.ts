import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { LibsqlDb } from "./libsql";
import * as schema from "./schema";

export type AppDb = LibsqlDb | DrizzleD1Database<typeof schema>;

export async function getDb(): Promise<AppDb> {
  const fileName = process.env.DB_FILE_NAME;
  if (process.env.NODE_ENV === "development" && fileName) {
    const { getLibsqlDb } = await import("./libsql");
    return getLibsqlDb(fileName);
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env.DB) {
      return drizzleD1(env.DB, { schema });
    }
  } catch {
    // Plain `next dev` / tests without a Cloudflare context.
  }

  throw new Error(
    "No database configured. Set DB_FILE_NAME for local Next.js, or bind D1 as DB on Cloudflare.",
  );
}
