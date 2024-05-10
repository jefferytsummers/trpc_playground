import clsx from "clsx";
import { GetStartedAddEventForm } from "./AddEventsForm";
import { SocialButtons } from "../common/SocialButtons";
import { useFormContext } from "react-hook-form";

export const AddEventSteps = (): JSX.Element => {
  return (
    <>
      <div
        className={clsx("mx-auto flex flex-col sm:flex-row gap-4 items-center")}
      >
        <div
          className={clsx(
            "flex h-72 justify-center items-center text-neutral-content",
          )}
        >
          <div
            className={clsx(
              "h-full flex flex-col gap-2 text-2xl justify-center items-center",
            )}
          >
            <p>{"lets get some more details..."}</p>
            <p>{"feel free to link some documents or a video!"}</p>
            <SocialButtons
              include={[
                "YouTube",
                "Facebook",
                "GoogleForms",
                "GoogleDocs",
                "GoogleSheets",
              ]}
              readonly
            />
          </div>
        </div>
        <GetStartedAddEventForm />
      </div>
    </>
  );
};
