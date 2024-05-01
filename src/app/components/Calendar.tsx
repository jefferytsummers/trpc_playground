'use client';
import clsx from 'clsx';
import { CalendarBlock } from './CalendarBlock';
import { CalendarMonth } from './CalendarMonth';
import { useState } from 'react';

export const Calendar = (): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<number | undefined>(undefined)
    const dates = [23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3];
    return (
        <div className={clsx('justify-center items-center w-80 h-64 bg-base-100 rounded-top-lg')}>
                <CalendarMonth />
                <div className={clsx('h-48 grid grid-cols-4 grid-rows-3 mx-2 mt-2 gap-2')}>
                    {dates.map((date) => (<CalendarBlock key={date} setSelectedDate={setSelectedDate} selected={date === selectedDate}className={'sm:text-2xl'} value={date.toString()} />))}
                    <CalendarBlock className={'text-3xl sm:text-5xl hover:bg-accent hover:text-accent-content'} value={'»'} />
                </div>
        </div>
    )
}