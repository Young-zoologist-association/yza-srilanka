import type { EventCardContent } from "@/lib/home/events/resolveEventsContent";

const MONTH_ABBR: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

export function parseEventDate(event: Pick<EventCardContent, "dateDisplay" | "day" | "month">): Date | null {
  const { dateDisplay, day, month } = event;
  const trimmed = dateDisplay?.trim() ?? "";

  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const dayNum = Number(slashMatch[1]);
    const monthNum = Number(slashMatch[2]) - 1;
    const yearNum = Number(slashMatch[3]);
    const date = new Date(yearNum, monthNum, dayNum);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const monthIndex = MONTH_ABBR[month.trim().toUpperCase()];
  const dayNum = Number.parseInt(day, 10);
  if (monthIndex === undefined || Number.isNaN(dayNum)) {
    return null;
  }

  const yearMatch = trimmed.match(/\b(20\d{2})\b/);
  const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear();
  const date = new Date(year, monthIndex, dayNum);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isEventToday(event: Pick<EventCardContent, "dateDisplay" | "day" | "month">): boolean {
  const eventDate = parseEventDate(event);
  if (!eventDate) return false;
  return isSameCalendarDay(eventDate, new Date());
}

export function parseCalendarMonth(label: string): { year: number; month: number } {
  const trimmed = label.trim();
  const parsed = Date.parse(`${trimmed} 1`);
  if (!Number.isNaN(parsed)) {
    const date = new Date(parsed);
    return { year: date.getFullYear(), month: date.getMonth() };
  }

  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function getEventDayNumbersInMonth(
  events: Pick<EventCardContent, "dateDisplay" | "day" | "month">[],
  year: number,
  month: number,
): Set<number> {
  const days = new Set<number>();

  for (const event of events) {
    const date = parseEventDate(event);
    if (!date) continue;
    if (date.getFullYear() === year && date.getMonth() === month) {
      days.add(date.getDate());
    }
  }

  return days;
}

export const CALENDAR_GRID_CELL_COUNT = 42;

export function buildMonthCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  while (cells.length < CALENDAR_GRID_CELL_COUNT) {
    cells.push(null);
  }

  return cells.slice(0, CALENDAR_GRID_CELL_COUNT);
}

export function getTodayDayInMonth(year: number, month: number): number | null {
  const today = new Date();
  if (today.getFullYear() !== year || today.getMonth() !== month) {
    return null;
  }
  return today.getDate();
}

export function formatCalendarMonthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function shiftCalendarMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const date = new Date(year, month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function getCurrentCalendarMonth(): { year: number; month: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}
