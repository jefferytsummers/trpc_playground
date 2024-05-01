import clsx from "clsx";

export const CalendarMonth = (): JSX.Element => {
  return (
    <div
      className={clsx(
        "rounded-t-lg bg-primary text-primary-content  h-12 col-span-4 flex justify-center items-center",
      )}
    >
      <div className={"text-xl"}>Month</div>
    </div>
  );
};
