import clsx from 'clsx';
import { InviteAttendeesForm } from './InviteAttendeesForm';

export const InviteAttendeesStep = (): JSX.Element => {
    return (
            <div className={clsx('mx-auto flex flex-col sm:flex-row gap-4 items-center')}>
                <InviteAttendeesForm />
                <div className={clsx('flex w-64 h-72 justify-center items-center text-neutral-content')}>
                    <div className={clsx('flex flex-col gap-4 text-2xl')}>
                        <p>{'invite others!'}</p>
                    </div>
                </div>
            </div>
    )
}