import type { NextPage } from 'next';
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react';

import { ThemeProvider } from '@mui/material/styles';

import '../styles/globals.css'

import theme from '../components/theme';
import CssBaseline from '@mui/material/CssBaseline';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};