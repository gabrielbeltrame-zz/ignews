import {AppProps} from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextSessionProvider } from "next-auth/react"

import '../styles/global.scss';

function MyApp({Component, pageProps}: AppProps) {
    return ( 
    <NextSessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
    </NextSessionProvider>
    )
}

export default MyApp