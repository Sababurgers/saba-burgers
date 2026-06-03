"use client";

import { useEffect, useState } from "react";
import { BUSINESS_HOURS } from "@/lib/data/business-hours";

interface TimeSlot { open: string; close: string; }

function checkStatus(slots: TimeSlot[]) {
  const hhmm = new Date().toTimeString().slice(0, 5);
  const slot = slots.find((s) => hhmm >= s.open && hhmm <= s.close);
  return { isOpen: !!slot, closeTime: slot?.close ?? null };
}

export function OpenStatus({ horarios }: { horarios?: TimeSlot[] }) {
  const slots = horarios && horarios.length > 0 ? horarios : BUSINESS_HOURS;
  const [status, setStatus] = useState({ isOpen: false, closeTime: null as string | null });

  useEffect(() => {
    setStatus(checkStatus(slots));
    const id = setInterval(() => setStatus(checkStatus(slots)), 60_000);
    return () => clearInterval(id);
  }, [slots]);

  return (
    <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]">
      <span className={`w-1.5 h-1.5 rounded-full flex-none ${status.isOpen ? "bg-success" : "bg-stone"}`} />
      {status.isOpen ? (
        <span className="text-paper/70">
          Abierto
          {status.closeTime && <span className="text-paper/40"> · {status.closeTime}</span>}
        </span>
      ) : (
        <span className="text-paper/40">Cerrado</span>
      )}
    </span>
  );
}
