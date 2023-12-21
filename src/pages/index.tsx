import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import BannerSlider from 'containers/app/home/BannerSlider';
import Introduction from 'containers/app/home/Introduction';
import EnsureOpportunity from 'containers/app/home/EnsureOpportunity';
import Services from 'containers/app/home/Services';
import CustomerTalkAboutUs from 'containers/app/home/CustomerTalkAboutUs';
import CooperationProcess from 'containers/app/home/CooperationProcess';
import FunStores from 'containers/app/home/FunStores';
import { PageWithLayout } from 'models/common.model';
import { renderMainLayout } from 'containers/layout/app/AppLayout';
import { funBanners, funStores } from 'store/static-data/static-data.data';

export const getStaticProps: GetStaticProps = () => ({
  props: {
    banners: funBanners,
    stores: funStores,
  },
});

const Home: PageWithLayout &
  NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  banners,
  stores,
}) => (
  <>
    <BannerSlider banners={banners} />
    <Introduction />
    <EnsureOpportunity />
    <Services />
    <CustomerTalkAboutUs />
    <CooperationProcess />
    <FunStores stores={stores} />
  </>
);

Home.renderLayout = renderMainLayout;

export default Home;
