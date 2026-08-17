import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { bearer, deviceAuthorization } from "better-auth/plugins";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { EXTENSION_CLIENT_ID } from "@/lib/extension-auth";

export const auth = betterAuth({
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
