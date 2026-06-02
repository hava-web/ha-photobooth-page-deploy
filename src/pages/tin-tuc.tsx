import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { listNews } from 'api/news/news.api';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import {
  NewsPage,
  type NewsPageProps,
} from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';

const News: PageWithLayout & NextPage<NewsPageProps> = ({ newsCards = [] }) => (
  <>
    <PageSeo path="/tin-tuc" />
    <NewsPage newsCards={newsCards} />
  </>
);

export const getServerSideProps: GetServerSideProps<
  NewsPageProps
> = async () => ({
  props: {
    newsCards: await listNews(),
  },
});

News.renderLayout = renderMarketingLayout;

export default News;
