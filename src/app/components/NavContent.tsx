import clsx from 'clsx';

const tabNames = ['About', 'Get Started', 'Login', 'Pricing'];

const NavTab = ({label}: { label: string }): JSX.Element => {
    return (
        <>
            <input type="radio" name="nav_tabs" role="tab" className="tab" aria-label={label} />
            <div role="tabpanel" className="tab-content p-10">{`${label} content`}</div>
        </>
    )
}

export const NavContent = (): JSX.Element => {

    return (
        <div role="tablist" className="tabs tabs-bordered">
            {tabNames.map((tabName) => (<NavTab label={tabName}/>))}
        </div>
    )
}