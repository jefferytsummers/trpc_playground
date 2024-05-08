import clsx from 'clsx';
import React from "react";
import ItineraryCalendar from "./components/ItineraryCalendar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase'


const SaveTheDate = (): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);
  const authenticated = Boolean(user !== null && user !== undefined);
  return (
    <div
      className={
        "flex flex-col min-w-screen justify-center items-center min-h-screen border overflow-y-auto"
      }
    >
      {loading && (<span className={clsx('loading loading-spinner text-primary')}/>)}
      {(authenticated && !loading) && (<ItineraryCalendar />)}
      {(!authenticated && !loading) && (<button className={clsx('btn btn-link')}>Not authorized to view this page, please click to register/sign in.</button>)}
      {}
    </div>
  );
};

export default SaveTheDate;
