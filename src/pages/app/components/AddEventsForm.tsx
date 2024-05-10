import { LinkInput } from "@/components/form/LinkInput";
import { TextInput } from "@/components/form/TextInput";
import { TimeInput } from "@/components/form/TimeInput";
import clsx from "clsx";

const AddEventsForm = (): JSX.Element => {
  return (
    <div className={clsx("grid grid-cols-2 gap-4 overflow-y-auto")}>
      <div>
        <div className={clsx("flex justify-between h-10")}>
          <div>Event 1</div>
          <button type="button" className={"btn btn-sm btn-secondary"}>
            -
          </button>
        </div>
        <div
          className={clsx(
            "flex gap-2 h-52 text-neutral-content justify-center items-center",
          )}
        >
          <div>
            <TextInput
              placeholder={"reunion, birthday"}
              errorMessage={""}
              topLeftLabel="Event name:"
            />
            <LinkInput
              placeholder={"youtube/facebook/google"}
              topLeftLabel="Links:"
            />
          </div>
          <div>
            <TimeInput errorMessage={""} topLeftLabel="Starts" />
            <TimeInput errorMessage={""} topLeftLabel="Ends" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className={clsx("btn btn-ghost btn-accent w-full h-full")}
      >
        + Add Event
      </button>
    </div>
  );
};

export default AddEventsForm;
