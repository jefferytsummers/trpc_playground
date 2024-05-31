import React, { useState, useRef } from "react";
import clsx from "clsx";
import AddNameAndDescriptionForm from "./AddNameAndDescriptionForm";
import AddEventsForm from "./AddEventsForm";
import { z } from "zod";
import { useZodForm } from "@/utils/forms";
import { FieldError, FieldErrorsImpl, FormProvider, Merge } from "react-hook-form";
import InviteAttendeesForm from "./InviteAttendeesForm";

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
  }).refine((fields) => fields.name !== '', 'Please enter a name.'),
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
          .object({
            email: z
              .string()
              .email('Please enter a valid email address or a valid phone number.'),
            phone: z
              .string()
              .optional()
              .refine((phone) => {

              })
          })
          .partial()
          .refine(({ email, phone }) => {
            return email || phone;
          }, "Please enter an email address or a phone number."),
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
  attendees: [{ name: "", contactInfo: { email: "", phone: "" } }],
};

const CreateItineraryDialog = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);

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
    <AddNameAndDescriptionForm key="create-itinerary-add-name-and-description" />,
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
                  type="button"
                  className={clsx("btn btn-primary")}
                  onClick={async () => {
                    const {
                      trigger,
                      formState: { errors },
                    } = createItineraryFormMethods;

                    type DefinedAddEventsFieldErrors = Merge<FieldError, Merge<FieldError, FieldErrorsImpl<{
                      name: string;
                      start: string;
                      end: string;
                      link: string;
                    }>>>[]

                    type DefinedInviteAttendeesFieldErrors = Merge<FieldError, Merge<FieldError, FieldErrorsImpl<{
                      name: string;
                      contactInfo: {
                        email: string | undefined;
                        phone: string | undefined;
                      };
                    }>>>[]

                    switch (currentFormIndex) {
                      case 0: {
                        await trigger("addNameAndDescription");
                        if (errors.addNameAndDescription === undefined) {
                          setCurrentFormIndex((prevIndex) => prevIndex + 1);
                          return;
                        }
                        console.log({errors: errors.addNameAndDescription})
                        break;
                      }
                      case 1: {
                        await trigger("addEvents.events");
                        if (errors.addEvents === undefined) {
                          setCurrentFormIndex((prevIndex) => prevIndex + 1);
                          return;
                        }
                      }
                      case 2: {
                        if (errors.inviteAttendees === undefined) {
                          setCreateLoading(true);
                          
                          setCreateLoading(false);
                          handleClose();
                        }
                      }
                      default:
                        break;
                    }
                  }}
                >
                  {createLoading ? <span className={clsx('loading loading-dots')} />: currentFormIndex < 2 ? 'Next' : 'Create and send invites!'}
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
