import React, { useCallback, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import Image from 'components/image/Image';
import type {
  GalleryAlbumDetailModel,
  GalleryAlbumModel,
  GalleryPhotoModel,
} from 'models/gallery/gallery.model';
import { GALLERY_ALBUM_FALLBACK_IMAGE } from './data/galleryMockData';
import Carousel from './components/Carousel';
import FooterSpacer from './components/FooterSpacer';
import MarketingIconButton from './components/MarketingIconButton';
import Media from './components/Media';
import SectionTitle from './components/SectionTitle';
import SliderControls from './components/SliderControls';
import { CONTAINER_CLASS, GALLERY_PAGE_SIZE, PAGE_CLASS } from './constants';
import { useCarouselIndex } from './hooks/useCarouselIndex';
import { getPageCount, getPagedItems } from './utils/carousel';

export type GalleryPageProps = {
  albums: GalleryAlbumModel[];
};

export type GalleryAlbumDetailPageProps = {
  albumDetail: GalleryAlbumDetailModel;
};

function formatAlbumMeta(album: GalleryAlbumModel) {
  return [
    `${album.photoCount} ảnh`,
    album.videoCount === undefined ? null : `${album.videoCount} video`,
    album.viewCount === undefined ? null : `${album.viewCount} lượt xem`,
  ]
    .filter(Boolean)
    .join(' - ');
}

function GalleryAlbumCard({ album }: { album: GalleryAlbumModel }) {
  return (
    <NextLink
      href={`/gallery/${album.id}`}
      className="group flex h-full flex-col overflow-hidden border border-brand-line bg-white text-brand-text no-underline shadow-brand-hairline transition-transform duration-200 hover:-translate-y-1"
    >
      <Media
        src={album.coverImage || GALLERY_ALBUM_FALLBACK_IMAGE}
        alt={album.title}
        className="aspect-square bg-neutral-900"
        sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h2 className="mb-3 mt-0 text-marketing-card-heading font-extrabold uppercase text-brand-pink phone:text-xl">
          {album.title}
        </h2>
        <p className="mb-4 mt-0 text-brand-caption font-bold text-brand-muted">
          {formatAlbumMeta(album)}
        </p>
        {!!album.description && (
          <p className="m-0 text-base leading-snug text-brand-text phone:text-brand-caption">
            {album.description}
          </p>
        )}
      </div>
    </NextLink>
  );
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ albums }) => (
  <main className={PAGE_CLASS}>
    <section className="pb-8 pt-10 phone:py-12">
      <div className={CONTAINER_CLASS}>
        <SectionTitle as="h1" className="mb-12">
          Gallery
        </SectionTitle>
        {albums.length ? (
          <div className="grid grid-cols-4 gap-8 tablet:grid-cols-2 phone:grid-cols-1">
            {albums.map((album) => (
              <GalleryAlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <p className="m-0 text-center text-brand-body-lg text-brand-text">
            Chưa có album.
          </p>
        )}
      </div>
    </section>
    <FooterSpacer />
  </main>
);

export const GalleryAlbumDetailPage: React.FC<GalleryAlbumDetailPageProps> = ({
  albumDetail,
}) => {
  const { album, photos } = albumDetail;
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const galleryPointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const galleryPageCount = getPageCount(photos.length, GALLERY_PAGE_SIZE);
  const galleryCarousel = useCarouselIndex(galleryPageCount);
  const galleryPages = Array.from(
    { length: galleryPageCount },
    (_, page) => page,
  );
  const previewItem = previewIndex === null ? null : photos[previewIndex];

  const closePreview = useCallback(() => setPreviewIndex(null), []);

  const showPreviewPrevious = useCallback(() => {
    setPreviewIndex((current) =>
      current === null || !photos.length
        ? current
        : (current - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const showPreviewNext = useCallback(() => {
    setPreviewIndex((current) =>
      current === null || !photos.length
        ? current
        : (current + 1) % photos.length,
    );
  }, [photos.length]);

  useEffect(() => {
    if (previewIndex === null) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }

      if (event.key === 'ArrowLeft') {
        showPreviewPrevious();
      }

      if (event.key === 'ArrowRight') {
        showPreviewNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePreview, previewIndex, showPreviewNext, showPreviewPrevious]);

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-8 pt-10 phone:py-12">
        <div className="mx-auto w-full max-w-gallery-grid phone:w-marketing-container-mobile">
          <NextLink
            href="/gallery"
            className="mb-8 inline-flex min-h-11 items-center justify-center rounded-full border border-brand-pink px-6 text-base font-extrabold uppercase leading-none text-brand-pink no-underline transition-colors hover:bg-brand-pink hover:text-white"
          >
            Quay lại Gallery
          </NextLink>
          <SectionTitle as="h1" className="mb-4">
            {album.title}
          </SectionTitle>
          <p className="mb-10 mt-0 text-center text-brand-body text-brand-muted">
            {formatAlbumMeta(album)}
          </p>
          {photos.length ? (
            <>
              <Carousel
                items={galleryPages}
                position={galleryCarousel.position}
                getKey={(page) => String(page)}
                onDragSlide={(direction) =>
                  galleryCarousel.setSlide(galleryCarousel.current + direction)
                }
                renderItem={(page) => (
                  <div className="grid grid-cols-6 gap-3.5 tablet:grid-cols-4 phone:grid-cols-2">
                    {getPagedItems(photos, page, GALLERY_PAGE_SIZE).map(
                      (photo, pageItemIndex) => {
                        const itemIndex =
                          page * GALLERY_PAGE_SIZE + pageItemIndex;

                        return (
                          <GalleryPhotoCard
                            key={photo.id}
                            photo={photo}
                            itemIndex={itemIndex}
                            pointerStartRef={galleryPointerStartRef}
                            onOpenPreview={setPreviewIndex}
                          />
                        );
                      },
                    )}
                  </div>
                )}
              />
              <SliderControls
                count={galleryPageCount}
                current={galleryCarousel.current}
                onChange={galleryCarousel.setSlide}
              />
            </>
          ) : (
            <p className="m-0 text-center text-brand-body-lg text-brand-text">
              Album chưa có ảnh.
            </p>
          )}
        </div>
      </section>
      {!!previewItem && previewIndex !== null && (
        <GalleryPhotoPreview
          photo={previewItem}
          current={previewIndex}
          total={photos.length}
          onClose={closePreview}
          onPrevious={showPreviewPrevious}
          onNext={showPreviewNext}
        />
      )}
      <FooterSpacer />
    </main>
  );
};

type GalleryPhotoCardProps = {
  photo: GalleryPhotoModel;
  itemIndex: number;
  pointerStartRef: React.MutableRefObject<{ x: number; y: number } | null>;
  onOpenPreview: (index: number) => void;
};

function GalleryPhotoCard({
  photo,
  itemIndex,
  pointerStartRef,
  onOpenPreview,
}: GalleryPhotoCardProps) {
  const openPreview = () => onOpenPreview(itemIndex);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Open gallery image ${itemIndex + 1}`}
      className="relative cursor-pointer overflow-hidden bg-neutral-900"
      onPointerDown={(event) => {
        pointerStartRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      }}
      onClick={(event) => {
        const start = pointerStartRef.current;
        const moveDistance = start
          ? Math.abs(event.clientX - start.x) +
            Math.abs(event.clientY - start.y)
          : 0;

        if (moveDistance <= 8) {
          openPreview();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPreview();
        }
      }}
    >
      <Media
        src={photo.image || GALLERY_ALBUM_FALLBACK_IMAGE}
        alt={photo.title}
        className="aspect-square bg-neutral-900"
      />
    </article>
  );
}

type GalleryPhotoPreviewProps = {
  photo: GalleryPhotoModel;
  current: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function GalleryPhotoPreview({
  photo,
  current,
  total,
  onClose,
  onPrevious,
  onNext,
}: GalleryPhotoPreviewProps) {
  return (
    <div
      className="fixed inset-0 z-z-index-popup flex items-center justify-center bg-black/80 px-6 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <div
        className="relative flex h-full w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <MarketingIconButton
          icon="chevron-left"
          aria-label="previous image"
          size="lg"
          variant="overlay"
          className="absolute left-6 top-1/2 z-10 h-14 w-14 -translate-y-1/2 bg-brand-pink phone:h-12 phone:w-12"
          onClick={onPrevious}
        />
        <Image
          src={photo.image || GALLERY_ALBUM_FALLBACK_IMAGE}
          alt={photo.title}
          fill
          sizes="100vw"
          draggable={false}
          className="select-none object-contain"
        />
        <MarketingIconButton
          icon="chevron-right"
          aria-label="next image"
          size="lg"
          variant="overlay"
          className="absolute right-6 top-1/2 z-10 h-14 w-14 -translate-y-1/2 bg-brand-pink phone:h-12 phone:w-12"
          onClick={onNext}
        />
        <MarketingIconButton
          icon="close"
          aria-label="close preview"
          variant="overlay"
          className="absolute right-6 top-6 z-10 h-12 w-12 bg-black/60 phone:h-10 phone:w-10"
          onClick={onClose}
        />
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-6 py-2 text-brand-caption font-bold text-white">
          {current + 1}/{total}
        </div>
      </div>
    </div>
  );
}
