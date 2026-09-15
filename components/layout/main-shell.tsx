import type { ReactNode } from "react";
export function MainShell({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="min-h-[60vh]" tabIndex={-1}>
      {children}
    </main>
  );
}
