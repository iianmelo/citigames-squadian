import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

function parseFlexible(value: string): Date | null {
  if (!value) return null;

  const iso = parseISO(value);
  if (isValid(iso)) return iso;

  const fallback = new Date(value);
  if (isValid(fallback)) return fallback;

  return null;
}

export function formatMatchDate(value: string): string {
  const date = parseFlexible(value);
  if (!date) return value;
  return format(date, "dd/MM/yyyy", { locale: ptBR });
}

export function formatMatchTime(value: string): string {
  const date = parseFlexible(value);
  if (!date) return value;
  return format(date, "HH'h'", { locale: ptBR });
}

export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function endOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
}
