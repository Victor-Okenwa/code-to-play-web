import { createClient } from "@libsql/client";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type AppDb =
  | LibSQLDatabase<typeof schema>
  | DrizzleD1Database<typeof schema>;

let libsqlDb: LibSQLDatabase<typeof schema> | undefined;

function getLibsqlDb(url: string): LibSQLDatabase<typeof schema> {
  if (!libsqlDb) {
    libsqlDb = drizzleLibsql({ client: createClient({ url }), schema });
  }

  return libsqlDb;
}

export async function getDb(): Promise<AppDb> {
  const fileName = process.env.DB_FILE_NAME;
  if (process.env.NODE_ENV === "development" && fileName) {
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
