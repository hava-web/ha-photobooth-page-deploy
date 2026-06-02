import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { FranchiseRegisterPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';

const FranchiseRegister: PageWithLayout & NextPage = () => (
  <>
    <PageSeo path="/dang-ky-nhuong-quyen" />
    <FranchiseRegisterPage />
  </>
);

FranchiseRegister.renderLayout = renderMarketingLayout;

export default FranchiseRegister;
