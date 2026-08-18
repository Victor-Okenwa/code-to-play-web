import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { bearer, deviceAuthorization } from "better-auth/plugins";
import { type AppDb, getDb } from "@/db";
import * as schema from "@/db/schema";
import { EXTENSION_CLIENT_ID } from "@/lib/extension-auth";

function createAuth(db: AppDb) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
    },
    plugins: [
      bearer(),
      deviceAuthorization({
        verificationUri: "/device",
        validateClient: (clientId) => clientId === EXTENSION_CLIENT_ID,
      }),
      nextCookies(),
    ],
  });
}

type Auth = ReturnType<typeof createAuth>;

let cachedAuth: Auth | undefined;

export async function getAuth(): Promise<Auth> {
  if (cachedAuth) {
    return cachedAuth;
  }

  cachedAuth = createAuth(await getDb());
  return cachedAuth;
}
