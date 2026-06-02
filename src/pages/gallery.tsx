import React from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { listGalleryAlbums } from 'api/gallery/gallery.api';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import {
  GalleryPage,
  type GalleryPageProps,
} from 'containers/marketing/GalleryPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';

const Gallery: PageWithLayout & NextPage<GalleryPageProps> = ({ albums }) => (
  <>
    <PageSeo path="/gallery" />
    <GalleryPage albums={albums} />
  </>
);

export const getServerSideProps: GetServerSideProps<
  GalleryPageProps
> = async () => ({
  props: {
    albums: await listGalleryAlbums(),
  },
});

Gallery.renderLayout = renderMarketingLayout;

export default Gallery;
