import { UserProvider } from '@auth0/nextjs-auth0';
import { ThemeProvider } from '@mui/material/styles';

import '../styles/globals.css'
import theme from '../components/theme';
import CssBaseline from '@mui/material/CssBaseline';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp
