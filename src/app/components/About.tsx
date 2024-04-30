import clsx from 'clsx';
import { Phone } from './Phone';

export const About = (): JSX.Element => {
    return (
        <div className="hero">
            <div className="hero-content text-center">
                <div className="flex flex-col gap-8 justify-center items-center w-full">
                    <h1 className="text-5xl font-bold">Save the date!</h1>
                    <div className={clsx('flex gap-4 items-center')}>
                        <Phone />
                        <div className={clsx('flex w-72 h-72 justify-center items-center text-neutral-content')}>
                            <div className={clsx('')}>Plan your perfect day with DayTripper! This intuitive app lets you pick a date and effortlessly craft a personalized itinerary for an unforgettable adventure!</div>
                        </div>
                    </div>
                    <div className={clsx('flex gap-4 items-center')}>
                        <div className={clsx('flex w-72 h-72 justify-center items-center text-neutral-content')}>
                            <div className={clsx('')}>Plan your perfect day with DayTripper - the intuitive app that lets you pick a date and effortlessly craft a personalized itinerary for an unforgettable adventure!</div>
                        </div>
                        <Phone />
                    </div>
                    <button className="btn w-56 h-20 text-2xl text-primary-content btn-primary">Try it out!</button>
                </div>
            </div>
        </div>
    )
}