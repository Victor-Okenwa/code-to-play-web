import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { bearer, deviceAuthorization } from "better-auth/plugins";
import { type AppDb, getDb } from "@/db";
import * as schema from "@/db/schema";
import {
  applyCustomerState,
  applyPaidOrder,
  applySubscription,
} from "@/lib/entitlements";
import { EXTENSION_CLIENT_ID } from "@/lib/extension-auth";
import { getPolar, polarCheckoutProducts } from "@/lib/polar";

function createAuth(db: AppDb) {
  const polarClient = getPolar();

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
      polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
          checkout({
            products: async () => polarCheckoutProducts(),
            successUrl: "/dashboard/subscription?checkout=success",
            returnUrl: "/dashboard/subscription",
            authenticatedUsersOnly: true,
          }),
          portal({
            returnUrl: "/dashboard/subscription",
          }),
          webhooks({
            secret: process.env.POLAR_WEBHOOK_SECRET ?? "",
            onOrderPaid: async (payload) => {
              await applyPaidOrder(payload.data);
            },
            onSubscriptionActive: async (payload) => {
              await applySubscription(payload.data, true);
            },
            onSubscriptionCreated: async (payload) => {
              const status = payload.data.status;
              if (status === "active" || status === "trialing") {
                await applySubscription(payload.data, true);
              }
            },
            onSubscriptionUpdated: async (payload) => {
              const status = payload.data.status;
              const isPro = status === "active" || status === "trialing";
              await applySubscription(payload.data, isPro);
            },
            onSubscriptionCanceled: async (payload) => {
              if (!payload.data.cancelAtPeriodEnd) {
                await applySubscription(payload.data, false);
              }
            },
            onSubscriptionRevoked: async (payload) => {
              await applySubscription(payload.data, false);
            },
            onCustomerStateChanged: async (payload) => {
              await applyCustomerState(payload.data);
            },
          }),
        ],
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
