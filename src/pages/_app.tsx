import type { AppProps } from 'next/app';
import './index.css';
import './download/download.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fun studio</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
