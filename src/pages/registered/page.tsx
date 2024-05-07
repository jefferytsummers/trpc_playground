import { DefaultLayout } from "@/components/DefaultLayout";
import React, { Suspense } from "react";

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
  <DefaultLayout>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </DefaultLayout>
);

export default Registered;
