import { createClient } from "@libsql/client";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type LibsqlDb = LibSQLDatabase<typeof schema>;

let libsqlDb: LibsqlDb | undefined;

export function getLibsqlDb(url: string): LibsqlDb {
  if (!libsqlDb) {
    libsqlDb = drizzle({ client: createClient({ url }), schema });
  }

  return libsqlDb;
}
