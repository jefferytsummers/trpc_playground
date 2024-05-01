import clsx from 'clsx';
import { Calendar } from '../calendar/Calendar';

export const NameAndDateStep = (): JSX.Element => {
    return (
        <>
        <p className={clsx('text-neutral-content text-xl sm:text-2xl')}>try it out by creating a bespoke itinerary for your event!</p>
                        <div className={clsx('mx-auto flex flex-col sm:flex-row gap-4 items-center')}>
                            <Calendar />
                            <div className={clsx('flex w-64 h-72 justify-center items-center text-neutral-content')}>
                                <div className={clsx('text-2xl')}>select a date for your itinerary</div>
                            </div>
                        </div>
        </>
    )
}