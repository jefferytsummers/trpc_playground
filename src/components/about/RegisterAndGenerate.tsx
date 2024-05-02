import clsx from "clsx";
import { RegistrationForm } from "./forms/RegistrationForm";

export const RegisterAndGenerateStep = (): JSX.Element => {
  return (
    <div
      className={clsx("mx-auto flex flex-col sm:flex-row gap-4 items-center")}
    >
      <div
        className={clsx(
          "flex max-w-xs sm:max-w-sm h-72 justify-center items-center text-neutral-content",
        )}
      >
        <div className={clsx("flex flex-col gap-4 text-2xl")}>
          <p>{"Create an account to create, view, and edit your itinerary!"}</p>
        </div>
      </div>
      <RegistrationForm />
    </div>
  );
};
