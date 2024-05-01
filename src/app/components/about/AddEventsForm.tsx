"use client";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
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
    console.log(startDate);
    console.log(endDate);
    return true;
  });

export const AddEventForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IAddEventFormInput>({
    resolver: zodResolver(addEventFormSchema),
    defaultValues: {
      name: undefined,
    },
  });
  const onSubmit: SubmitHandler<IAddEventFormInput> = (data) => {
    console.log(data);
    console.log(isSubmitSuccessful);
  };

  return (
    <div
      className={clsx(
        "mx-auto flex justify-center items-center rounded-lg bg-base-100 drop-shadow-lg px-6 py-4",
      )}
    >
      <form className={clsx("max-h-lvh ")} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          errorMessage={errors.name?.message}
          placeholder="Dave's birthday!"
          topLeftLabel="Event Name:"
          inputProps={register("name", { required: true })}
        />
        <div className={clsx("flex justify-center items-center gap-4")}>
          {/* barcode */}
          <div
            className={clsx(
              "flex bg-neutral h-44 w-44 rounded-lg justify-center items-center",
            )}
          >
            <div>barcode</div>
          </div>
          <div className={clsx("flex flex-col")}>
            <TimeInput
              errorMessage={errors.start?.message}
              topLeftLabel="Start:"
              inputProps={register("start", { required: true })}
            />
            <TimeInput
              errorMessage={errors.end?.message}
              topLeftLabel="End:"
              inputProps={register("end", { required: true })}
            />
          </div>
        </div>
        <LinkInput
          placeholder="google/facebook/youtube link!"
          topLeftLabel="Anything people should know?"
        />
        <button type="submit" className={clsx("btn btn-primary btn-md")}>
          Add event!
        </button>
      </form>
    </div>
  );
};
