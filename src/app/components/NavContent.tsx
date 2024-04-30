import clsx from 'clsx';
import { TabName } from '../types';
import { About } from './About';

export const NavContent = ({ currentTab }: { currentTab: TabName }): JSX.Element => {
    return (
        <div className={clsx('flex h-full my-4 justify-center items-center')}>
            {currentTab === 'About' && (
                <About />
            )}
            {currentTab === 'Get Started' && (
                <div>{currentTab}</div>
            )}
            {currentTab === 'Login' && (
                <div>{currentTab}</div>
            )}
            {currentTab === 'Pricing' && (
                <div>{currentTab}</div>
            )}
        </div>
    )
}