import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10 sm:px-10">
        <div className="flex items-start justify-end">
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            Earn playtime by writing code
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Write real code in VS Code and earn minutes to play your favorite
            games. Stay focused, ship features, then jump into your reward
            session.
          </p>
          <p className="font-accent text-lg uppercase tracking-wide text-primary">
            +10 XP · Level 3 · 5:00 remaining
          </p>
        </div>
      </main>
    </div>
  );
}
