import clsx from "clsx";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import ItineraryCalendar from "@/components/app/ItineraryCalendar";

const SaveTheDate = (): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);
  const authenticated = Boolean(user !== null && user !== undefined);
  return (
    <div
      className={
        "flex flex-col min-w-screen justify-center items-center h-svh overflow-y-auto"
      }
    >
      {loading && (
        <span className={clsx("loading loading-spinner text-primary")} />
      )}
      {authenticated && !loading && (
        <div className={clsx("justify-between flex h-full w-screen")}>
          <div className={clsx("ring-primary ring w-12")}>
            {/* Tab component for navigation */}
          </div>
          <ItineraryCalendar />
          <div className={clsx("ring-primary ring drop-shadow-lg w-12")}>
            {/* Tabs for page options */}
          </div>
        </div>
      )}
      {!authenticated && !loading && (
        <button className={clsx("btn btn-link")}>
          Not authorized to view this page, please click to register/sign in.
        </button>
      )}
      {}
    </div>
  );
};

export default SaveTheDate;
