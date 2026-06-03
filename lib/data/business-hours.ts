export interface TimeSlot {
  open: string;
  close: string;
  days?: string[];
}

const ALL_DAYS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];
const DAY_LABELS: Record<string, string> = {
  lun: "Lun", mar: "Mar", mie: "Mié", jue: "Jue", vie: "Vie", sab: "Sáb", dom: "Dom",
};

function daysLabel(days?: string[]): string {
  if (!days || days.length === 0 || days.length === 7) return "Lun a Dom";
  // Detectar rango consecutivo
  const sorted = [...days].sort((a, b) => ALL_DAYS.indexOf(a) - ALL_DAYS.indexOf(b));
  const isConsecutive = sorted.every((d, i) =>
    i === 0 || ALL_DAYS.indexOf(d) === ALL_DAYS.indexOf(sorted[i - 1]) + 1
  );
  if (isConsecutive && sorted.length > 2) {
    return `${DAY_LABELS[sorted[0]]} a ${DAY_LABELS[sorted[sorted.length - 1]]}`;
  }
  return sorted.map((d) => DAY_LABELS[d]).join(", ");
}

export const BUSINESS_HOURS: TimeSlot[] = [
  { open: "13:00", close: "16:30" },
  { open: "20:00", close: "23:30" },
];

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isWithinSlot(nowMin: number, slot: TimeSlot): boolean {
  const open = toMinutes(slot.open);
  const close = toMinutes(slot.close);
  // Turno normal (ej. 13:00–16:30)
  if (close >= open) return nowMin >= open && nowMin <= close;
  // Turno que cruza medianoche (ej. 20:00–04:00)
  return nowMin >= open || nowMin <= close;
}

export function horariosLabel(slots: TimeSlot[]): string {
  // Agrupa los turnos que tienen exactamente los mismos días
  const groups = new Map<string, TimeSlot[]>();
  for (const slot of slots) {
    const key = (slot.days ?? []).slice().sort().join(",");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(slot);
  }
  return Array.from(groups.entries())
    .map(([, group]) => {
      const times = group.map((s) => `${s.open}–${s.close}`).join(" y ");
      return `${times} · ${daysLabel(group[0].days)}`;
    })
    .join(" / ");
}

export function businessHoursLabel(): string {
  return horariosLabel(BUSINESS_HOURS);
}

export function checkOpenStatus(slots: TimeSlot[]): { isOpen: boolean; closeTime: string | null } {
  const nowMin = toMinutes(new Date().toTimeString().slice(0, 5));
  const slot = slots.find((s) => isWithinSlot(nowMin, s));
  return { isOpen: !!slot, closeTime: slot?.close ?? null };
}

export function isTimeWithinHours(time: string): boolean {
  if (!time) return false;
  const nowMin = toMinutes(time);
  return BUSINESS_HOURS.some((s) => isWithinSlot(nowMin, s));
}
