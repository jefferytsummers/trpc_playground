<<<<<<< Updated upstream
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import AddNameAndDescriptionForm from './AddNameAndDescriptionForm';
import AddEventsForm from './AddEventsForm';

const CreateItineraryDialog = ({ monthStartDate, date }: { monthStartDate: Date, date: Date }) => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);

  const forms = [
    <AddNameAndDescriptionForm key="form1" />,
    <AddEventsForm key="form2" />
    // Add more forms as needed
=======
import React, { useState, useRef } from "react";
import clsx from "clsx";
import AddNameAndDescriptionForm from "./AddNameAndDescriptionForm";
import AddEventsForm from "./AddEventsForm";
import InviteAttendees from "./InviteAttendeesForm";
import { z } from "zod";
import { useZodForm } from "@/utils/forms";
import { FormProvider } from "react-hook-form";

export const createItinerarySchema = z.object({
  addNameAndDescription: z.object({
    name: z
      .string()
      .min(1, "Itinerary name must be greater than 1 character")
      .max(64, "Itinerary name cannot be greater than 64 characters"),
    description: z
      .string()
      .max(256, "Description cannot exceed 256 characters.")
      .optional(),
  }),
  addEvents: z.object({
    events: z.array(
      z.object({
        name: z
          .string()
          .min(1, "Event name must be greater than 1 character")
          .max(64, "Event name cannot be greater than 64 characters"),
        start: z.string().refine((value) => {
          if (value.includes(":")) {
            if (value.split(":").length === 2) {
              return true;
            }
          }
          return false;
        }, "Invalid time."),
        end: z.string().refine((value) => {
          if (value.includes(":")) {
            if (value.split(":").length === 2) {
              return true;
            }
          }
          return false;
        }, "Invalid time."),
        link: z.string().refine((value) => {
          return true;
        }),
      }),
    ),
  }),
  inviteAttendees: z.object({
    attendees: z.array(
      z.object({
        name: z
          .string()
          .min(1, "Name must be greater than 1 character")
          .max(64, "Name cannot be greater than 64 characters"),
        contactInfo: z
          .string()
          .refine((value) => value !== "", "Please add a method of contact"),
      }),
    ),
  }),
});

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
  attendees: [{ name: "", contactInfo: "" }],
};
const CreateItineraryDialog = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  console.log("rendered...");
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);

  const createItineraryFormMethods = useZodForm({
    schema: createItinerarySchema,
    defaultValues: {
      addNameAndDescription: initialAddNameAndDescriptionInput,
      addEvents: initialAddEventsInput,
      inviteAttendees: initialInviteAttendeesInput,
    },
  });

  const formHeaders = [
    "Name your itinerary!",
    "Add events!",
    "Invite attendees!",
  ];

  const forms = [
    <AddNameAndDescriptionForm key="create-itinerary-add-name-and-description" />,
    <AddEventsForm key="create-itinerary-add-events" />,
    <InviteAttendees key="create-itinerary-invite-attendees" />,
>>>>>>> Stashed changes
  ];

  const openCreateItineraryDialog = () => {
    createItineraryDialogRef.current?.showModal();
  };

  return (
<<<<<<< Updated upstream
    <>
      <button
        className={clsx(
          'btn btn-ghost hover:bg-neutral text-sm mb-4 flex flex-grow items-center justify-center opacity-0 hover:opacity-100 hover:cursor-pointer',
          {
            invisible: monthStartDate?.getMonth() !== date?.getMonth(),
          }
        )}
        onClick={openCreateItineraryDialog}
      >
        Add itinerary
      </button>
      <dialog
        className={clsx('modal hover:cursor-default')}
        ref={createItineraryDialogRef}
        onKeyUp={(e) => {
          if (e.key === 'Escape') {
            createItineraryDialogRef.current?.close();
          }
        }}
      >
        <form
          className={clsx('flex w-screen h-screen')}
=======
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
>>>>>>> Stashed changes
          method="dialog"
          id="create-itinerary-form"
          onClick={(e) => {
            if (e.target === createItineraryDialogRef.current) {
<<<<<<< Updated upstream
              createItineraryDialogRef.current?.close();
=======
              handleClose();
>>>>>>> Stashed changes
            }
          }}
        >
          <div
<<<<<<< Updated upstream
            id={'create-itinerary-modal'}
            className={clsx(
              'modal-box flex flex-col gap-2 drop-shadow-md w-full max-w-[60rem] h-full mx-auto my-auto justify-end border'
            )}
          >
            <div className={clsx('grid grid-rows-1 grid-cols-3')}>
              <div></div>
              <div className={clsx('justify-self-center sm:text-3xl text-primary')}>
                Create Itinerary
              </div>
              <button className="justify-self-end btn btn-square btn-primary">
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              </button>
            </div>
            <div
              className={clsx(
                'flex flex-grow self-center justify-center items-center text-primary w-full'
              )}
            >
              {forms[currentFormIndex]}
            </div>
            <div className={clsx('flex justify-end w-full')}>
              {currentFormIndex > 0 && (
                <button
                  type="button"
                  className={clsx('btn btn-primary mr-2')}
                  onClick={() => {
                    setCurrentFormIndex((prevIndex) => prevIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {currentFormIndex < forms.length - 1 && (
                <button
                  type="button"
                  className={clsx('btn btn-primary')}
=======
              </button>
            </div>
            <div
              className={clsx(
                "flex flex-grow self-center justify-center items-center text-primary w-full",
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
              {currentFormIndex < forms.length - 1 && (
                <button
                  type="button"
                  className={clsx("btn btn-primary")}
>>>>>>> Stashed changes
                  onClick={() => {
                    setCurrentFormIndex((prevIndex) => prevIndex + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
<<<<<<< Updated upstream
      </dialog>
    </>
=======
      </FormProvider>
    </dialog>
>>>>>>> Stashed changes
  );
};

export default CreateItineraryDialog;