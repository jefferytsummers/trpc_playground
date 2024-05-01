import clsx from "clsx";
import { AddEventForm } from "./AddEventsForm";

export const AddEventSteps = (): JSX.Element => {
  return (
    <>
      <div
        className={clsx("mx-auto flex flex-col sm:flex-row gap-4 items-center")}
      >
        <div
          className={clsx(
            "flex w-64 h-72 justify-center items-center text-neutral-content",
          )}
        >
          <div className={clsx("flex flex-col gap-4 text-2xl")}>
            <p>{"lets get some more details..."}</p>
            <p>{"feel free to link some documents or a video!"}</p>
            <div className={clsx("")}>TODO: logos</div>
          </div>
        </div>
        <AddEventForm />
      </div>
    </>
  );
};
