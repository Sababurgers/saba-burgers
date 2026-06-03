"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { CartFab } from "./CartFab";

interface TimeSlot { open: string; close: string; }

export function SiteShell({ children, horarios }: { children: React.ReactNode; horarios?: TimeSlot[] }) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNav horarios={horarios} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartFab />
    </>
  );
}
