import clsx from "clsx";
import { format, startOfMonth, addDays, subDays } from "date-fns";

const generateViewDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 35; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

export const ItineraryCalendar = (): JSX.Element => {
  // Need 5 weeks.
  // Start by finding the first date of the current month
  // Date represented by index 0 -> Sun, 1 -> Sat, 2 -> Mon etc.
  // fetch 35 dates starting with (7- currentDate)
  const currentDate = new Date();
  const monthStartDate = startOfMonth(currentDate);
  const viewDates = generateViewDates(
    subDays(monthStartDate, 6 - monthStartDate.getDay()),
  );

  const containerClasses = clsx(
    "md:py-8",
    "px-4",
    "lg:max-w-7xl",
    "lg:mx-auto",
    "lg:px-8",
  );

  const headingClasses = clsx("text-4xl", "text-primary", "font-bold", "mb-8");

  const calendarContainerClasses = clsx(
    "inline-flex",
    "flex-col",
    "space-y-1",
    "items-start",
    "justify-start",
    "h-full",
    "w-full",
  );

  const dateCellClasses = (date: Date, index: number) =>
    clsx(
      "flex",
      "items-start",
      "justify-start",
      "w-40",
      "h-28",
      "p-1",
      "text-primary",
      "hover:cursor-pointer",
      "border-primary border-b border-l border-opacity-50",
      {
        "text-gray-600 hover:cursor-auto border-primary border-b border-l-neutral":
          date.getMonth() !== currentDate.getMonth() && date.getDate() > 4,
      },
      {
        "text-gray-600 hover:cursor-auto border-primary border-l border-b-neutral":
          date.getMonth() !== currentDate.getMonth() && date.getDate() < 4,
      },
      { "border-primary border-r": false },
      { "border-primary border-b border-l": (35 - index) % 7 === 0 }, // if first element of row, only set bottom border
      { "border-primary border-r": (35 - index) % 7 === 1 && date.getMonth() === currentDate.getMonth() }, // if first element of row, only set bottom border
      { "border-primary border-t": date.getMonth() === currentDate.getMonth() && index < 7 }, // if first element of row, only set bottom border
      { "": index > 27 }, // if on the last row dont set bottom border
    );

  const getItinerary = (date: Date) => {
    return undefined;
  };

  return (
    <div className={containerClasses}>
      <div className={clsx("flex justify-between items-center text-primary")}>
        <div>{"<"}</div>
        <p className={headingClasses}>{format(currentDate, "MMMM yyyy")}</p>
        <div>{">"}</div>
      </div>
      <div className={calendarContainerClasses}>
        <div className={clsx("grid grid-cols-7 gap-2 w-full text-primary")}>
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <p key={day}>{day}</p>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5">
          {viewDates.map((date, index) => {
            const itineraryForDate = getItinerary(date);
            return (
              <div key={date.toISOString()} className={dateCellClasses(date, index)}>
                <div className={clsx("flex flex-col w-full h-full")}>
                  <div className={clsx("flex")}>{format(date, "dd")}</div>
                  {itineraryForDate ? (
                    <></>
                  ) : (
                    <div
                      className={clsx(
                        "btn btn-primary btn-outline text-xs flex flex-grow items-center justify-center opacity-0 hover:opacity-100",
                        {
                          invisible: currentDate.getMonth() !== date.getMonth(),
                        },
                      )}
                    >
                      Add itinerary
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
