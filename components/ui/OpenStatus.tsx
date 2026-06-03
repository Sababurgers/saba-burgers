"use client";

import { useEffect, useState } from "react";
import { BUSINESS_HOURS, checkOpenStatus, type TimeSlot } from "@/lib/data/business-hours";

interface Status { isOpen: boolean; closeTime: string | null; }

export function OpenStatus({
  horarios,
  className,
  variant = "light",
}: {
  horarios?: TimeSlot[];
  className?: string;
  variant?: "light" | "dark"; // light = sobre fondo oscuro (nav), dark = sobre fondo claro (ubicacion)
}) {
  const slots = horarios && horarios.length > 0 ? horarios : BUSINESS_HOURS;
  const [status, setStatus] = useState<Status>({ isOpen: false, closeTime: null });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setCurrentTime(now.toTimeString().slice(0, 5));
      setStatus(checkOpenStatus(slots));
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [slots]);

  const openText  = variant === "dark" ? "text-carbon-800"    : "text-paper/70";
  const closeText = variant === "dark" ? "text-stone"         : "text-paper/40";
  const subText   = variant === "dark" ? "text-carbon-800/50" : "text-paper/40";

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${className ?? ""}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-none ${status.isOpen ? "bg-success" : "bg-stone"}`} />
      {status.isOpen ? (
        <span className={openText}>
          Abierto
          {currentTime && <span className={subText}> · {currentTime}</span>}
        </span>
      ) : (
        <span className={closeText}>Cerrado</span>
      )}
    </span>
  );
}
