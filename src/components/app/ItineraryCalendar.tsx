import clsx from "clsx";
import {
  format,
  startOfMonth,
  addDays,
  subDays,
  addMonths,
  subMonths,
  endOfMonth,
} from "date-fns";
import { useRef, useState } from "react";
import CreateItineraryDialog from "./CreateItineraryDialog";

const ItineraryCalendar = (): JSX.Element => {
  // Need 5 weeks.
  // Start by finding the first date of the current month
  // Date represented by index 0 -> Sun, 1 -> Sat, 2 -> Mon etc.
  // fetch 35 dates starting with (7- currentDate)
  const initialDate = new Date();
  const [monthStartDate, setMonthStartDate] = useState<Date>(
    startOfMonth(initialDate),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);

  const generateViewDates = (startDate: Date): Date[] => {
    const dates: Date[] = [];
    // Grab the first 35 dates
    for (let i = 0; i < 35; i++) {
      dates.push(addDays(startDate, i));
    }
    const finalDate = dates[dates.length - 1];
    if (
      dates[dates.length - 1].getMonth() === monthStartDate.getMonth() &&
      finalDate !== endOfMonth(finalDate)
    ) {
      for (let i = 0; i < 7; i++) {
        dates.push(addDays(endOfMonth(finalDate), i));
      }
    }

    return dates;
  };
  const viewDates = generateViewDates(
    subDays(monthStartDate, monthStartDate.getDay()),
  );

  const headingClasses = clsx(
    "text-4xl",
    "flex",
    "text-primary",
    "font-bold",
    "my-4",
  );

  const calendarContainerClasses = clsx(
    "inline-flex",
    "flex-col",
    "space-y-1",
    "items-start",
    "justify-start",
    "w-full",
  );

  const dateCellClasses = (date: Date, index: number) =>
    clsx(
      "flex rounded-lg border border-primary",
      "items-start",
      "justify-start",
      "w-32",
      "h-24",
      "text-primary",
      {
        "text-opacity-0 hover:cursor-not-allowed border-opacity-25":
          date.getMonth() !== monthStartDate.getMonth(),
      },
    );

  const getItinerary = (date: Date) => {
    return true;
  };
  const openCreateItineraryDialog = () => {
    createItineraryDialogRef.current?.show();
  };

  const nextMonthView = () => {
    setMonthStartDate(addMonths(monthStartDate, 1));
  };
  const previousMonthView = () => {
    setMonthStartDate(subMonths(monthStartDate, 1));
  };
  const handleOpen = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };
  const handleClose = () => {
    setSelectedDate(undefined);
    setDialogOpen(false);
  };

  return (
    <div>
      <div
        className={clsx(
          "rounded-t-lg flex justify-between items-center text-primary",
        )}
      >
        <button
          onClick={previousMonthView}
          className={clsx("btn btn-ghost btn-primary")}
        >
          <svg
            className={clsx("fill-primary w-full h-full transform rotate-180")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-8.991 6.228v-2.722c2.54-1.757 5.053-3.506 5.053-3.506s-2.513-1.718-5.053-3.474v-2.722l8.991 6.196zm-6.96 0l-9.04-6.118v3.118h-8v6h8v3.118l9.04-6.118z" />
          </svg>
        </button>
        <p className={headingClasses}>{format(monthStartDate, "MMMM yyyy")}</p>
        <button
          onClick={nextMonthView}
          className={clsx("btn btn-ghost btn-primary")}
        >
          <svg
            className={clsx("fill-primary w-full h-full")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-8.991 6.228v-2.722c2.54-1.757 5.053-3.506 5.053-3.506s-2.513-1.718-5.053-3.474v-2.722l8.991 6.196zm-6.96 0l-9.04-6.118v3.118h-8v6h8v3.118l9.04-6.118z" />
          </svg>
        </button>
      </div>
      <div className={calendarContainerClasses}>
        <div
          className={clsx(
            "grid grid-cols-7 gap-2 text-primary border-primary border-b ml-2",
          )}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <p className={clsx("pl-1 mb-1 w-32")} key={index}>
              {day}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 grid-rows-6 m-2 pt-2">
          {viewDates.map((date, index) => {
            return (
              <div
                key={date.toISOString()}
                className={dateCellClasses(date, index)}
              >
                <div className={clsx("flex flex-col w-full h-full")}>
                  <div className={clsx("flex ml-1")}>{format(date, "dd")}</div>
                  {date.getMonth() === monthStartDate.getMonth() && <button
                    className={clsx(
                      "btn btn-content bg-inherit border-none text-opacity-0 hover:text-opacity-100 text-primary",
                      {
                        "opacity-0 hover:": date.getMonth() !== monthStartDate.getMonth()
                      }
                    )}
                    onClick={() => handleOpen(date)}
                  >
                    Add Itinerary
                  </button> }
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {dialogOpen && !!selectedDate && (
        <CreateItineraryDialog date={selectedDate} handleClose={handleClose} />
      )}
    </div>
  );
};

export default ItineraryCalendar;
