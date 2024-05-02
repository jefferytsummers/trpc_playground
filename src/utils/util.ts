import { Month } from "@/app/components/calendar/Calendar";

export function unwrap<T>(
  value: T | null | undefined,
  errorMessage?: string,
): T {
  if (value === null || value === undefined) {
    throw new Error(errorMessage || "Unwrapped value is null or undefined");
  }
  return value;
}

export function range(start: number, range: number): number[] {
  return Array.from({length: range}, (value, key) => key + start)
}

export function parseMonth(monthString: string): Month {
  const monthMap: { [key: string]: Month } = {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  };

  const lowercaseMonthString = monthString.toLowerCase();

  if (lowercaseMonthString in monthMap) {
    return monthMap[lowercaseMonthString];
  } else {
    throw new Error(`Invalid month: ${monthString}`);
  }
}