import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { FranchisePage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';

const Franchise: PageWithLayout & NextPage = () => (
  <>
    <PageSeo path="/nhuong-quyen" />
    <FranchisePage />
  </>
);

Franchise.renderLayout = renderMarketingLayout;

export default Franchise;
