import clsx from "clsx";
import { NameAndDateStep } from "./NameAndDateStep";
import { AddEventSteps } from "./AddEventStep";
import { InviteAttendeesStep } from "./InviteAttendeesStep";
import { RegisterAndGenerateStep } from "./RegisterAndGenerate";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useZodForm } from "@/utils/forms";

const aboutFormSchema = z.object({
  addEvent: z
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
    }),
  inviteAttendees: z.object({
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
  }),
  registration: z
    .object({
      username: z
        .string()
        .refine((value) => value !== "", "Please enter a username"),
      password: z
        .string()
        .min(8, "Password must be between 8 and 32 characters.")
        .max(32, "Password must be between 8 and 32 characters."),
      confirmPassword: z
        .string()
        .min(8, "Password must be between 8 and 32 characters.")
        .max(32, "Password must be between 8 and 32 characters."),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match.",
          path: ["confirmPassword"],
        });
      }
    }),
});

type AddEventInput = z.infer<typeof aboutFormSchema.shape.addEvent>;
type InviteAttendeesInput = z.infer<
  typeof aboutFormSchema.shape.inviteAttendees
>;
type RegistrationInput = z.infer<typeof aboutFormSchema.shape.registration>;

const initialAddEventInput: AddEventInput = {
  name: "",
  start: "",
  end: "",
  link: "",
};
const initialInviteAttendeesInput: InviteAttendeesInput = {
  attendees: [{ name: "", contactInfo: "" }],
};
const initialRegistrationInput: RegistrationInput = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const About = (): JSX.Element => {
  const query = trpc.appName.useQuery();
  const aboutFormMethods = useZodForm({
    schema: aboutFormSchema,
    defaultValues: {
      addEvent: initialAddEventInput,
      inviteAttendees: initialInviteAttendeesInput,
      registration: initialRegistrationInput,
    },
  });
  return (
    <FormProvider {...aboutFormMethods}>
      <div className="hero">
        <div className="flex max-w-sm sm:max-w-full flex-col hero-content text-center justify-center items-center">
          <p className={clsx("text-primary text-2xl sm:text-5xl")}>
            {query.data && <>{query.data}</>}
          </p>
          <NameAndDateStep />
          <AddEventSteps />
          <InviteAttendeesStep />
          <RegisterAndGenerateStep />
        </div>
      </div>
    </FormProvider>
  );
};
