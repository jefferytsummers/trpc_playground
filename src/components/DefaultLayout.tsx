import Head from 'next/head';
import type { ReactNode } from 'react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Save the Date</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-neutral">{children}</main>
    </>
  );
};