import React, { useEffect } from 'react';
import Head from 'next/head';
import { DefaultSeo, OrganizationJsonLd } from 'next-seo';
import { NextComponentType } from 'next';
import { NextPageContext } from 'next/types';
import { ComponentStatic, PageWithLayout } from 'models/common.model';
import type { AppContext, AppProps } from 'next/app';
import { useTranslation } from 'react-i18next';
import { createWrapper } from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor } from 'store';
import { makeStore } from 'store/store-hooks';
import { SALE_PHONE_NUMBER } from 'constants/common.const';
import {
  SITE_NAME,
  buildAbsoluteUrl,
  getDefaultSeo,
  getSiteUrl,
} from 'seo/seo.config';
import 'swiper/css';
import './index.css';
import './download/download.css';

const wrapper = createWrapper(makeStore);

function MyApp(props: AppProps) {
  const { store, props: wrappedProps } = wrapper.useWrappedStore(props);
  const { Component, pageProps } = wrappedProps;
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
    <Provider store={store}>
      <DefaultSeo {...getDefaultSeo()} />
      <OrganizationJsonLd
        type="Organization"
        id={`${getSiteUrl()}/#organization`}
        name={SITE_NAME}
        legalName="Công ty TNHH Công nghệ Kết Nối Ý Nghĩa"
        url={getSiteUrl()}
        logo={buildAbsoluteUrl('/images/fun_studio_logo.png')}
        address={{
          streetAddress: 'Số 75 ngõ 381 Nguyễn Khang',
          addressLocality: 'Cầu Giấy',
          addressRegion: 'Hà Nội',
          postalCode: '100000',
          addressCountry: 'VN',
        }}
        contactPoint={[
          {
            contactType: 'customer support',
            telephone: SALE_PHONE_NUMBER,
            email: 'Sales@funstudio.com.vn',
            areaServed: 'VN',
            availableLanguage: ['vi', 'en'],
          },
        ]}
        sameAs={[
          'https://www.facebook.com/funatfunstudio',
          'https://www.facebook.com/funstudionq',
          'https://www.instagram.com/funstudio____',
          'https://www.tiktok.com/@funstudio_',
          'https://www.youtube.com/@funstudio_68',
        ]}
      />
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <PersistGate loading={null} persistor={persistor}>
        {renderApp}
      </PersistGate>
    </Provider>
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

export default MyApp;
