import clsx from "clsx";
import { NameAndDateStep } from "./NameAndDateStep";
import { AddEventSteps } from "./AddEventStep";
import { InviteAttendeesStep } from "./InviteAttendeesStep";
import { RegisterAndGenerateStep } from "./RegisterAndGenerate";

export const About = (): JSX.Element => {
  return (
    <div className="hero">
      <div className="mx-auto flex hero-content text-center">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <p className={clsx("text-primary text-2xl sm:text-5xl")}>
            save the date
          </p>
          <NameAndDateStep />
          <AddEventSteps />
          <InviteAttendeesStep />
          <RegisterAndGenerateStep />
        </div>
      </div>
    </div>
  );
};
