import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app';
import { Session } from 'next-auth';


function App({ 
  Component, 
  pageProps: {session, ...pageProps}, 
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
