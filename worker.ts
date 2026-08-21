import { default as handler } from "./.open-next/worker.js";

const CHANGELOG_CRON = "0 6 */2 * *";

async function runCatalogCron(
  env: CloudflareEnv,
  job: "stats" | "changelog",
): Promise<void> {
  const secret = env.CRON_SECRET;
  if (!secret) {
    console.error("[catalog-cron] CRON_SECRET is not set");
    return;
  }

  const origin = env.BETTER_AUTH_URL.replace(/\/$/, "");
  const response = await env.WORKER_SELF_REFERENCE.fetch(
    `${origin}/api/cron/extension-catalog?job=${job}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}` },
    },
  );

  if (!response.ok) {
    const body = await response.text();
    console.error("[catalog-cron] job failed", job, response.status, body);
  }
}

export default {
  fetch: handler.fetch,

  scheduled(controller, env, ctx) {
    const job = controller.cron === CHANGELOG_CRON ? "changelog" : "stats";
    ctx.waitUntil(runCatalogCron(env, job));
  },
} satisfies ExportedHandler<CloudflareEnv>;
