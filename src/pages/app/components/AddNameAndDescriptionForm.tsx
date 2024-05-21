import { TextInput } from "@/components/form/TextInput";
import { useZodFormContext } from "@/utils/forms";
import clsx from "clsx";
import { createItinerarySchema } from "./CreateItineraryDialog";

const AddNameAndDescriptionForm = (): JSX.Element => {
  const { register, formState: { errors }} = useZodFormContext<typeof createItinerarySchema>()
  return (
    <form
      className={clsx(
        "flex flex-col gap-2 self-center justify-center items-center w-full h-full",
      )}
    >
      <div className={clsx("flex flex-col w-3/5  text-center")}>
        {"Let's get a name for the itinerary and add a description"}
        <TextInput
          errorMessage={errors.addNameAndDescription?.name?.message}
          topLeftLabel="Name:"
          placeholder="Monday Murder Mystery, Dave's Birthday, etc."
          inputProps={register('addNameAndDescription.name')}
        />
        <TextInput
          errorMessage={errors.addNameAndDescription?.description?.message}
          topLeftLabel="Description:"
          placeholder="Let's all gather and play a murder mystery game for Dave's birthday!"
          inputProps={register('addNameAndDescription.description')}
        />
      </div>
    </form>
  );
};

export default AddNameAndDescriptionForm;