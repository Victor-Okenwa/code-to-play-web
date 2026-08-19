import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

/** Hosts for ngrok / cloudflared so `next dev` can serve `/_next` chunks. */
const DEV_TUNNEL_ORIGINS = [
  "*.ngrok-free.app",
  "*.ngrok.app",
  "*.ngrok.io",
  "*.trycloudflare.com",
];

function hostFromEnv(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  try {
    return [new URL(raw.includes("://") ? raw : `https://${raw}`).host];
  } catch {
    return [];
  }
}

function extraDevOrigins(): string[] {
  return (process.env.ALLOWED_DEV_ORIGINS ?? "")
    .split(",")
    .flatMap((entry) => hostFromEnv(entry.trim()));
}

function serverActionOrigins(): string[] {
  return [
    ...hostFromEnv(process.env.BETTER_AUTH_URL),
    ...DEV_TUNNEL_ORIGINS,
    ...extraDevOrigins(),
  ];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: [...DEV_TUNNEL_ORIGINS, ...extraDevOrigins()],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: serverActionOrigins(),
    },
  },
};

export default nextConfig;

void initOpenNextCloudflareForDev().catch((error: unknown) => {
  console.warn(
    "[open-next] Cloudflare dev bindings unavailable; local Next.js will keep using DB_FILE_NAME.",
    error,
  );
});
