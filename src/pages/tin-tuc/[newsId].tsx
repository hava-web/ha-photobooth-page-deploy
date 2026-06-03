import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getNewsDetail } from 'api/news/news.api';
import { PageSeo } from 'components/seo/PageSeo';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import {
  NewsDetailPage,
  type NewsDetailPageProps,
} from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const NewsDetail: PageWithLayout & NextPage<NewsDetailPageProps> = ({
  newsDetail,
}) => (
  <>
    <PageSeo
      path="/tin-tuc"
      overrides={{
        title: `${newsDetail.title} | Fun Studio`,
        description: newsDetail.text,
        openGraph: {
          title: newsDetail.title,
          description: newsDetail.text,
          images: [{ url: newsDetail.image }],
        },
      }}
    />
    <NewsDetailPage newsDetail={newsDetail} />
  </>
);

export const getServerSideProps: GetServerSideProps<
  NewsDetailPageProps
> = async ({ params }) => {
  const newsIdParam = params?.newsId;
  const newsId = Array.isArray(newsIdParam) ? newsIdParam[0] : newsIdParam;

  if (!newsId) {
    return { notFound: true };
  }

  const newsDetail = await getNewsDetail(newsId);

  if (!newsDetail) {
    return { notFound: true };
  }

  return {
    props: {
      newsDetail,
    },
  };
};

NewsDetail.renderLayout = renderMarketingLayout;

export default NewsDetail;
