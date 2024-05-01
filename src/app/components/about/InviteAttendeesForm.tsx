"use client";
import clsx from "clsx";
import { useFieldArray } from "react-hook-form";
import { TextInput } from "../form/TextInput";
import { z } from "zod";
import { useZodForm } from "../../../utils/forms";

const inviteAttendeesSchema = z.object({
  attendees: z.array(
    z.object({
      name: z
        .string()
        .refine((value) => value !== "", "Please provide a name."),
      // TODO - refactor these into their own refiners
      contactInfo: z
        .string()
        .refine((value) => value !== "", "Please add a method of contact"),
    }),
  ),
});
type Attendee = z.infer<typeof inviteAttendeesSchema>["attendees"][number];
const initialAttendees: Attendee[] = [{ name: "", contactInfo: "" }];

export const InviteAttendeesForm = (): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isValid },
  } = useZodForm({
    schema: inviteAttendeesSchema,
    defaultValues: { attendees: initialAttendees },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attendees",
  });

  return (
    <div
      className={clsx(
        "mx-auto flex rounded-lg bg-base-100 drop-shadow-lg px-6 py-4",
      )}
    >
      <form
        className={clsx("flex flex-col justify-start text-left")}
        onSubmit={handleSubmit((data) => {
          console.log(data);
          console.log(isSubmitSuccessful);
        })}
      >
        <ul className={clsx("flex flex-col gap-4 mb-4")}>
          {fields.map((field, index) => {
            const nameError = errors?.attendees?.[index]?.name?.message;
            const contactInfoError =
              errors?.attendees?.[index]?.contactInfo?.message;
            return (
              <li className={clsx("flex flex-col")} key={index}>
                <div className={clsx("flex justify-between")}>
                  <label
                    className={clsx("text-primary text-xl")}
                  >{`Attendee ${index + 1}`}</label>
                  <div className={clsx("flex flex-col justify-end")}>
                    <button
                      type="button"
                      className={clsx(
                        "btn btn-sm btn-secondary text-xl text-center text-primary-content",
                        {
                          invisible: index === 0,
                        },
                      )}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className={clsx("flex flex-col sm:flex-row gap-4")}>
                  <TextInput
                    className={clsx("sm:w-2/5")}
                    errorMessage={nameError}
                    placeholder="Dave Smith"
                    topLeftLabel="Name:"
                    inputProps={register(`attendees.${index}.name`, {
                      required: true,
                    })}
                  />
                  <TextInput
                    className={clsx("sm:w-3/5")}
                    errorMessage={contactInfoError}
                    placeholder="email address/phone number"
                    topLeftLabel="Contact Info:"
                    inputProps={register(`attendees.${index}.contactInfo`, {
                      required: true,
                    })}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={clsx("flex justify-end gap-4")}>
          <button
            type="button"
            className={clsx("btn btn-accent btn-md")}
            onClick={() => {
              append({
                name: "",
                contactInfo: "",
              });
            }}
          >
            + Add Attendee
          </button>
          <button type="submit" className={clsx("btn btn-primary btn-md")}>
            Send Invites!
          </button>
        </div>
      </form>
    </div>
  );
};
