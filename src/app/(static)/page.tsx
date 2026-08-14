import { ExtensionFacts } from "@/components/home/extension-facts";
import { Hero } from "@/components/home/hero";
import { WhyUse } from "@/components/home/why-use";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <Hero />
      <ExtensionFacts />
      <WhyUse />
    </div>
  );
}
