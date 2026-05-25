import React from 'react';
import type { NextPage } from 'next';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import { GalleryPage } from 'containers/marketing/MarketingPages';
import { PageWithLayout } from 'models/common.model';

const Gallery: PageWithLayout & NextPage = () => <GalleryPage />;

Gallery.renderLayout = renderMarketingLayout;

export default Gallery;
