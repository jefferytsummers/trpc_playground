'use client';
import clsx from 'clsx';
import { CalendarBlock } from './CalendarBlock';
import { CalendarMonth } from './CalendarMonth';
import { useState } from 'react';

export const Calendar = (): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<number | undefined>(undefined)
    const dates = [8, 9, 10, 11, 12, 13, 14];
    return (
        <div className={clsx('border justify-center items-center w-80 h-64 bg-base-100 rounded-lg')}>
                <CalendarMonth />
                <div className={clsx('h-48 grid grid-cols-4 grid-rows-2 mx-2 mt-2')}>
                    {dates.map((date) => (<CalendarBlock setSelectedDate={setSelectedDate} selected={date === selectedDate}className={'sm:text-3xl'} value={date.toString()} />))}
                    <CalendarBlock className={'sm:text-3xl hover:bg-accent hover:text-accent-content'} value={'»'} />
                </div>
        </div>
    )
}