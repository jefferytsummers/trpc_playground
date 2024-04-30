import type { AppProps } from 'next/app';

import { trpc } from '../utils/trpc';
import React from 'react';
import { NextPage } from 'next';
import "./styles.css"

type CustomAppProps = AppProps & {
  Component: NextPage & { getLayout?: (page: React.ReactElement) => React.ReactNode };
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default trpc.withTRPC(MyApp);