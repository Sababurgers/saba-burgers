"use client";

import { useEffect, useState } from "react";
import { BUSINESS_HOURS, checkOpenStatus, type TimeSlot } from "@/lib/data/business-hours";

interface Status { isOpen: boolean; closeTime: string | null; }

export function OpenStatus({ horarios, className }: { horarios?: TimeSlot[]; className?: string }) {
  const slots = horarios && horarios.length > 0 ? horarios : BUSINESS_HOURS;
  const [status, setStatus] = useState<Status>({ isOpen: false, closeTime: null });

  useEffect(() => {
    setStatus(checkOpenStatus(slots));
    const id = setInterval(() => setStatus(checkOpenStatus(slots)), 60_000);
    return () => clearInterval(id);
  }, [slots]);

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${className ?? ""}`}>
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
