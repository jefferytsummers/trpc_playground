import { TextInput } from "@/components/form/TextInput";
import clsx from "clsx";

const InviteAttendees = (): JSX.Element => {
  return (
    <form className={clsx("flex w-full h-full justify-center items-center")}>
      <ul className={clsx("flex flex-col h-full gap-4 mb-4")}>
        <li className={clsx("flex flex-col")}>
          <div className={clsx("flex justify-between")}>
            <label
              className={clsx("text-primary text-xl")}
            >{`Attendee 1`}</label>
            <div className={clsx("flex flex-col justify-end")}>
              <button
                type="button"
                className={clsx(
                  "btn btn-sm btn-secondary text-xl text-center text-primary-content",
                  {
                    //   invisible: index === 0,
                  },
                )}
                onClick={() => {
                  // remove(index);
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className={clsx("flex flex-col sm:flex-row gap-4")}>
            <TextInput
              className={clsx("sm:w-2/5")}
              errorMessage={""}
              placeholder="Dave Smith"
              topLeftLabel="Name:"
            />
            <TextInput
              className={clsx("sm:w-3/5")}
              errorMessage={""}
              placeholder="email address/phone number"
              topLeftLabel="Contact Info:"
            />
          </div>
        </li>
        <li className={clsx("flex justify-center items-center")}>
          <button
            type="button"
            className={clsx("btn btn-primary btn-ghost w-full")}
          >
            + Add attendee
          </button>
        </li>
      </ul>
    </form>
  );
};

export default InviteAttendees;
