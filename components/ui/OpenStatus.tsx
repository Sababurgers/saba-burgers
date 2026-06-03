"use client";

import { useEffect, useState } from "react";
import { isOpenNow, currentCloseTime } from "@/lib/data/business-hours";

export function OpenStatus() {
  const [open, setOpen] = useState(false);
  const [closeTime, setCloseTime] = useState<string | null>(null);

  function update() {
    setOpen(isOpenNow());
    setCloseTime(currentCloseTime());
  }

  useEffect(() => {
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]">
      <span className={`w-1.5 h-1.5 rounded-full flex-none ${open ? "bg-success" : "bg-stone"}`} />
      {open ? (
        <span className="text-paper/70">
          Abierto
          {closeTime && <span className="text-paper/40"> · {closeTime}</span>}
        </span>
      ) : (
        <span className="text-paper/40">Cerrado</span>
      )}
    </span>
  );
}
