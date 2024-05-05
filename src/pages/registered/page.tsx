import React, { Suspense, useState } from "react";
import RootLayout from "../layout";

const Registered = (): JSX.Element => {
  return (
    <div
      className={
        "flex flex-col w-full justify-center items-center min-h-screen overflow-y-auto"
      }
    >
      <div>registration created successfully!</div>
      <div>check your email for a verification link!</div>
    </div>
  );
};

Registered.getLayout = (page: JSX.Element) => (
  <RootLayout>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </RootLayout>
);

export default Registered;
