import clsx from 'clsx';
import { Calendar } from './Calendar';

export const About = (): JSX.Element => {
    return (
        <div className="hero">
            <div className="hero-content text-center">
                <div className="flex flex-col gap-8 justify-center items-center w-full">
                    <h1 className=" text-2xl sm:text-5xl font-bold">Save the date!</h1>
                    <div className={clsx('flex flex-col sm:flex-row gap-4 items-center')}>
                        <Calendar />
                        <div className={clsx('flex w-72 h-72justify-center items-center text-neutral-content')}>
                            <div className={clsx('')}>Select a date, create a customized plan, and embark on a journey you'll never forget. With Save the Date, crafting your ideal day has never been easier!</div>
                        </div>
                    </div>
                    <div className={clsx('flex flex-col sm:flex-row gap-4 items-center')}>
                        <Calendar />
                        <div className={clsx('flex w-72 h-72 justify-center items-center text-neutral-content')}>
                            <div className={clsx('')}>Save the Date - the innovative itinerary app that lets you select a date, create a personalized plan, and seamlessly integrate content from Instagram, YouTube, Facebook, and Google Forms. Craft a dynamic, multimedia itinerary that brings your day to life and ensures an unforgettable adventure!</div>
                        </div>
                    </div>
                    <button className="btn w-56 h-20 text-2xl text-primary-content btn-primary">Try it out!</button>
                </div>
            </div>
        </div>
    )
}