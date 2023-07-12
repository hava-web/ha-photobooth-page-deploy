import type { AppProps } from 'next/app';
import './index.css';
import './download/download.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
