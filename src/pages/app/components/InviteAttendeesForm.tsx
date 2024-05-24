import clsx from "clsx";
import { createItinerarySchema } from "./CreateItineraryDialog";
import { useZodFormContext } from "@/utils/forms";
import { TextInput } from "@/components/form/TextInput";
import TaggedEmailPhoneInput from "@/components/form/TaggedEmailPhoneInput";
import { useFieldArray } from "react-hook-form";

const InviteAttendeesForm = (): JSX.Element => {
  const {
    control,
    register,
    formState: { errors },
  } = useZodFormContext<typeof createItinerarySchema>();
  const { fields } = useFieldArray({
    control,
    name: "inviteAttendees.attendees",
  });
  return (
    <form
      className={clsx(
        "flex flex-col gap-2 self-center justify-center items-center w-full h-full",
      )}
    >
      {fields.map((field, index) => (
        <div className={clsx("flex flex-col w-3/5  text-center")}>
          <TextInput
            errorMessage={errors.addNameAndDescription?.name?.message}
            topLeftLabel="Name:"
            placeholder="Dave"
            inputProps={register(`inviteAttendees.attendees.${index}.name`)}
          />
          <TextInput
            errorMessage={errors.addNameAndDescription?.description?.message}
            topLeftLabel="Email:"
            placeholder="dave@email.com"
            inputProps={register(
              `inviteAttendees.attendees.${index}.contactInfo.email`,
            )}
          />
          <TextInput
            errorMessage={errors.addNameAndDescription?.description?.message}
            topLeftLabel="Phone:"
            placeholder="555-123-4567"
            inputProps={register(
              `inviteAttendees.attendees.${index}.contactInfo.phone`,
            )}
          />
        </div>
      ))}
    </form>
  );
};

export default InviteAttendeesForm;
