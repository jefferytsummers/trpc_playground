import clsx from "clsx";
import { LoginForm } from "./LoginForm";

export const Login = (): JSX.Element => {
  return (
    <div
      className={clsx("flex flex-col gap-8 w-full justify-center items-center")}
    >
      <div className={clsx("text-3xl")}>Login</div>
      <LoginForm />
    </div>
  );
};
