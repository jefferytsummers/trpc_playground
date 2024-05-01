import { TabName } from '../types';

const tabNames: TabName[] = ['About', 'Login', 'Pricing'];

const NavTab = ({ checked, label, setCurrentTab }: { checked: boolean, label: TabName, setCurrentTab: (tabName: TabName) => void }): JSX.Element => {
    return (
        <>
            <input checked={checked} type="radio" name="nav_tabs" role="tab" className="tab" aria-label={label} onClick={() => setCurrentTab(label)} />
        </>
    )
}

export const NavRail = ({ currentTab, setCurrentTab }: { currentTab: TabName, setCurrentTab: (tabName: TabName) => void }): JSX.Element => {
    return (
        <div role="tablist" className="sm:w-1/2 mx-auto my-4 tabs tabs-bordered sm:tabs-lg">
            {tabNames.map((tabName) => (<NavTab label={tabName} setCurrentTab={setCurrentTab} checked={tabName === currentTab}/>))}
        </div>
    )
}