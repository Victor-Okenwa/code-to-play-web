import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

function serverActionOrigins(): string[] {
  const raw = process.env.BETTER_AUTH_URL;
  if (!raw) {
    return [];
  }

  try {
    return [new URL(raw).host];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
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
