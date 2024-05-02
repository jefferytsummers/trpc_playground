import clsx from "clsx";
import { NameAndDateStep } from "./NameAndDateStep";
import { AddEventSteps } from "./AddEventStep";
import { InviteAttendeesStep } from "./InviteAttendeesStep";
import { RegisterAndGenerateStep } from "./RegisterAndGenerate";
import { trpc } from "@/utils/trpc";

export const About = (): JSX.Element => {
  const query = trpc.healthcheck.useQuery();
  return (
    <div className="hero">
      <div className="flex border max-w-sm sm:max-w-full flex-col hero-content text-center justify-center items-center">
        <p className={clsx("text-primary text-2xl sm:text-5xl")}>
          {query.data && (<>{query.data}</>)}
        </p>
        <NameAndDateStep />
        <AddEventSteps />
        <InviteAttendeesStep />
        <RegisterAndGenerateStep />
      </div>
    </div>
  );
};
