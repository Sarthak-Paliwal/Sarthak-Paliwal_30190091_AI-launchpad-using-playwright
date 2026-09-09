export function dateFromOffset(offsetDays: number): Date {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return date;
}

export function isoDateFromOffset(offsetDays: number): string { return dateFromOffset(offsetDays).toISOString().slice(0, 10); }
export function displayDateFromOffset(offsetDays: number): string { return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(dateFromOffset(offsetDays)); }
