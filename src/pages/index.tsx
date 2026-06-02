import React from 'react';
import type { NextPage } from 'next';
import { PageWithLayout } from 'models/common.model';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { MarketingHomePage } from 'containers/marketing/MarketingPages';
import { PageSeo } from 'components/seo/PageSeo';

const Home: PageWithLayout & NextPage = () => (
  <>
    <PageSeo path="/" breadcrumb={false} />
    <MarketingHomePage />
  </>
);

Home.renderLayout = renderMarketingLayout;

export default Home;
