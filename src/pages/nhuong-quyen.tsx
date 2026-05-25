import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { FranchisePage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const Franchise: PageWithLayout & NextPage = () => <FranchisePage />;

Franchise.renderLayout = renderMarketingLayout;

export default Franchise;
