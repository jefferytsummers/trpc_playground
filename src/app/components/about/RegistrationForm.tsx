import clsx from "clsx";
import { useForm } from "react-hook-form";
import { TextInput } from "../form/TextInput";
import { PasswordInput } from "../form/PasswordInput";
import { z } from "zod";

const registrationFormSchema = z.object({
  username: z
    .string()
    .refine((value) => value !== "", "Please enter a username"),
  password: z
    .string()
    .refine((value) => value !== "", "Please enter a password"),
});

type RegistrationForm = z.infer<typeof registrationFormSchema>;

export const RegistrationForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationForm>();
  return (
    <div className={clsx("bg-base-100 rounded-lg drop-shadow-lg w-full p-4")}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <TextInput
          errorMessage=""
          topLeftLabel="Username"
          placeholder="Email address or phone number"
          inputProps={register("username", { required: true })}
        />
        <PasswordInput
          errorMessage=""
          topLeftLabel="Password"
          placeholder="*******"
          inputProps={register("password", { required: true })}
        />
      </form>
    </div>
  );
};
