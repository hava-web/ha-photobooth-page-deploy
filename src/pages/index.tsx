import React from 'react';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import BannerSlider from 'containers/app/home/BannerSlider';
import Introduction from 'containers/app/home/Introduction';
import EnsureOpportunity from 'containers/app/home/EnsureOpportunity';
import Services from 'containers/app/home/Services';
import CustomerTalkAboutUs from 'containers/app/home/CustomerTalkAboutUs';
// import CooperationProcess from 'containers/app/home/CooperationProcess';
import FunStores from 'containers/app/home/FunStores';
import StrengthOfFun from 'containers/app/home/StrengthOfFun';
import AboutPhotoBooth from 'containers/app/home/AboutPhotoBooth';
import EventGallery from 'containers/app/home/EventGallery';
import { PageWithLayout } from 'models/common.model';
import { renderMainLayout } from 'containers/layout/app/AppLayout';
import { funBanners, funStores } from 'store/static-data/static-data.data';
import FunProducts from 'containers/app/home/FunProducts';

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
  <section className="font-Montserrat">
    <BannerSlider banners={banners} />
    <AboutPhotoBooth />
    <Introduction />
    <EnsureOpportunity />
    <StrengthOfFun />
    <Services />
    <CustomerTalkAboutUs />
    {/* <CooperationProcess /> */}
    <EventGallery />
    <FunProducts />
    <FunStores stores={stores} />
  </section>
);

Home.renderLayout = (props) => renderMainLayout({ ...props, isHome: true });

export default Home;
