"use client";
import clsx from "clsx";
import { useForm, SubmitHandler, useFormContext } from "react-hook-form";
import { TextInput } from "../form/TextInput";
import { TimeInput } from "../form/TimeInput";
import { LinkInput } from "../form/LinkInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

interface IAddEventFormInput {
  name: string;
  start: string;
  end: string;
  link: string;
}

const addEventFormSchema: ZodType<IAddEventFormInput> = z
  .object({
    name: z
      .string()
      .refine((value) => value !== "", "Please enter a name for the event."),
    // TODO - refactor these into their own refiners
    start: z.string().refine((value) => {
      if (value.includes(":")) {
        if (value.split(":").length === 2) {
          return true;
        }
      }
      return false;
    }, "Invalid time."),
    end: z.string().refine((value) => {
      if (value.includes(":")) {
        if (value.split(":").length === 2) {
          return true;
        }
      }
      return false;
    }, "Invalid time."),
    link: z.string().refine((value) => {
      return true;
    }),
  })
  .superRefine(({ start, end }) => {
    const [startHours, startMinutes] = start.split(":");
    const [endHours, endMinutes] = end.split(":");
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(+startHours);
    startDate.setMinutes(+startMinutes);
    endDate.setHours(+endHours);
    endDate.setMinutes(+endMinutes);
    return true;
  });

export const AddEventForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const onSubmit = (data: any) => {
    console.log(data);
    console.log(isSubmitSuccessful);
  };

  return (
    <div
      className={clsx(
        "mx-auto flex rounded-lg bg-base-100 drop-shadow-lg px-6 py-4",
      )}
    >
      <form className={clsx("max-h-lvh ")} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          errorMessage={errors.root?.message}
          placeholder="birthday, reunion, conference, etc."
          topLeftLabel="Event Name:"
          inputProps={register("addEvent.name", { required: true })}
        />
        <div className={clsx("flex justify-center items-center gap-4")}>
          {/* barcode */}
          <div
            className={clsx(
              "flex bg-neutral h-40 w-40 rounded-lg justify-center items-center",
            )}
          >
            <div>barcode</div>
          </div>
          <div className={clsx("flex flex-col")}>
            <TimeInput
              errorMessage={errors.root?.message}
              topLeftLabel="Start:"
              inputProps={register("addEvent.start", { required: true })}
            />
            <TimeInput
              errorMessage={errors.root?.message}
              topLeftLabel="End:"
              inputProps={register("addEvent.end", { required: true })}
            />
          </div>
        </div>
        <LinkInput
          placeholder="google/facebook/youtube link!"
          topLeftLabel="Anything people should know?"
          inputProps={register("addEvent.link")}
        />
        <button type="submit" className={clsx("btn btn-primary btn-md")}>
          Add event!
        </button>
      </form>
    </div>
  );
};
