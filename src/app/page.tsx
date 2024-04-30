import React, { Suspense, useState } from 'react';
import RootLayout from './layout';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';

const IndexPage = (): JSX.Element => {
  return (
    <div className={"flex flex-col w-full h-full border border-red-600 justify-start items-center"}>
      {/* Nav tabs and current tab content */}
      <Nav />
      {/* Footer */}
      <Footer />
    </div>
  );
}

IndexPage.getLayout = (page: JSX.Element) => <RootLayout><Suspense fallback={<div>Loading...</div>}>{page}</Suspense></RootLayout>

export default IndexPage;
