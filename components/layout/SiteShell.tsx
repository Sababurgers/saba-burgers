"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { CartFab } from "./CartFab";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartFab />
    </>
  );
}
