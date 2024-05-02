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

export function range(start: number, offset: number): number[] {
  const result: number[] = [];

  for (let i = start; i < start + offset; i++) {
    result.push(i);
  }

  return result;
}

export function dateRange(
  start: { month: number; date: number },
  offset: number,
): number[] {
  const now = new Date(Date.now());
  const result: number[] = [];
  const { month, date } = start;

  // Create a new Date object based on the starting month and date
  const startDate = new Date(now.getFullYear(), month, date);

  for (let i = 0; i < Math.abs(offset); i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + (offset >= 0 ? i : -i));
    result.push(currentDate.getDate());
  }

  return offset >= 0 ? result : result.reverse();
}

export function getMonthNumber(month: Month) {
  switch (month) {
    case "January":
      return 0;
    case "February":
      return 1;
    case "March":
      return 2;
    case "April":
      return 3;
    case "May":
      return 4;
    case "June":
      return 5;
    case "July":
      return 6;
    case "August":
      return 7;
    case "September":
      return 8;
    case "October":
      return 9;
    case "November":
      return 10;
    case "December":
      return 11;
  }
}

export function parseMonth(monthString: string): Month {
  const monthMap: { [key: string]: Month } = {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  };

  const lowercaseMonthString = monthString.toLowerCase();

  if (lowercaseMonthString in monthMap) {
    return monthMap[lowercaseMonthString];
  } else {
    throw new Error(`Invalid month: ${monthString}`);
  }
}
