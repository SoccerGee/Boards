import type { NextPage } from 'next';
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react';

import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from '@mui/material/styles';

import '../styles/globals.css'

import theme from '../components/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/Header';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header text="Boardz" />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
};