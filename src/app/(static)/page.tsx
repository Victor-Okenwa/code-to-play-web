import { ExtensionFacts } from "@/components/home/extension-facts";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { WhyUse } from "@/components/home/why-use";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <Hero />
      <ExtensionFacts />

      <WhyUse />

      <Separator className="my-12 bg-foreground/10" />

      <Features />
    </div>
  );
}
