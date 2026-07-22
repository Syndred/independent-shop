"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "min-h-screen" : "min-h-screen page-top-offset"}>
      {children}
    </div>
  );
}
