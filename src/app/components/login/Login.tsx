import clsx from "clsx";
import { LoginForm } from "./LoginForm";

export const Login = (): JSX.Element => {
  return (
    <div
      className={clsx("flex flex-col gap-8 w-full justify-center items-center")}
    >
      <div className={clsx("text-3xl")}>Login</div>
      <div
        className={clsx(
          "max-w-sm sm:max-w-md w-full h-72 bg-base-100 rounded-lg text-primary",
        )}
      >
        <LoginForm />
      </div>
    </div>
  );
};
