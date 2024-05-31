import clsx from "clsx";
import { LinkInput } from "@/components/form/LinkInput";
import { TextInput } from "@/components/form/TextInput";
import { TimeInput } from "@/components/form/TimeInput";
import { useZodFormContext } from "@/utils/forms";
import { createItinerarySchema } from "./CreateItineraryDialog";
import { useFieldArray } from "react-hook-form";

const AddEventsForm = (): JSX.Element => {
  const { register, control, formState } =
    useZodFormContext<typeof createItinerarySchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addEvents.events",
  });
  return (
    <div className={clsx("grid grid-cols-2 gap-4 max-h-full w-full")}>
      {fields.map((field, index) => (
        <div key={index} className={clsx("justify-center items-center")}>
          <div className={clsx('flex w-full justify-between')}>
            <div>{`Event ${index + 1}`}</div>
            <button
              type="button"
              className={"btn btn-sm btn-secondary"}
              onClick={() => remove(index)}
            >
              -
            </button>
          </div>
          <div
            className={clsx(
              "flex gap-2 h-full text-neutral-content justify-center items-center",
            )}
          >
            <div className={clsx('h-full w-full')}>
              <TextInput
                placeholder={"reunion, birthday"}
                errorMessage={
                  formState.errors.addEvents?.events?.[index]?.name?.message
                }
                topLeftLabel={"Event name:"}
                inputProps={register(`addEvents.events.${index}.name`)}
              />
              <LinkInput
                placeholder={"youtube/facebook/google"}
                topLeftLabel={"Links:"}
                inputProps={register(`addEvents.events.${index}.link`)}
              />
            </div>
            <div className={clsx('h-full')}>
              <TimeInput
                errorMessage={
                  formState.errors.addEvents?.events?.[index]?.start?.message
                }
                topLeftLabel="Starts"
                inputProps={register(`addEvents.events.${index}.start`)}
              />
              <TimeInput
                errorMessage={
                  formState.errors.addEvents?.events?.[index]?.end?.message
                }
                topLeftLabel="Ends"
                inputProps={register(`addEvents.events.${index}.end`)}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className={clsx("btn btn-ghost btn-accent w-full h-72")}
        onClick={() => append({ name: "", start: "", end: "", link: "" })}
      >
        + Add Event
      </button>
    </div>
  );
};

export default AddEventsForm;
