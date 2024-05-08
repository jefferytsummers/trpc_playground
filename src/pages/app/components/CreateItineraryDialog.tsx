import clsx from "clsx";
import { useRef } from "react";

const CreateItineraryDialog = ({
  date,
  monthStartDate,
}: {
  date: Date;
  monthStartDate: Date;
}) => {
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);

  const openCreateItineraryDialog = () => {
    createItineraryDialogRef.current?.show();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement>) => {
    if (e.target === e.currentTarget) {
      createItineraryDialogRef.current?.close();
    }
  };

  const handleDialogKeyUp = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      createItineraryDialogRef.current?.close();
    }
  };

  return (
    <>
      <button
        className={clsx(
          "btn btn-ghost hover:bg-neutral text-sm mb-4 flex flex-grow items-center justify-center opacity-0 hover:opacity-100 hover:cursor-pointer",
          {
            invisible: monthStartDate?.getMonth() !== date?.getMonth(),
          },
        )}
        onClick={openCreateItineraryDialog}
      >
        Add itinerary
      </button>
      <dialog
        className={clsx("modal hover:cursor-default")}
        ref={createItineraryDialogRef}
        onKeyUp={handleDialogKeyUp}
      >
        <form
          className={clsx("flex modal-backdrop w-screen h-screen")}
          method="dialog"
          id="create-itinerary-form"
          onClick={handleFormClick}
        >
          <div
            id={"create-itinerary-modal"}
            className={clsx(
              "modal-box flex flex-col gap-2 drop-shadow-md w-full max-w-[60rem] h-full mx-auto my-auto",
            )}
          >
            <div
              className={clsx(
                "grid grid-rows-1 grid-cols-3 justify-items-stretch ",
              )}
            >
              <div></div>
              <div
                className={clsx("justify-self-center sm:text-3xl text-primary")}
              >
                Create Itinerary
              </div>
              <button className="justify-self-end btn btn-square btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className={clsx(
                "flex flex-grow border justify-center items-center text-primary",
              )}
            >
              <div>test</div>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default CreateItineraryDialog;