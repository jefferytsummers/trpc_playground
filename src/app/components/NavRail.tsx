import { TabName } from '../types';

const tabNames: TabName[] = ['About', 'Get Started', 'Login', 'Pricing'];

const NavTab = ({ label, setCurrentTab }: { label: TabName, setCurrentTab: (tabName: TabName) => void }): JSX.Element => {
    return (
        <>
            <input type="radio" name="nav_tabs" role="tab" className="tab" aria-label={label} onClick={() => setCurrentTab(label)} />
        </>
    )
}

export const NavRail = ({ setCurrentTab }: { setCurrentTab: (tabName: TabName) => void }): JSX.Element => {
    return (
        <div role="tablist" className="mx-auto tabs tabs-bordered tabs-lg">
            {tabNames.map((tabName) => (<NavTab label={tabName} setCurrentTab={setCurrentTab}/>))}
        </div>
    )
}