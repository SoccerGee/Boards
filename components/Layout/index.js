import { UserProvider } from '@auth0/nextjs-auth0';
import Header from '../Header';

export default function Layout({ children }) {
  return (
    <UserProvider>
      <>
        <Header text="Boardz" />
        <main>{children}</main>
        <footer></footer>
      </>
    </UserProvider>
  );
};
