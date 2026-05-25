import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { NewsPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const News: PageWithLayout & NextPage = () => <NewsPage />;

News.renderLayout = renderMarketingLayout;

export default News;
