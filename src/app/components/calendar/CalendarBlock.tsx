'use client';
import clsx from 'clsx';

export const CalendarBlock = ({ className = '', selected = false, setSelectedDate, value }: { className?: string, setSelectedDate?: (date: number) => void, selected?: boolean, value: string }): JSX.Element => {

    return (
        <div
            className={clsx(
                `flex justify-center items-center text-lg sm:text-xl hover:cursor-pointer hover:bg-primary hover:text-primary-content rounded-lg ${className}`,
                selected && 'bg-primary text-primary-content'
            )}
            onClick={() => setSelectedDate?.(+value)}
        >
            <div>{value}</div>
        </div>
    )
}