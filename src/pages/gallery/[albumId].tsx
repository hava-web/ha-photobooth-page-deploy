import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { getGalleryAlbumDetail } from 'api/gallery/gallery.api';
import { renderMarketingLayout } from 'containers/layout/app/AppLayout';
import {
  GalleryAlbumDetailPage,
  type GalleryAlbumDetailPageProps,
} from 'containers/marketing/GalleryPages';
import { PageWithLayout } from 'models/common.model';
import { PageSeo } from 'components/seo/PageSeo';
import { buildAbsoluteUrl } from 'seo/seo.config';

const GalleryAlbum: PageWithLayout & NextPage<GalleryAlbumDetailPageProps> = ({
  albumDetail,
}) => {
  const { album } = albumDetail;
  const title = `${album.title} | Gallery Fun Studio`;
  const description =
    album.description ||
    `Xem album ${album.title} tại gallery photobooth Fun Studio.`;

  return (
    <>
      <PageSeo
        path={`/gallery/${album.id}`}
        breadcrumb={false}
        overrides={{
          title,
          description,
          openGraph: {
            title,
            description,
            images: [
              {
                url: buildAbsoluteUrl(album.coverImage),
                alt: album.title,
              },
            ],
          },
        }}
      />
      <GalleryAlbumDetailPage albumDetail={albumDetail} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  GalleryAlbumDetailPageProps
> = async ({ params }) => {
  const albumIdParam = params?.albumId;
  const albumId = Array.isArray(albumIdParam) ? albumIdParam[0] : albumIdParam;

  if (!albumId) {
    return { notFound: true };
  }

  const albumDetail = await getGalleryAlbumDetail(albumId);

  if (!albumDetail) {
    return { notFound: true };
  }

  return {
    props: {
      albumDetail,
    },
  };
};

GalleryAlbum.renderLayout = renderMarketingLayout;

export default GalleryAlbum;
