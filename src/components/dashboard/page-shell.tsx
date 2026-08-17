import type { ReactNode } from "react";

export function DashboardPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>
      {children}
    </div>
  );
}
