import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import AddNameAndDescriptionForm from './AddNameAndDescriptionForm';
import AddEventsForm from './AddEventsForm';
import InviteAttendees from './InviteAttendeesForm';
import { z } from 'zod';

const createItinerarySchema = z.object({
  addNameAndDescription: z.object({
    name: z.string().min(1, 'Itinerary name must be greater than 1 character').max(64, 'Itinerary name cannot be greater than 64 characters'),
    description: z.string().max(256, 'Description cannot exceed 256 characters.').optional()
  }),
  addEvents: z.object({
    events: z.array(z.object({
      name: z.string().min(1, 'Event name must be greater than 1 character').max(64, 'Event name cannot be greater than 64 characters'),
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
    })),
    inviteAttendees: z.object({
      attendees: z.array(z.object({
        name: z.string().min(1, 'Name must be greater than 1 character').max(64, 'Name cannot be greater than 64 characters'),
        contactInfo: z.string().refine((value) => value !== "", "Please add a method of contact"),
      }))
    })
  })
})

const CreateItineraryDialog = ({ handleClose, monthStartDate, date }: { monthStartDate: Date, date: Date, handleClose: () => void }) => {
  console.log('rendered...')
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const createItineraryDialogRef = useRef<HTMLDialogElement>(null);

  const formHeaders = [
    'Name your itinerary!',
    'Add events!',
    'Invite attendees!',
  ]

  const forms = [
    <AddNameAndDescriptionForm key="form1" />,
    <AddEventsForm key="form2" />,
    <InviteAttendees key="form3" />
  ];

  return (
    <dialog
      className={clsx('modal hover:cursor-default')}
      open
      ref={createItineraryDialogRef}
      onKeyUp={(e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      }}
    >
      <form
        className={clsx('flex w-screen h-screen')}
        method="dialog"
        id="create-itinerary-form"
        onClick={(e) => {
          if (e.target === createItineraryDialogRef.current) {
            handleClose();;
          }
        }}
      >
        <div
          id={'create-itinerary-modal'}
          className={clsx(
            'modal-box flex flex-col gap-2 drop-shadow-md w-full max-w-[60rem] h-full mx-auto my-auto justify-end'
          )}
        >
          <div className={clsx('grid grid-rows-1 grid-cols-3')}>
            <div></div>
            <div className={clsx('justify-self-center sm:text-3xl text-primary')}>
              {formHeaders[currentFormIndex]}
            </div>
            <button type="button" onClick={() => {
              handleClose();
            }} className="justify-self-end btn btn-square btn-secondary">
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
              'flex flex-grow self-center justify-center items-center text-primary w-full'
            )}
          >
            {forms[currentFormIndex]}
          </div>
          <div className={clsx('flex justify-between w-full')}>
            <button
              type="button"
              className={clsx('btn btn-primary mr-2', {
                'invisible': currentFormIndex === 0,
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
                className={clsx('btn btn-primary')}
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
    </dialog>
  );
};

export default CreateItineraryDialog;