'use client';
import clsx from 'clsx';
import { useState } from "react";
import { NavContent } from "./NavContent";
import { NavRail } from "./NavRail";
import { TabName } from "../types";

export const Nav =(): JSX.Element => {
    const [currentTab, setCurrentTab] = useState<TabName>('About');
    return (
        <div className={clsx('w-full')}>
            <NavRail currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <NavContent currentTab={currentTab} />
        </div>
    )
}