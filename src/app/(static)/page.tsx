import { ExtensionFacts } from "@/components/home/extension-facts";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { NextSteps } from "@/components/home/next-steps";
import { Pricing } from "@/components/home/pricing";
import { SupportedIdes } from "@/components/home/supported-ides";
import { WhyUse } from "@/components/home/why-use";
import { Separator } from "@/components/ui/separator";
import { getExtensionStats } from "@/lib/extension-stats";
import { TRACKED_LANGUAGE_COUNT } from "@/lib/features";

export const dynamic = "force-dynamic";

export default async function Home() {
  const stats = await getExtensionStats();

  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <Hero installs={stats.installs} languages={TRACKED_LANGUAGE_COUNT} />
      <ExtensionFacts
        version={stats.version}
        vscodeEngine={stats.vscodeEngine}
      />
      <SupportedIdes />

      <WhyUse />

      <Separator className="my-12 bg-foreground/10" />

      <Features />
      <Pricing />
      <Faq />
      <NextSteps />
    </div>
  );
}
