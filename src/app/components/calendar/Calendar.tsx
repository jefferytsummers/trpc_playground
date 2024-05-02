"use client";
import clsx from "clsx";
import { CalendarBlock } from "./CalendarBlock";
import { CalendarMonth } from "./CalendarMonth";
import { useState } from "react";
import { range } from "../../../utils/util";
export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export const months: Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Calendar = (): JSX.Element => {
  const now = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState<number | undefined>(
    undefined,
  );
  const [selectedMonth, setSelectedMonth] = useState<Month>(months[now.getMonth()]);
  const [dateRange, setDateRange] = useState(range(now.getDate(), 11))
  return (
    <div
      className={clsx(
        "justify-center items-center w-80 h-64 bg-base-100 rounded-top-lg drop-shadow-lg",
      )}
    >
      <CalendarMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <div
        className={clsx("h-48 grid grid-cols-4 grid-rows-3 mx-2 mt-2 gap-2")}
      >
        {dateRange.map((date) => (
          <CalendarBlock
            key={date}
            setSelectedDate={setSelectedDate}
            selected={date === selectedDate}
            className={"sm:text-2xl"}
            value={date.toString()}
          />
        ))}
        <CalendarBlock
          className={
            "text-3xl sm:text-5xl hover:bg-accent hover:text-accent-content"
          }
          value={"»"}
        />
      </div>
    </div>
  );
};
