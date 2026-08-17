import { defineConfig } from "drizzle-kit";

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
