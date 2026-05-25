import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { FranchiseRegisterPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const FranchiseRegister: PageWithLayout & NextPage = () => (
  <FranchiseRegisterPage />
);

FranchiseRegister.renderLayout = renderMarketingLayout;

export default FranchiseRegister;
