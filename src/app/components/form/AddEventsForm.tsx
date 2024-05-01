'use client';
import clsx from 'clsx';
import { useForm, SubmitHandler } from "react-hook-form"
import { TextInput } from './TextInput';
import { TimeInput } from './DateInput';
import { LinkInput } from './LinkInput';
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodType } from 'zod';

interface IAddEventFormInput {
    name: string;
    start: string;
    end: string;
}

const addEventFormSchema: ZodType<IAddEventFormInput> = z.object({
    name: z.string({ required_error: 'Please provide a name for the event'}).min(2),
    start: z.string({ required_error: 'Please provide a starting time for the event'}),
    end: z.string({ required_error: 'Please provide an ending time for the event'}),
})

export const AddEventForm = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm<IAddEventFormInput>({
        resolver: zodResolver(addEventFormSchema),
        defaultValues: {
            name: undefined,
            start: undefined,
            end: undefined,
        }
    });
    console.log('errors')
    console.log(errors.name)
    console.log(errors.start)
    console.log(errors.end)
    const onSubmit: SubmitHandler<IAddEventFormInput> = (data) => {
        console.log('happening?')
        console.log(data)
    };

    return (
        <div className={clsx('mx-auto flex justify-center items-center rounded-lg bg-base-100 px-6 py-4')}>
            <form className={clsx('max-h-lvh ')} onSubmit={handleSubmit(onSubmit)}>
                <TextInput errorMessage={errors.name?.message} placeholder="Dave's birthday!" topLeftLabel='Event Name:' inputProps={register('name', { required: true })} />
                <div className={clsx('flex justify-center items-center gap-4')}>
                    {/* barcode */}
                    <div className={clsx('flex bg-neutral h-44 w-44 rounded-lg justify-center items-center')}>
                        <div>barcode</div>
                    </div>
                    <div className={clsx('flex flex-col')}>
                        <TimeInput topLeftLabel='Start:' inputProps={register('start', { required: true })} />
                        <TimeInput topLeftLabel='End:' inputProps={register('end', { required: true })} />
                    </div>
                </div>
                <LinkInput placeholder='google/facebook/youtube link!' topLeftLabel='Anything people should know?' />
                <button type="submit" className={clsx('btn btn-primary btn-md')}>Add event!</button>
            </form>
        </div>
    )
}