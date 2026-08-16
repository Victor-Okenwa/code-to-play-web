import { redirect } from "next/navigation";

import { docsPath, resolveDocTab } from "@/lib/docs";

export default async function LegacyDocumentationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  redirect(docsPath(resolveDocTab(params)));
}
