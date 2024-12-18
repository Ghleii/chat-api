import { SessionProvider } from "next-auth/react";
import Head from 'next/head'
import '@/styles/globals.css'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Head>
//         <meta
//           name="viewport"
//           content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no"
//         />
//       </Head>
//       <Component {...pageProps} />
//     </>
//   )
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;