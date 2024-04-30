import React, { Suspense } from 'react';
import RootLayout from './layout';
import { NavContent } from './components/NavContent';
import { Footer } from './components/Footer';


const IndexPage = (): JSX.Element => {
  return (
    <div className={"flex w-full h-full justify-center items-start border border-red-600"}>
      {/* Nav tabs and current tab content */}
      <NavContent />
      {/* Footer */}
      <Footer />
    </div>
  );
}

IndexPage.getLayout = (page: JSX.Element) => <RootLayout><Suspense fallback={<div>Loading...</div>}>{page}</Suspense></RootLayout>

export default IndexPage;
