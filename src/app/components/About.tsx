import clsx from 'clsx';
import { Calendar } from './Calendar';
import { AddEventForm } from './form/AddEventsForm';

export const About = (): JSX.Element => {
    return (
        <div className="hero">
            <div className="mx-auto flex hero-content text-center">
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                    <p className={clsx('text-primary text-2xl sm:text-5xl')}>save the date</p>
                    <p className={clsx('text-neutral-content text-xl sm:text-2xl')}>try it out by creating a bespoke itinerary for your event!</p>
                    <div className={clsx('mx-auto flex flex-col sm:flex-row gap-4 items-center')}>
                        <Calendar />
                        <div className={clsx('flex w-64 h-72 justify-center items-center text-neutral-content')}>
                            <div className={clsx('text-2xl')}>select a date for your itinerary</div>
                        </div>
                    </div>
                    <div className={clsx('mx-auto flex flex-col sm:flex-row gap-4 items-center')}>
                        <div className={clsx('flex w-64 h-72 justify-center items-center text-neutral-content')}>
                            <div className={clsx('flex flex-col gap-4 text-2xl')}>
                                <p>{'lets get some more details...'}</p>
                                <p>{'feel free to link some documents or a video!'}</p>
                                <div className={clsx('')}>TODO: logos</div>
                            </div>
                        </div>
                        <AddEventForm />
                    </div>
                    <div className={clsx('mx-auto flex flex-col sm:flex-row gap-4 items-center')}>
                        <AddEventForm />
                        <div className={clsx('flex w-64 h-72 justify-center items-center text-neutral-content')}>
                            <div className={clsx('flex flex-col gap-4 text-2xl')}>
                                <p>{'invite others!'}</p>
                            </div>
                        </div>
                    </div>
                    <button className="btn w-56 h-20 text-2xl text-primary-content btn-primary">Try it out!</button>
                </div>
            </div>
        </div>
    )
}