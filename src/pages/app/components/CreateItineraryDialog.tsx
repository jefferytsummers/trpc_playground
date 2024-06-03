import React, { useState, useRef } from "react";
import clsx from "clsx";
import AddNameAndDescriptionForm from "./AddNameAndDescriptionForm";
import AddEventsForm from "./AddEventsForm";
import { z } from "zod";
import { useZodForm } from "@/utils/forms";
import { FormProvider } from "react-hook-form";
import InviteAttendeesForm from "./InviteAttendeesForm";
import { createItinerarySchema } from "@/types";
import { trpc } from "@/utils/trpc";

type AddNameAndDescriptionInput = z.infer<
  typeof createItinerarySchema.shape.addNameAndDescription
>;
type AddEventsInput = z.infer<typeof createItinerarySchema.shape.addEvents>;
type InviteAttendeesInput = z.infer<
  typeof createItinerarySchema.shape.inviteAttendees
>;

const initialAddNameAndDescriptionInput: AddNameAndDescriptionInput = {
  name: "",
  description: "",
};
const initialAddEventsInput: AddEventsInput = {
  events: [{ name: "", start: "", end: "", link: "" }],
};
const initialInviteAttendeesInput: InviteAttendeesInput = {
  attendees: [{ name: "", contactInfo: { email: "", phone: "" } }],
};

const CreateItineraryDialog = ({
  date,
  handleClose,
}: {
  date: Date,
  handleClose: () => void;
}) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);
  const createItineraryFormRef = useRef<HTMLFormElement>(null)
  const createItineraryMutation = trpc.itinerary.create.useMutation();

  const createItineraryFormMethods = useZodForm({
    schema: createItinerarySchema,
    defaultValues: {
      addNameAndDescription: initialAddNameAndDescriptionInput,
      addEvents: initialAddEventsInput,
      inviteAttendees: initialInviteAttendeesInput,
    },
    mode: "all",
  });

  const formHeaders = [
    "Name your itinerary!",
    "Add events!",
    "Invite attendees!",
  ];

  const forms = [
    <AddNameAndDescriptionForm key="create-itinerary-add-name-and-description" date={date}/>,
    <AddEventsForm key="create-itinerary-add-events" />,
    <InviteAttendeesForm key="create-itinerary-invite-attendees" />,
  ];

  return (
    <dialog
      className={clsx("modal hover:cursor-default")}
      open
      ref={createItineraryDialogRef}
      onKeyUp={(e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      }}
    >
      <FormProvider {...createItineraryFormMethods}>
        <form
          className={clsx("flex w-screen h-screen")}
          method="dialog"
          id="create-itinerary-form"
          ref={createItineraryFormRef}
          onSubmit={createItineraryFormMethods.handleSubmit((data) => {
            console.log({ data })
            console.log(createItineraryMutation.mutate({date, userInput: data}))
            handleClose();
          })}
          onClick={(e) => {
            if (e.target === createItineraryDialogRef.current) {
              handleClose();
            }
          }}
        >
          <div
            id={"create-itinerary-modal"}
            className={clsx(
              "modal-box flex flex-col gap-2 drop-shadow-md w-full max-w-[60rem] h-full mx-auto my-auto justify-end",
            )}
          >
            <div className={clsx("grid grid-rows-1 grid-cols-3")}>
              <div></div>
              <div
                className={clsx("justify-self-center sm:text-3xl text-primary")}
              >
                {formHeaders[currentFormIndex]}
              </div>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                }}
                className="justify-self-end btn btn-square btn-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                "flex justify-center items-center text-primary w-full h-full overflow-y-auto",
              )}
            >
              {forms[currentFormIndex]}
            </div>
            <div className={clsx("flex justify-between w-full")}>
              <button
                type="button"
                className={clsx("btn btn-primary mr-2", {
                  invisible: currentFormIndex === 0,
                })}
                onClick={() => {
                  setCurrentFormIndex((prevIndex) => prevIndex - 1);
                }}
              >
                Previous
              </button>
              {currentFormIndex <= forms.length - 1 && (
                <button
                  type={(currentFormIndex !== 2 && !createItineraryFormMethods.formState.errors.inviteAttendees) ? "button" : "submit"}
                  className={clsx("btn btn-primary")}
                  onClick={async () => {
                    const {
                      trigger,
                      formState: { errors },
                    } = createItineraryFormMethods;

                    switch (currentFormIndex) {
                      case 0: {
                        await trigger("addNameAndDescription");
                        if (errors.addNameAndDescription === undefined) {
                          setCurrentFormIndex(1);
                        }
                        break;
                      }
                      case 1: {
                        await trigger("addEvents.events");
                        if (errors.addEvents === undefined) {
                          console.log('Should be here...')
                          setCurrentFormIndex(2);
                        }
                        break;
                      }
                      case 2: {
                        await trigger('inviteAttendees.attendees');
                        if (errors.inviteAttendees === undefined) {
                          setCreateLoading(true);
                          console.log('Creating itinerary...')
                          console.log(createItineraryFormRef.current);
                          createItineraryFormRef.current?.submit()
                          console.log('Itinerary created...')
                          setCreateLoading(false);
                          return;
                        }
                        break;
                      }
                      default:
                        break;
                    }
                  }}
                >
                  {createLoading ? <span className={clsx('loading loading-dots')} /> : currentFormIndex < 2 ? 'Next' : 'Create and send invites!'}
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </dialog>
  );
};

export default CreateItineraryDialog;
