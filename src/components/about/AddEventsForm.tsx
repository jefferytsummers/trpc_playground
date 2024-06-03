"use client";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { TextInput } from "../form/TextInput";
import { TimeInput } from "../form/TimeInput";
import { LinkInput } from "../form/LinkInput";

export const GetStartedAddEventForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const onSubmit = (data: any) => {
    console.log(data);
    console.log(isSubmitSuccessful);
  };

  return (
    <div
      className={clsx(
        "mx-auto flex rounded-lg bg-base-100 drop-shadow-lg px-6 py-4",
      )}
    >
      <form className={clsx("max-h-lvh ")} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          errorMessage={errors.root?.message}
          placeholder="birthday, reunion, conference, etc."
          topLeftLabel="Event Name:"
          inputProps={register("addEvent.name", { required: true })}
        />
        <div className={clsx("flex justify-center items-center gap-4")}>
          {/* barcode */}
          <div
            className={clsx(
              "flex bg-neutral h-40 w-40 rounded-lg justify-center items-center",
            )}
          >
            <div>barcode</div>
          </div>
          <div className={clsx("flex flex-col")}>
            <TimeInput
              errorMessage={errors.root?.message}
              topLeftLabel="Start:"
              inputProps={register("addEvent.start", { required: true })}
            />
            <TimeInput
              errorMessage={errors.root?.message}
              topLeftLabel="End:"
              inputProps={register("addEvent.end", { required: true })}
            />
          </div>
        </div>
        <LinkInput
          placeholder="google/facebook/youtube link!"
          topLeftLabel="Anything people should know?"
          inputProps={register("addEvent.link")}
        />
        <button type="submit" className={clsx("btn btn-primary btn-md")}>
          Add event!
        </button>
      </form>
    </div>
  );
};
