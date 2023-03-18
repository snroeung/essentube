import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
}

function App({ 
  Component, 
  pageProps, 
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(
        <>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </>
      )
    }
    </SessionProvider>
  )
}

export default App
