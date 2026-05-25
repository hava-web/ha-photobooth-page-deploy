import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { StoresPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const Stores: PageWithLayout & NextPage = () => <StoresPage />;

Stores.renderLayout = renderMarketingLayout;

export default Stores;
