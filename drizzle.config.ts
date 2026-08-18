import { defineConfig } from "drizzle-kit";

// Local libSQL only (`bun run db:push` / `db:studio`). D1 uses wrangler migrations.
const databaseUrl = process.env.DB_FILE_NAME;

if (!databaseUrl) {
  throw new Error("DB_FILE_NAME is not set");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
});
