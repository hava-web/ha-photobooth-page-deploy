import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { ServicesPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';

const Services: PageWithLayout & NextPage = () => (
  <>
    <PageSeo path="/dich-vu" />
    <ServicesPage />
  </>
);

Services.renderLayout = renderMarketingLayout;

export default Services;
