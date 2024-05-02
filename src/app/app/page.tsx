import React, { Suspense, useState } from "react";
import RootLayout from "../layout";

const SaveTheDate = (): JSX.Element => {
  return (
    <div className={"flex flex-col w-full justify-center items-center min-h-screen overflow-y-auto"}>
      <div>
        SAVE THE DATE
      </div>
    </div>
  );
};

SaveTheDate.getLayout = (page: JSX.Element) => (
  <RootLayout>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </RootLayout>
);

export default SaveTheDate;
