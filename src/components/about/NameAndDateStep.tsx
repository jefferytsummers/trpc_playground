import clsx from "clsx";
import { Calendar } from "../calendar/Calendar";
import { useFormContext } from "react-hook-form";

export const NameAndDateStep = (): JSX.Element => {
  const { register } = useFormContext();
  return (
    <>
      <p
        className={clsx(
          "max-w-xs sm:max-w-sm text-neutral-content text-xl sm:text-2xl",
        )}
      >
        try it out by creating a bespoke itinerary for your event!
      </p>
      <div
        className={clsx("mx-auto flex flex-col sm:flex-row gap-4 items-center")}
      >
        <Calendar />
        <div
          className={clsx(
            "flex max-w-xs sm:max-w-sm h-72 justify-center items-center text-neutral-content",
          )}
        >
          <div className={clsx("text-2xl")}>
            select a date for your itinerary
          </div>
        </div>
      </div>
    </>
  );
};
