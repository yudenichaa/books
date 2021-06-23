import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/normalize.css';
import '../styles/fonts.css';
import '../styles/global.scss';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
