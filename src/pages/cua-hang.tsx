import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { StoresPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';

const Stores: PageWithLayout & NextPage = () => (
  <>
    <PageSeo path="/cua-hang" />
    <StoresPage />
  </>
);

Stores.renderLayout = renderMarketingLayout;

export default Stores;
