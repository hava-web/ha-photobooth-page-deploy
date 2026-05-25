import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { ServicesPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const Services: PageWithLayout & NextPage = () => <ServicesPage />;

Services.renderLayout = renderMarketingLayout;

export default Services;
