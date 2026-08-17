import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const databaseUrl = process.env.DB_FILE_NAME;

if (!databaseUrl) {
  throw new Error("DB_FILE_NAME is not set");
}

const client = createClient({ url: databaseUrl });

export const db = drizzle({ client, schema });
