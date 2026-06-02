export interface TimeSlot {
  open: string;
  close: string;
}

export const BUSINESS_HOURS: TimeSlot[] = [
  { open: "13:00", close: "16:30" },
  { open: "20:00", close: "23:30" },
];

export function businessHoursLabel(): string {
  return BUSINESS_HOURS.map((s) => `${s.open}–${s.close}`).join(" · ");
}

export function isTimeWithinHours(time: string): boolean {
  if (!time) return false;
  return BUSINESS_HOURS.some((s) => time >= s.open && time <= s.close);
}

export function isOpenNow(): boolean {
  const now = new Date();
  const hhmm = now.toTimeString().slice(0, 5);
  return isTimeWithinHours(hhmm);
}
