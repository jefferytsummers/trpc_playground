import React, { Suspense, useState } from "react";
import RootLayout from "./layout";
import { Nav } from "./components/nav/Nav";

const IndexPage = (): JSX.Element => {
  return (
    <div className={"flex w-full justify-start min-h-screen overflow-y-auto"}>
      {/* Nav tabs and current tab content */}
      <Nav />
      {/* Footer */}
    </div>
  );
};

IndexPage.getLayout = (page: JSX.Element) => (
  <RootLayout>
    <Suspense fallback={<div>Loading...</div>}>{page}</Suspense>
  </RootLayout>
);

export default IndexPage;
