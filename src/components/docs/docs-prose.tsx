import type { ReactNode } from "react";

export function DocsProse({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_h2]:font-heading [&_h2]:text-base [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-5 [&_p]:text-muted-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_kbd]:rounded [&_kbd]:border [&_kbd]:bg-muted [&_kbd]:px-1.5 [&_kbd]:py-0.5 [&_kbd]:font-mono [&_kbd]:text-xs">
      {children}
    </div>
  );
}
