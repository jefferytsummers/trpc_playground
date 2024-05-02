import clsx from "clsx";
import { useForm } from "react-hook-form";
import { TextInput } from "../form/TextInput";
import { PasswordInput } from "../form/PasswordInput";
import { z } from "zod";
import { SocialButtons } from "../common/SocialButtons";
import { useZodForm } from "@/utils/forms";

const registrationFormSchema = z
  .object({
    username: z
      .string()
      .refine((value) => value !== "", "Please enter a username"),
    password: z
      .string()
      .refine((value) => value !== "", "Please enter a password"),
    confirmPassword: z
      .string()
      .refine((value) => value !== "", "Please confirm password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

type Registration = z.infer<typeof registrationFormSchema>;
const initialRegistration: Registration = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const RegistrationForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm({
    schema: registrationFormSchema,
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });
  console.log({ errors });
  return (
    <div className={clsx("bg-base-100 rounded-lg drop-shadow-lg w-full p-4")}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <>
          <TextInput
            errorMessage={errors.username?.message}
            topLeftLabel="Username:"
            placeholder="Email address or phone number"
            inputProps={register("username", { required: true })}
          />
          <PasswordInput
            errorMessage={errors.password?.message}
            topLeftLabel="Password:"
            placeholder="*******"
            inputProps={register("password", { required: true })}
          />
          <PasswordInput
            errorMessage={errors.confirmPassword?.message}
            topLeftLabel="Confirm Password:"
            placeholder="*******"
            inputProps={register("confirmPassword", { required: true })}
          />
        </>
        <div
          className={clsx(
            "flex flex-col gap-4 mx-16 justify-center items-center",
          )}
        >
          <button type="submit" className={clsx("btn btn-primary ")}>
            Register and view!
          </button>
          <div className={clsx("text-lg")}>or register with</div>
          <SocialButtons include={["Google", "Facebook", "Twitter"]} />
        </div>
      </form>
    </div>
  );
};
