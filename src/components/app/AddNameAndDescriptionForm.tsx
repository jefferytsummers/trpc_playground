import { TextInput } from "@/components/form/TextInput";
import { createItinerarySchema } from "@/types";
import { useZodFormContext } from "@/utils/forms";
import clsx from "clsx";
import { format } from "date-fns";
import { useEffect } from "react";

const AddNameAndDescriptionForm = ({ date }: { date: Date }): JSX.Element => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useZodFormContext<typeof createItinerarySchema>();

  useEffect(() => {
    trigger('addNameAndDescription.name');
  }, [])

  return (
      <div className={clsx("flex flex-col w-3/5 mx-auto my-auto text-center")}>
        {"Let's get a name for the itinerary and add a description"}
        <TextInput
          errorMessage={errors.addNameAndDescription?.name?.message || errors.addNameAndDescription?.message}
          topLeftLabel="Name:"
          placeholder="Monday Murder Mystery, Dave's Birthday, etc."
          inputProps={register("addNameAndDescription.name")}
        />
        <TextInput
          errorMessage={errors.addNameAndDescription?.description?.message}
          topLeftLabel="Description:"
          placeholder="Let's all gather and play a murder mystery game for Dave's birthday!"
          inputProps={register("addNameAndDescription.description")}
        />
        <div className={clsx('text-xl text-neutral-content')}>{format(date, "MM/dd/yyyy")}</div>
      </div>
  );
};

export default AddNameAndDescriptionForm;