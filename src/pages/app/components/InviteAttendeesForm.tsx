import clsx from 'clsx';
import { useZodFormContext } from '@/utils/forms';
import { TextInput } from '@/components/form/TextInput';
import { useFieldArray } from 'react-hook-form';
import { createItinerarySchema } from '@/types';

const InviteAttendeesForm = (): JSX.Element => {
    const { control, register, formState: { errors } } = useZodFormContext<typeof createItinerarySchema>()
    const { fields, append, remove } = useFieldArray({ control, name: 'inviteAttendees.attendees' })
    return (
        <div
            className={clsx(
                "grid grid-cols-2 gap-4 self-center justify-center items-center w-full h-full",
            )}
        >
            {fields.map((field, index) => (
                <div key={index} className={clsx("w-full text-center")}>
                    <div className={clsx('flex w-full justify-between')}>
                        <div>{`Attendee ${index + 1}`}</div>
                        <button
                            type="button"
                            className={"btn btn-sm btn-secondary"}
                            onClick={() => remove(index)}
                        >
                            -
                        </button>
                    </div>
                    <TextInput
                        errorMessage={errors.inviteAttendees?.attendees?.[index]?.name?.message}
                        topLeftLabel="Name:"
                        placeholder="Dave"
                        inputProps={register(`inviteAttendees.attendees.${index}.name`)}
                    />
                    <TextInput
                        errorMessage={errors.inviteAttendees?.attendees?.[index]?.contactInfo?.email?.message}
                        topLeftLabel="Email:"
                        placeholder="dave@email.com"
                        inputProps={register(`inviteAttendees.attendees.${index}.contactInfo.email`)}
                    />
                    <TextInput
                        errorMessage={errors.inviteAttendees?.attendees?.[index]?.contactInfo?.email?.message}
                        topLeftLabel="Phone:"
                        placeholder="555-123-4567"
                        inputProps={register(`inviteAttendees.attendees.${index}.contactInfo.phone`)}
                    />
                </div>
            ))}
            <button
                type="button"
                className={clsx("btn btn-ghost btn-accent w-full h-96")}
                onClick={() => append({ name: "", contactInfo: { email: '', phone: ''} })}
            >
                + Invite another attendee
            </button>
        </div>
    );
}

export default InviteAttendeesForm;