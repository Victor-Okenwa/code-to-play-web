import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getAuth } from "@/lib/auth";

export const requireSession = cache(async () => {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return session;
});

export async function getRequestSession(request: Request) {
  const auth = await getAuth();
  return auth.api.getSession({
    headers: request.headers,
  });
}
