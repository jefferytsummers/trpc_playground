import clsx from 'clsx';
import { TabName } from '../types';

export const NavContent = ({ currentTab }: { currentTab: TabName }): JSX.Element => {
    return (
        <div className={clsx('flex h-full my-4 border justify-center items-center')}>
            <div>{currentTab}</div>
        </div>
    )
}