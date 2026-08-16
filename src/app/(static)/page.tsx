import { ExtensionFacts } from "@/components/home/extension-facts";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { NextSteps } from "@/components/home/next-steps";
import { Pricing } from "@/components/home/pricing";
import { SupportedIdes } from "@/components/home/supported-ides";
import { WhyUse } from "@/components/home/why-use";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <Hero />
      <ExtensionFacts />
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
