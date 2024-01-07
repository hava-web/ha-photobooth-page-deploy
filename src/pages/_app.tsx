import React, { useEffect } from 'react';
import Head from 'next/head';
import { NextComponentType } from 'next';
import { NextPageContext } from 'next/types';
import { ComponentStatic, PageWithLayout } from 'models/common.model';
import type { AppContext, AppProps } from 'next/app';
import { useTranslation } from 'react-i18next';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store';
import StoreProvider from 'store/StoreProvider';
import { compose } from '@reduxjs/toolkit';
import { makeStore } from 'store/store-hooks';
import 'swiper/css';
import './index.css';
import './download/download.css';

function MyApp({ Component, pageProps }: AppProps) {
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language || 'vi';
  }, [language]);

  const renderApp = () => {
    const C = Component as NextComponentType<NextPageContext, any> &
      ComponentStatic &
      PageWithLayout;
    const { renderLayout } = C;
    if (renderLayout) {
      return renderLayout({ children: <C {...pageProps} /> });
    }
    return <C {...pageProps} />;
  };

  return (
    <StoreProvider>
      <Head>
        <title>Fun studio</title>
        <meta property="og:title" content="Fun Studio" />
        <meta
          property="og:description"
          content="Studio tự chụp ảnh phong cách Hàn Quốc"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/og_fun_studio_image.png`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
      </Head>
      <PersistGate loading={null} persistor={persistor}>
        {renderApp}
      </PersistGate>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async (props: AppContext) => {
  const { Component, ctx } = props;

  return {
    namesRequired: ['common'],
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  };
};

const enhancedApp = compose(
  withRedux(makeStore),
  // withReduxSaga,
);

export default enhancedApp(MyApp);
