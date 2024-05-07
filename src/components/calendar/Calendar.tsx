"use client";
import clsx from "clsx";
import { CalendarBlock } from "./CalendarBlock";
import { CalendarMonth } from "./CalendarMonth";
import { useState } from "react";
import { dateRange, getMonthNumber } from "@/utils/util";
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
  const [selectedMonth, setSelectedMonth] = useState<Month>(
    months[now.getMonth()],
  );
  const [currentDateRange, setCurrentDateRange] = useState(
    dateRange({ month: now.getMonth(), date: now.getDate() + 23 }, 10),
  );

  return (
    <div
      className={clsx(
        "justify-center items-center w-full sm:w-80 h-full bg-base-100 rounded-top-lg drop-shadow-lg",
      )}
    >
      <CalendarMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <div
        className={clsx("h-48 grid grid-cols-4 grid-rows-3 mx-2 mt-2 gap-2")}
      >
        <button
          className="btn bg-base-100 border-base-100 text-2xl w-full h-full"
          onClick={() =>
            setCurrentDateRange(
              dateRange(
                {
                  month: getMonthNumber(selectedMonth),
                  date: currentDateRange[0],
                },
                -10,
              ),
            )
          }
        >
          «
        </button>
        {currentDateRange.map((date) => (
          <CalendarBlock
            key={date}
            setSelectedDate={setSelectedDate}
            selected={date === selectedDate}
            className={"sm:text-2xl"}
            value={date.toString()}
          />
        ))}
        <button
          className="btn bg-base-100 border-base-100 text-2xl w-full h-full"
          onClick={() =>
            setCurrentDateRange(
              dateRange(
                {
                  month: getMonthNumber(selectedMonth),
                  date: currentDateRange[currentDateRange.length - 1],
                },
                10,
              ),
            )
          }
        >
          »
        </button>
      </div>
    </div>
  );
};
