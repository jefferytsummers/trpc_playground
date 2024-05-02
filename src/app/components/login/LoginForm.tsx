import clsx from 'clsx';
import { useZodForm } from "@/utils/forms";
import { z } from "zod";
import { TextInput } from "../form/TextInput";
import { PasswordInput } from "../form/PasswordInput";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;
const initialLoginValues = {
  username: "",
  password: "",
};

export const LoginForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm({
    schema: loginSchema,
    defaultValues: initialLoginValues,
  });
  return (
    <form
      className={clsx('flex flex-col bg-base-100 text-base-content mx-6 my-4 justify-center items-center')}
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <TextInput
        errorMessage={errors.username?.message}
        inputProps={register("username", { required: true })}
        topLeftLabel="Username:"
      />
      <PasswordInput
        errorMessage={errors.password?.message}
        inputProps={register("password", { required: true })}
        topLeftLabel="Password:"
      />
      <button className={clsx('btn btn-primary')}>Login</button>
    </form>
  );
};
