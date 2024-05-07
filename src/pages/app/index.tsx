import React, { Suspense } from "react";
import { ItineraryCalendar } from "./components/ItineraryCalendar";

const SaveTheDate = (): JSX.Element => {
  return (
    <div
      className={
        "flex flex-col min-w-screen justify-center items-center min-h-screen border overflow-y-auto"
      }
    >
      <ItineraryCalendar />
    </div>
  );
};

export default SaveTheDate;
