import clsx from 'clsx';
import { TabName } from '../../types';
import { About } from '../about/About';

export const NavContent = ({ currentTab }: { currentTab: TabName }): JSX.Element => {
    return (
        <div className={clsx('flex my-4 justify-center items-center')}>
            {currentTab === 'about' && (
                <About />
            )}
            {currentTab === 'login' && (
                <div>{currentTab}</div>
            )}
            {currentTab === 'pricing' && (
                <div>{currentTab}</div>
            )}
        </div>
    )
}