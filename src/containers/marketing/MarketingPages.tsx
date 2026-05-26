import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import storeIcon from 'assets/icons/store.png';
import Image from 'components/image/Image';
import {
  ABOUT_COPY,
  ABOUT_IMAGES,
  BUSINESS_FIT_CARDS,
  CUSTOMER_LOGOS,
  DEVELOPMENT_TIMELINE,
  DIFFERENCE_IMAGES,
  FREE_SERVICE_CARDS,
  FRANCHISE_REASONS,
  FRANCHISE_TOP_IMAGES,
  GALLERY_FALLBACK_IMAGE,
  GALLERY_ITEMS,
  HOME_HERO_SLIDES,
  HOME_VIDEO,
  MARKETING_CONTACT,
  MarketingImage,
  NEWS_CARDS,
  PRESS_ITEMS,
  PRODUCT_MACHINES,
  RENTAL_SECTIONS,
  SERVICE_GALLERY_IMAGES,
  SERVICE_IN_STORE_IMAGES,
  SERVICE_KIOSK_IMAGES,
  SERVICE_MODELS,
  SERVICE_OTHER_PRODUCTS,
  SERVICE_RENTAL_IDOL_IMAGES,
} from 'store/static-data/marketing-pages.data';
import {
  funStores,
  ProvinceNames,
  ProvinceOfRegions,
  ProvinceTypes,
  RegionLocationName,
  RegionLocationType,
  type StoreType,
} from 'store/static-data/static-data.data';

type MediaProps = {
  src: MarketingImage;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

const Media: React.FC<MediaProps> = ({
  src,
  alt,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, 50vw',
}) => (
  <div className={cx('relative overflow-hidden bg-brand-page', className)}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      className={cx(
        'pointer-events-none select-none object-cover',
        imageClassName,
      )}
    />
  </div>
);

const SectionTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}> = ({ children, className, muted }) => (
  <h1
    className={cx(
      'mx-auto mb-5.4 max-w-marketing-title text-center font-UTMAVo text-marketing-hero font-normal uppercase leading-snug phone:mb-3.6 phone:text-brand-card-title',
      muted ? 'text-white' : 'text-brand-pink',
      className,
    )}
  >
    {children}
  </h1>
);

const normalizeIndex = (index: number, count: number) =>
  count > 0 ? (index + count) % count : 0;

const getPagedItems = <T,>(items: T[], page: number, pageSize: number) => {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
};

const getPageCount = (itemsLength: number, pageSize: number) =>
  Math.max(1, Math.ceil(itemsLength / pageSize));

const getRotatedPageItems = <T,>(
  items: T[],
  page: number,
  pageSize: number,
) => {
  if (!items.length) {
    return [];
  }

  const start = (page * 3) % items.length;

  return Array.from(
    { length: pageSize },
    (_, index) => items[(start + index) % items.length],
  );
};

const useCarouselIndex = (count: number, initialPosition = 0) => {
  const [position, setPosition] = useState(initialPosition);
  const current = normalizeIndex(position, count);
  const setSlide = (index: number) => {
    setPosition((previousPosition) => {
      if (count <= 0) {
        return 0;
      }

      const previousCurrent = normalizeIndex(previousPosition, count);

      if (index === previousCurrent + 1) {
        return previousPosition + 1;
      }

      if (index === previousCurrent - 1) {
        return previousPosition - 1;
      }

      const target = normalizeIndex(index, count);
      let delta = target - previousCurrent;

      if (delta > count / 2) {
        delta -= count;
      }

      if (delta < -count / 2) {
        delta += count;
      }

      return previousPosition + delta;
    });
  };

  return { current, position, setSlide };
};

const useResponsiveVisibleCount = ({
  desktop,
  tablet = desktop,
  mobile = tablet,
}: {
  desktop: number;
  tablet?: number;
  mobile?: number;
}) => {
  const [visibleCount, setVisibleCount] = useState(desktop);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(mobile);
        return;
      }

      if (window.innerWidth <= 1180) {
        setVisibleCount(tablet);
        return;
      }

      setVisibleCount(desktop);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [desktop, mobile, tablet]);

  return visibleCount;
};

type HomeVideoSlide = {
  image: MarketingImage;
  title: string;
  video: string;
};

const HOME_VIDEO_EMBEDS = [
  'https://www.youtube.com/embed/unyZnLKiWUw?si=UCcTrLZJO7K50aFl',
  'https://www.youtube.com/embed/CnKDC4b1HTo?si=MeEzBoT1diw2gHP8',
  'https://www.youtube.com/embed/nkewKtTuHts?si=fkPGFrjVnNQhaKP2',
];

const withAutoplay = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;

const HOME_VIDEO_SLIDES: HomeVideoSlide[] = [
  { ...HOME_VIDEO, video: HOME_VIDEO_EMBEDS[0] },
  ...PRESS_ITEMS.slice(0, 2).map((item, index) => ({
    image: item.image,
    title: item.title,
    video: HOME_VIDEO_EMBEDS[index + 1] ?? HOME_VIDEO_EMBEDS[0],
  })),
];

const ARROW_CLASS =
  'z-10 inline-flex h-4.4 w-4.4 items-center justify-center rounded-full border border-brand-pink bg-white/85 text-brand-title leading-none text-brand-pink phone:h-3.6 phone:w-3.6 phone:text-3xl';

const SliderControls: React.FC<{
  count: number;
  current: number;
  light?: boolean;
  showArrows?: boolean;
  onChange: (index: number) => void;
}> = ({ count, current, light, showArrows = true, onChange }) => {
  if (count <= 1) {
    return null;
  }

  const dotBaseClass = cx(
    'h-2.2 w-2.2 rounded-full border',
    light ? 'border-white' : 'border-brand-pink',
  );
  const activeDotClass = light ? 'bg-white' : 'bg-brand-pink';

  return (
    <div className="mt-3.4 flex items-center justify-center gap-1.8">
      {showArrows && (
        <button
          type="button"
          aria-label="previous"
          className={cx(
            'h-2.2 w-2.2 rounded-full border text-marketing-control leading-1.8',
            light
              ? 'border-white bg-transparent text-white'
              : 'border-brand-pink bg-white text-brand-pink',
          )}
          onClick={() => onChange(current - 1)}
        >
          {'<'}
        </button>
      )}
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`go to slide ${index + 1}`}
          className={cx(
            dotBaseClass,
            current === index ? activeDotClass : 'bg-transparent',
          )}
          onClick={() => onChange(index)}
        />
      ))}
      {showArrows && (
        <button
          type="button"
          aria-label="next"
          className={cx(
            'h-2.2 w-2.2 rounded-full border text-marketing-control leading-1.8',
            light
              ? 'border-white bg-transparent text-white'
              : 'border-brand-pink bg-white text-brand-pink',
          )}
          onClick={() => onChange(current + 1)}
        >
          {'>'}
        </button>
      )}
    </div>
  );
};

const InlineArrow: React.FC<{
  direction: 'previous' | 'next';
  onClick: () => void;
  className?: string;
}> = ({ direction, onClick, className }) => (
  <button
    type="button"
    aria-label={direction}
    className={cx(ARROW_CLASS, className)}
    onClick={onClick}
  >
    {direction === 'previous' ? '<' : '>'}
  </button>
);

type MarketingHeroSlide = {
  image: MarketingImage;
  title: string;
};

const getLoopItem = <T,>(items: T[], index: number) =>
  items[normalizeIndex(index, items.length)];

const HeroBannerMedia: React.FC<{
  slide: MarketingHeroSlide;
  variant: 'main' | 'side';
}> = ({ slide, variant }) => (
  <div className="relative">
    <Media
      src={slide.image}
      alt={slide.title}
      className={cx(
        variant === 'main'
          ? 'aspect-hero-main phone:aspect-hero-main-mobile'
          : 'h-full w-full border-14 border-brand-pink',
      )}
      sizes={variant === 'main' ? '100vw' : '240px'}
    />
    {variant === 'main' && (
      <h2 className="marketing-hero-title absolute bottom-8.5 left-7.5 right-7.5 m-0 text-center text-marketing-hero-overlay font-extrabold uppercase leading-tight text-white phone:bottom-5 phone:text-lg">
        {slide.title}
      </h2>
    )}
  </div>
);

const HeroBannerCarousel: React.FC<{
  slides: MarketingHeroSlide[];
  position: number;
  current: number;
  onChange: (index: number) => void;
}> = ({ slides, position, current, onChange }) => {
  const dragStateRef = useRef<CarouselDragState | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!slides.length) {
    return null;
  }

  const previousSlide = getLoopItem(slides, position - 1);
  const currentSlide = getLoopItem(slides, position);
  const nextSlide = getLoopItem(slides, position + 1);
  const canDrag = slides.length > 1;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canDrag || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('a, button, input, label, select, textarea')) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      viewportWidth: event.currentTarget.clientWidth,
    };
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragState.lastX = event.clientX;
    setDragOffset(event.clientX - dragState.startX);
    event.preventDefault();
  };

  const finishDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    shouldSlide: boolean,
  ) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released by the browser.
    }

    dragStateRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (!shouldSlide) {
      return;
    }

    const delta = dragState.lastX - dragState.startX;
    const threshold = Math.min(
      120,
      Math.max(40, dragState.viewportWidth * 0.08),
    );

    if (Math.abs(delta) >= threshold) {
      onChange(current + (delta < 0 ? 1 : -1));
    }
  };

  return (
    <div
      className={cx(
        'grid grid-cols-hero justify-center gap-6 overflow-hidden px-0 tablet:grid-cols-1 tablet:px-2.4 phone:px-1.6',
        canDrag && 'cursor-grab touch-pan-y active:cursor-grabbing',
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
    >
      <button
        type="button"
        aria-label={`go to previous slide ${previousSlide.title}`}
        className="h-hero-side-panel self-center overflow-hidden bg-brand-pink p-0 text-left tablet:hidden"
        onClick={() => onChange(current - 1)}
      >
        <div
          className={cx(
            'h-full transition-transform duration-300',
            isDragging ? 'transition-none' : '',
          )}
          style={{ transform: `translate3d(${dragOffset}px, 0, 0)` }}
        >
          <HeroBannerMedia slide={previousSlide} variant="side" />
        </div>
      </button>
      <div className="relative">
        <div
          className={cx(
            'transition-transform duration-300',
            isDragging ? 'transition-none' : '',
          )}
          style={{ transform: `translate3d(${dragOffset}px, 0, 0)` }}
        >
          <HeroBannerMedia slide={currentSlide} variant="main" />
        </div>
        <InlineArrow
          direction="previous"
          className={HERO_LEFT_ARROW_CLASS}
          onClick={() => onChange(current - 1)}
        />
        <InlineArrow
          direction="next"
          className={HERO_RIGHT_ARROW_CLASS}
          onClick={() => onChange(current + 1)}
        />
      </div>
      <button
        type="button"
        aria-label={`go to next slide ${nextSlide.title}`}
        className="h-hero-side-panel self-center overflow-hidden bg-brand-pink p-0 text-left tablet:hidden"
        onClick={() => onChange(current + 1)}
      >
        <div
          className={cx(
            'h-full transition-transform duration-300',
            isDragging ? 'transition-none' : '',
          )}
          style={{ transform: `translate3d(${dragOffset}px, 0, 0)` }}
        >
          <HeroBannerMedia slide={nextSlide} variant="side" />
        </div>
      </button>
    </div>
  );
};

const HomeVideoCard: React.FC<{
  slide: HomeVideoSlide;
  isPlaying: boolean;
  onPlay: () => void;
}> = ({ slide, isPlaying, onPlay }) => (
  <div className="relative aspect-video overflow-hidden rounded-3xl border-14 border-gray-100 bg-brand-text shadow-brand-outline phone:rounded-1.4 phone:border-8">
    {isPlaying ? (
      <iframe
        className="h-full w-full"
        src={withAutoplay(slide.video)}
        title={slide.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      <>
        <Media
          src={slide.image}
          alt={slide.title}
          className="h-full w-full"
          sizes="(max-width: 768px) 90vw, 760px"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/15" />
        <button
          type="button"
          aria-label={`play video ${slide.title}`}
          className="absolute left-1/2 top-1/2 z-10 flex h-7.2 w-7.2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-pink shadow-lg transition-colors hover:bg-brand-pink-hover phone:h-5.6 phone:w-5.6"
          onClick={onPlay}
        >
          <span
            aria-hidden="true"
            className="ml-0.5 h-0 w-0 border-y-8 border-l-14 border-y-transparent border-l-white"
          />
        </button>
      </>
    )}
  </div>
);

type CarouselProps<T> = {
  items: T[];
  position: number;
  visibleCount?: number;
  renderItem: (item: T, index: number, isCurrent: boolean) => React.ReactNode;
  getKey: (item: T, index: number) => string;
  onDragSlide?: (direction: 1 | -1) => void;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
};

type CarouselDragState = {
  pointerId: number;
  startX: number;
  lastX: number;
  viewportWidth: number;
};

const Carousel = <T,>({
  items,
  position,
  visibleCount = 1,
  renderItem,
  getKey,
  onDragSlide,
  viewportClassName,
  trackClassName,
  itemClassName,
}: CarouselProps<T>) => {
  const count = items.length;
  const dragStateRef = useRef<CarouselDragState | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!count) {
    return null;
  }

  const safeVisibleCount = Math.max(1, Math.min(visibleCount, count));
  const repeatBuffer = 2 + Math.ceil(Math.abs(position) / count);
  const totalItems = count * (repeatBuffer * 2 + 1);
  const offsetIndex = count * repeatBuffer + position;
  const canDrag = Boolean(onDragSlide && count > 1);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canDrag || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('a, button, input, label, select, textarea')) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      viewportWidth: event.currentTarget.clientWidth,
    };
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragState.lastX = event.clientX;
    setDragOffset(event.clientX - dragState.startX);
    event.preventDefault();
  };

  const finishDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    shouldSlide: boolean,
  ) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released by the browser.
    }

    dragStateRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (!shouldSlide || !onDragSlide) {
      return;
    }

    const delta = dragState.lastX - dragState.startX;
    const itemWidth = dragState.viewportWidth / safeVisibleCount;
    const threshold = Math.min(120, Math.max(40, itemWidth * 0.18));

    if (Math.abs(delta) >= threshold) {
      onDragSlide(delta < 0 ? 1 : -1);
    }
  };

  return (
    <div
      className={cx(
        'overflow-hidden select-none',
        canDrag && 'cursor-grab touch-pan-y active:cursor-grabbing',
        viewportClassName,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
    >
      <div
        className={cx(
          'flex will-change-transform',
          isDragging
            ? 'transition-none'
            : 'transition-transform duration-500 ease-out',
          trackClassName,
        )}
        style={{
          width: `${(totalItems / safeVisibleCount) * 100}%`,
          transform: `translate3d(calc(-${
            (offsetIndex / totalItems) * 100
          }% + ${dragOffset}px), 0, 0)`,
        }}
      >
        {Array.from({ length: totalItems }, (_, loopIndex) => {
          const itemIndex = loopIndex % count;
          const item = items[itemIndex];

          return (
            <div
              key={`${loopIndex}-${getKey(item, itemIndex)}`}
              className={cx('shrink-0 select-none', itemClassName)}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              style={{ flexBasis: `${100 / totalItems}%` }}
            >
              {renderItem(item, itemIndex, loopIndex === offsetIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InfoCard: React.FC<{
  index?: number;
  icon?: MarketingImage;
  title?: string;
  text: string;
  compact?: boolean;
  variant?: 'default' | 'franchise-service';
}> = ({ index, icon, title, text, compact, variant = 'default' }) => (
  <article
    className={cx(
      'relative rounded-lg border border-brand-muted bg-white text-brand-text',
      compact
        ? 'min-h-info-card-compact px-7 pb-7 pt-5.4'
        : variant === 'franchise-service'
          ? 'min-h-franchise-service-card px-7 pb-7 pt-16.5'
          : 'min-h-info-card px-9 pb-9 pt-16.5',
    )}
  >
    {typeof index === 'number' && (
      <div className="absolute left-1/2 -top-3.4 flex h-7.6 w-7.6 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-brand-subtitle font-bold text-brand-pink">
        {index}
      </div>
    )}
    {icon && (
      <div className="absolute left-1/2 -top-3.4 flex h-7.6 w-7.6 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-brand-pink">
        <Image src={icon} alt="" width={42} height={42} />
      </div>
    )}
    {title && (
      <h3 className="mb-6 mt-0 text-xl font-extrabold uppercase leading-snug text-brand-pink">
        {title}
      </h3>
    )}
    <p className="m-0 text-lg leading-relaxed phone:text-base">{text}</p>
  </article>
);

const FooterSpacer: React.FC = () => <div className="h-6" />;

const getImageKey = (image: MarketingImage, fallback: string) =>
  typeof image === 'string' ? image : image.src || fallback;

const CONCEPT_TITLES = [
  'Concept The Railway Station',
  'Concept Timeless Station',
  'Concept Lucid Dream',
];

const CONCEPT_CARDS = SERVICE_GALLERY_IMAGES.map((image, index) => ({
  image,
  title: CONCEPT_TITLES[index % CONCEPT_TITLES.length],
}));

const PAGE_CLASS =
  'w-full overflow-hidden bg-white font-UTMAVo text-brand-text';
const CONTAINER_CLASS =
  'mx-auto w-marketing-container phone:w-marketing-container-mobile';
const STORE_MAP_IMAGE = '/images/generated/store-vietnam-map.svg';
const PRODUCT_MACHINE_PAGE_COUNT = 4;
const PRODUCT_MACHINE_PAGE_SIZE = 9;
const GALLERY_PAGE_SIZE = 36;
const SECTION_CLASS = 'py-7.2 phone:py-4.8';
const LEFT_FLOAT_ARROW_CLASS =
  'absolute -left-7.5 top-1/2 -translate-y-1/2 phone:left-2';
const RIGHT_FLOAT_ARROW_CLASS =
  'absolute -right-7.5 top-1/2 -translate-y-1/2 phone:right-2';
const HERO_LEFT_ARROW_CLASS =
  'absolute -left-2.4 top-1/2 -translate-y-1/2 phone:left-2';
const HERO_RIGHT_ARROW_CLASS =
  'absolute -right-4.4 top-1/2 -translate-y-1/2 phone:right-2';
const VIDEO_LEFT_ARROW_CLASS =
  'absolute left-8 top-1/2 -translate-y-1/2 phone:left-2';
const VIDEO_RIGHT_ARROW_CLASS =
  'absolute right-8 top-1/2 -translate-y-1/2 phone:right-2';
const CARD_TITLE_CLASS =
  'mx-7 mb-4.5 mt-7 text-2xl font-extrabold uppercase leading-snug text-brand-pink';
const CARD_TEXT_CLASS =
  'mx-7 mb-8.5 mt-0 text-lg leading-relaxed text-brand-text phone:text-base';
const LEAD_CLASS =
  'mx-auto mb-14 mt-8 max-w-marketing text-left text-xl leading-relaxed text-brand-text phone:text-base';
const STORE_REGION_ORDER = [
  RegionLocationType.NORTH,
  RegionLocationType.MIDDLE,
  RegionLocationType.SOUTH,
];
const STORE_REGION_PANEL_CLASS: Record<RegionLocationType, string> = {
  [RegionLocationType.NORTH]: 'left-0 top-8 w-31.5',
  [RegionLocationType.MIDDLE]: 'left-23.5 top-40 w-40',
  [RegionLocationType.SOUTH]: 'left-0 top-80 w-31.5',
};

const STORE_REGION_DISPLAY_PROVINCES: Record<RegionLocationType, string[]> = {
  [RegionLocationType.NORTH]: [
    'Hà Nội',
    'Tuyên Quang',
    'Phú Thọ',
    'Bắc Ninh',
    'Hưng Yên',
    'Hải Phòng',
  ],
  [RegionLocationType.MIDDLE]: [
    'Thanh Hoá',
    'Nghệ An',
    'Hà Tĩnh',
    'Thừa Thiên Huế',
    'Đà Nẵng',
    'Đắk Lắk',
    'Khánh Hoà',
    'Lâm Đồng',
  ],
  [RegionLocationType.SOUTH]: [
    'TP. Hồ Chí Minh',
    'Đồng Nai',
    'Tây Ninh',
    'An Giang',
    'Cần Thơ',
  ],
};

type StoreProvinceSummary = {
  provinceType: ProvinceTypes;
  province: string;
  count: number;
  image: StoreType['image'];
};

type StoreRegionData = {
  type: RegionLocationType;
  name: string;
  provinces: ProvinceTypes[];
  stores: StoreProvinceSummary[];
};

const getProvinceName = (provinceType: ProvinceTypes) =>
  ProvinceNames[provinceType] || '';

const getProvinceStores = (provinceType: ProvinceTypes) =>
  funStores.filter((store) => store.storeLocation === provinceType);

const STORE_REGIONS: StoreRegionData[] = STORE_REGION_ORDER.map(
  (regionType) => {
    const provinces = ProvinceOfRegions[regionType];
    const stores = provinces
      .map((provinceType) => {
        const provinceStores = getProvinceStores(provinceType);
        const firstStore = provinceStores[0];

        if (!firstStore) {
          return null;
        }

        return {
          provinceType,
          province: getProvinceName(provinceType),
          count: provinceStores.length,
          image: firstStore.image,
        };
      })
      .filter((store): store is StoreProvinceSummary => Boolean(store));

    return {
      type: regionType,
      name: RegionLocationName[regionType],
      provinces,
      stores,
    };
  },
);

const FORM_INPUT_CLASS =
  'min-h-13 w-full rounded border border-brand-control bg-white px-4 text-base leading-normal text-brand-text outline-none placeholder:text-brand-placeholder focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/30 phone:text-brand-caption';
const REGISTER_FORM_DEMAND_OPTIONS = ['Nhượng quyền', 'Thuê máy', 'Bán máy'];
const REGISTER_FORM_LOCATION_OPTIONS = [
  'Đã có',
  'Đang tìm',
  'Cần Fun Studio hỗ trợ tìm mặt bằng',
];
const REGISTER_FORM_TIMING_OPTIONS = [
  'Trong 1 tháng tới',
  '1 - 3 tháng',
  'Trên 3 tháng',
];
const REGISTER_FORM_BUDGET_OPTIONS = [
  'Dưới 400 triệu',
  '400 - 800 triệu',
  'Trên 800 triệu',
];

const RegisterOption: React.FC<{
  children: React.ReactNode;
  name: string;
}> = ({ children, name }) => (
  <label className="flex min-h-3.4 cursor-pointer items-center gap-3 text-base leading-snug text-brand-text phone:text-brand-caption">
    <input
      aria-label={String(children)}
      type="checkbox"
      name={name}
      value={String(children)}
      className="h-2.2 w-2.2 shrink-0 rounded border-brand-control accent-brand-pink"
    />
    <span>{children}</span>
  </label>
);

const RegisterFieldGroup: React.FC<{
  children: React.ReactNode;
  label?: string;
}> = ({ children, label }) => (
  <fieldset className="m-0 rounded border border-brand-control px-3.5 pb-3 pt-3.5">
    {label && (
      <legend className="px-0.5 text-base leading-snug text-brand-text phone:text-brand-caption">
        {label}
      </legend>
    )}
    <div className="grid gap-0.8">{children}</div>
  </fieldset>
);

export const MarketingHomePage: React.FC = () => {
  const heroCarousel = useCarouselIndex(HOME_HERO_SLIDES.length);
  const videoCarousel = useCarouselIndex(HOME_VIDEO_SLIDES.length);
  const [playingHomeVideo, setPlayingHomeVideo] = useState<string | null>(null);

  return (
    <main className={PAGE_CLASS}>
      <section className="relative pb-3.4 pt-4.2 phone:pb-2 phone:pt-2.4">
        <HeroBannerCarousel
          slides={HOME_HERO_SLIDES}
          position={heroCarousel.position}
          current={heroCarousel.current}
          onChange={heroCarousel.setSlide}
        />
      </section>

      <section className="pb-7.2 pt-3.4 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <SectionTitle>{HOME_VIDEO.title}</SectionTitle>
          <div className="relative flex min-h-video-section items-center justify-center phone:min-h-0">
            <InlineArrow
              direction="previous"
              className={VIDEO_LEFT_ARROW_CLASS}
              onClick={() => videoCarousel.setSlide(videoCarousel.current - 1)}
            />
            <Carousel
              items={HOME_VIDEO_SLIDES}
              position={videoCarousel.position}
              getKey={(slide) => slide.title}
              onDragSlide={(direction) =>
                videoCarousel.setSlide(videoCarousel.current + direction)
              }
              viewportClassName="w-video-carousel phone:w-full"
              renderItem={(slide, _index, isCurrent) => (
                <div className="relative">
                  <HomeVideoCard
                    slide={slide}
                    isPlaying={playingHomeVideo === slide.video && isCurrent}
                    onPlay={() => setPlayingHomeVideo(slide.video)}
                  />
                </div>
              )}
            />
            <InlineArrow
              direction="next"
              className={VIDEO_RIGHT_ARROW_CLASS}
              onClick={() => videoCarousel.setSlide(videoCarousel.current + 1)}
            />
          </div>
          <SliderControls
            showArrows={false}
            count={HOME_VIDEO_SLIDES.length}
            current={videoCarousel.current}
            onChange={videoCarousel.setSlide}
          />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionTitle>
            Fun Studio là thương hiệu chụp ảnh tự động theo phong cách Hàn Quốc
          </SectionTitle>
          <div className="grid grid-cols-2 items-start gap-8 phone:grid-cols-1 phone:gap-7">
            <div className="text-xl leading-relaxed text-brand-text phone:text-base">
              {ABOUT_COPY.map((paragraph) => (
                <p key={paragraph} className="mb-6 mt-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid gap-3.8">
              {ABOUT_IMAGES.map((image) => (
                <Media
                  key={getImageKey(image, 'about-image')}
                  src={image}
                  alt="Fun Studio"
                  className="aspect-about-image"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-7.2 pt-9 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <SectionTitle>Quá trình hình thành & phát triển</SectionTitle>
          <div className="mx-auto grid max-w-marketing grid-cols-8 items-start gap-2 tablet:grid-cols-4 tablet:gap-y-7 phone:grid-cols-2 phone:gap-y-6">
            {DEVELOPMENT_TIMELINE.map(([date, text]) => (
              <article
                key={date}
                className="relative mt-5.8 flex min-h-28 items-center justify-center rounded-2 bg-brand-pink px-1.6 py-2 text-center text-white phone:mt-4 phone:min-h-24"
              >
                <strong className="absolute -top-5.8 left-1/2 flex h-8.2 w-8.2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-muted font-UTMImpact text-brand-card-title font-normal leading-none text-white phone:-top-4 phone:h-7.2 phone:w-7.2 phone:text-lg">
                  {date}
                </strong>
                <p className="m-0 text-brand-card-title font-extrabold leading-tight">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-pink pb-20 pt-7.2 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <SectionTitle muted>Khách hàng của chúng tôi</SectionTitle>
          <div className="grid grid-cols-7 gap-x-1.8 gap-y-3.8 tablet:grid-cols-4 phone:grid-cols-2">
            {CUSTOMER_LOGOS.map((client) => (
              <div
                key={client.name}
                className="flex min-h-customer-logo items-center justify-center bg-white p-2 text-center text-lg font-extrabold text-brand-text"
              >
                {client.image ? (
                  <Image
                    src={client.image}
                    alt={client.name}
                    className="max-h-customer-logo max-w-customer-logo object-contain"
                  />
                ) : (
                  <span>{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export const FranchisePage: React.FC = () => (
  <main className={PAGE_CLASS}>
    <section className="pb-8.5 pt-6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-5 max-w-marketing-title text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight text-brand-pink phone:mb-3.6 phone:text-brand-card-title">
          Photobooth không chỉ là trào lưu còn là cơ hội để bạn bắt đầu câu
          chuyện thành công
        </h1>
        <div className="grid grid-cols-3 gap-4 phone:grid-cols-1">
          {FRANCHISE_TOP_IMAGES.map((image) => (
            <Media
              key={getImageKey(image, 'franchise-image')}
              src={image}
              alt="Nhượng quyền Fun Studio"
              sizes="(max-width: 768px) 100vw, 420px"
              className="aspect-franchise-top"
            />
          ))}
        </div>
        <p className="mx-auto mb-15 mt-4 max-w-marketing text-left text-lg leading-relaxed text-brand-text phone:text-base">
          Photobooth không còn là xu hướng nhất thời, mà đã trở thành một mô
          hình kinh doanh hấp dẫn và sinh lời bền vững. Với Fun Studio, chuỗi
          photobooth nhượng quyền lớn nhất Việt Nam, đối tác được đồng hành từ
          A-Z trong vận hành và phát triển.
        </p>

        <div className="mt-16 grid grid-cols-story-panel items-start gap-3 phone:grid-cols-1 phone:gap-7">
          <article className="marketing-difference-copy">
            <h2>Điều gì khiến Fun Studio trở nên khác biệt</h2>
            <p>
              Tự phát triển phần mềm chụp ảnh và quản lý vận hành độc quyền,
              giúp tối ưu trải nghiệm và giảm chi phí bảo trì.
            </p>
            <p>
              Đội ngũ sáng tạo liên tục phát triển concept độc quyền, hệ sinh
              thái truyền thông mạnh mẽ và nguồn lực vận hành phủ khắp thị
              trường.
            </p>
            <p>
              Hệ sinh thái truyền thông mạnh mẽ với hàng trăm nghìn lượt theo
              dõi và nội dung viral trên các nền tảng TikTok, Facebook, Zalo OA.
            </p>
            <p>
              Mạng lưới vận hành phủ khắp 16 tỉnh thành, giúp Fun Studio có lợi
              thế lớn về logistics, đào tạo và chia sẻ kinh nghiệm thực tế.
            </p>
            <p>
              Tầm nhìn thương hiệu rõ ràng: đưa photobooth trở thành điểm hẹn
              cảm xúc, nơi mọi người đều có thể lưu giữ niềm vui và câu chuyện
              riêng của mình.
            </p>
          </article>
          <div className="marketing-difference-grid grid grid-cols-difference gap-2">
            {DIFFERENCE_IMAGES.map((image) => (
              <Media
                key={getImageKey(image, 'difference-image')}
                src={image}
                alt="Khác biệt Fun Studio"
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-brand-pink pb-9 pt-6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-5 max-w-marketing-title text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight text-white phone:mb-3.6 phone:text-brand-card-title">
          Lý do nên trở thành đối tác của Fun Studio chuỗi photobooth nhượng
          quyền lớn nhất Việt Nam
        </h1>
        <div className="grid grid-cols-4 gap-3.8 pt-5 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-x-5 phone:gap-y-14">
          {FRANCHISE_REASONS.map((reason, index) => (
            <InfoCard
              key={reason.text}
              icon={reason.icon}
              text={reason.text}
              index={index + 1}
              compact
            />
          ))}
        </div>
      </div>
    </section>

    <section className="pb-10 pt-6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-5 max-w-marketing text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight text-brand-pink phone:mb-3.6 phone:text-brand-card-title">
          6 dịch vụ miễn phí dành riêng cho đối tác của Fun Studio
        </h1>
        <div className="grid grid-cols-3 gap-x-3 gap-y-7 pt-4 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-x-5 phone:gap-y-14">
          {FREE_SERVICE_CARDS.map((card, index) => (
            <InfoCard
              key={card.title}
              index={index + 1}
              title={card.title}
              text={card.text}
              variant="franchise-service"
            />
          ))}
        </div>
      </div>
    </section>
  </main>
);

const ServiceSectionHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}> = ({ children, className, muted }) => (
  <h1
    className={cx(
      'mx-auto mb-5 max-w-marketing-title text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight phone:text-brand-card-title',
      muted ? 'text-white' : 'text-brand-pink',
      className,
    )}
  >
    {children}
  </h1>
);

const ServicePillHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h2
    className={cx(
      'mx-auto mb-6 flex min-h-5.8 w-video-carousel max-w-full items-center justify-center rounded-full bg-brand-pink px-6 text-center text-2xl font-extrabold uppercase leading-tight text-white phone:min-h-4.8 phone:text-lg',
      className,
    )}
  >
    {children}
  </h2>
);

const ServiceMachineCard: React.FC<{
  image: MarketingImage;
  title: string;
}> = ({ image, title }) => (
  <article className="border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-service-card" />
    <h3 className="m-0 flex min-h-8 items-center border-b border-brand-muted px-3.5 text-brand-card-title font-extrabold uppercase leading-tight text-brand-pink phone:text-xl">
      {title}
    </h3>
    <a
      href={MARKETING_CONTACT.ctaHref}
      className="flex min-h-5.8 items-center justify-center px-3 text-lg font-extrabold uppercase leading-tight text-brand-pink no-underline phone:text-base"
    >
      Nhận báo giá
    </a>
  </article>
);

const ServiceImageGrid: React.FC<{
  images: MarketingImage[];
  className?: string;
  square?: boolean;
}> = ({ images, className, square }) => (
  <div
    className={cx(
      'grid grid-cols-3 gap-x-4.8 gap-y-4.8 phone:grid-cols-1 phone:gap-2.4',
      className,
    )}
  >
    {images.map((image, index) => (
      <Media
        key={getImageKey(image, `service-image-${index}`)}
        src={image}
        alt="Fun Studio service"
        className={square ? 'aspect-square' : 'aspect-service-card'}
      />
    ))}
  </div>
);

const ServiceSalesCircle: React.FC<{
  icon?: MarketingImage;
  text: string;
}> = ({ icon, text }) => (
  <article className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-brand-pink p-5 text-center text-xl font-extrabold leading-snug text-white phone:h-24 phone:w-24 phone:text-base">
    {icon && (
      <span className="absolute -left-1.2 -top-1.2 flex h-7.6 w-7.6 items-center justify-center rounded-full border border-white bg-brand-pink">
        <Image src={icon} alt="" width={36} height={36} />
      </span>
    )}
    {text}
  </article>
);

const ServiceModelCard: React.FC<{
  image: MarketingImage;
  title: string;
  text: string;
}> = ({ image, title, text }) => (
  <article className="border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-service-model" />
    <h3 className="mx-3.5 mb-2.4 mt-3 text-brand-card-title font-extrabold uppercase leading-tight text-brand-pink">
      {title}
    </h3>
    <p className="mx-3.5 mb-5 mt-0 text-lg leading-relaxed text-brand-text phone:text-base">
      {text}
    </p>
  </article>
);

const ServiceOtherProductCard: React.FC<{
  image: MarketingImage;
  title: string;
}> = ({ image, title }) => (
  <article className="mx-auto w-30 border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-square" />
    <h3 className="m-0 flex min-h-5.8 items-center justify-center px-2 text-center text-lg font-extrabold uppercase leading-tight text-brand-pink">
      {title}
    </h3>
  </article>
);

export const ServicesPage: React.FC = () => {
  const productCarousel = useCarouselIndex(PRODUCT_MACHINE_PAGE_COUNT);
  const productPages = Array.from(
    { length: PRODUCT_MACHINE_PAGE_COUNT },
    (_, page) => page,
  );
  const conceptCarousel = useCarouselIndex(CONCEPT_CARDS.length);
  const conceptVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>
            Đa dạng dòng máy tối ưu trải nghiệm
          </ServiceSectionHeading>
          <Carousel
            items={productPages}
            position={productCarousel.position}
            getKey={(page) => String(page)}
            onDragSlide={(direction) =>
              productCarousel.setSlide(productCarousel.current + direction)
            }
            renderItem={(page) => (
              <div className="grid grid-cols-3 gap-x-4.8 gap-y-20 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-y-7">
                {getRotatedPageItems(
                  PRODUCT_MACHINES,
                  page,
                  PRODUCT_MACHINE_PAGE_SIZE,
                ).map((machine) => (
                  <ServiceMachineCard
                    key={`${page}-${machine.title}`}
                    image={machine.image}
                    title={machine.title}
                  />
                ))}
              </div>
            )}
          />
          <SliderControls
            count={PRODUCT_MACHINE_PAGE_COUNT}
            current={productCarousel.current}
            onChange={productCarousel.setSlide}
          />
        </div>
      </section>

      <section className="pb-8 pt-3 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading className="mb-4">
            New trend: Photobooth in-store
          </ServiceSectionHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            Mô hình photobooth in-store không chỉ giúp cửa hàng tạo điểm nhấn
            khác biệt mà còn thu hút đúng tệp khách hàng trẻ yêu thích check-in,
            thể hiện cá tính và chia sẻ lên mạng xã hội.
          </p>
          <ServiceImageGrid images={SERVICE_IN_STORE_IMAGES} square />

          <ServiceSectionHeading className="mb-4 mt-8">
            Mô hình kiosk tối ưu trải nghiệm & vận hành
          </ServiceSectionHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            Thiết kế kiosk giúp tối ưu diện tích, vận hành gọn và phù hợp với
            nhiều không gian như trung tâm thương mại, cửa hàng, sự kiện hoặc
            điểm bán lưu động.
          </p>
          <ServiceImageGrid images={SERVICE_KIOSK_IMAGES} square />
        </div>
      </section>

      <section className="min-h-service-concept bg-brand-pink pb-10 pt-8 phone:min-h-0 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading muted>
            Concept phòng chụp
          </ServiceSectionHeading>
          <Carousel
            items={CONCEPT_CARDS}
            position={conceptCarousel.position}
            visibleCount={conceptVisibleCount}
            getKey={(concept) => getImageKey(concept.image, 'concept-image')}
            onDragSlide={(direction) =>
              conceptCarousel.setSlide(conceptCarousel.current + direction)
            }
            viewportClassName="-mx-4.5 phone:mx-0"
            itemClassName="px-1.8 phone:px-0"
            renderItem={(concept) => (
              <article className="bg-white">
                <Media
                  src={concept.image}
                  alt="Concept phòng chụp"
                  className="aspect-concept"
                />
                <h3 className="mx-3.5 mb-2 mt-3 text-xl font-extrabold uppercase leading-tight text-brand-pink">
                  {concept.title}
                </h3>
                <p className="mx-3.5 mb-5 mt-0 text-base leading-relaxed text-brand-text">
                  Những concept được cập nhật thường xuyên giúp cửa hàng luôn
                  mới mẻ, dễ truyền thông và giữ chân khách hàng quay lại.
                </p>
              </article>
            )}
          />
          <SliderControls
            light
            count={CONCEPT_CARDS.length}
            current={conceptCarousel.current}
            onChange={conceptCarousel.setSlide}
          />
        </div>
      </section>

      <section className="pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Các sản phẩm khác</ServiceSectionHeading>
          <div className="mx-auto grid max-w-store-map grid-cols-3 gap-x-12.4 gap-y-7.2 phone:grid-cols-1 phone:gap-4">
            {SERVICE_OTHER_PRODUCTS.map((product, index) => (
              <div
                key={product.title}
                className={cx(
                  index === 6 && 'col-start-2 phone:col-start-auto',
                )}
              >
                <ServiceOtherProductCard
                  image={product.image}
                  title={product.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Dịch vụ bán máy</ServiceSectionHeading>
          <ServicePillHeading>
            Kinh doanh photobooth phù hợp với
          </ServicePillHeading>
          <div className="mx-auto mb-8 grid max-w-store-map grid-cols-3 gap-7.2 phone:grid-cols-1">
            {BUSINESS_FIT_CARDS.map((card) => (
              <ServiceSalesCircle
                key={card.text}
                icon={card.icon}
                text={card.text}
              />
            ))}
          </div>
          <ServicePillHeading>Đặt photobooth ở bất kỳ đâu</ServicePillHeading>
          <div className="mx-auto grid max-w-store-map grid-cols-2 gap-5 phone:grid-cols-1">
            {SERVICE_MODELS.map((model) => (
              <ServiceModelCard
                key={model.title}
                image={model.image}
                title={model.title}
                text={model.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Dịch vụ thuê máy</ServiceSectionHeading>
          <ServicePillHeading>{RENTAL_SECTIONS[0].title}</ServicePillHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            {RENTAL_SECTIONS[0].intro}
          </p>
          <ServiceImageGrid
            images={RENTAL_SECTIONS[0].images}
            className="mx-auto mb-8 max-w-store-map"
          />

          <ServicePillHeading>{RENTAL_SECTIONS[1].title}</ServicePillHeading>
          <div className="mx-auto mb-8 grid max-w-store-map grid-cols-2 gap-5 phone:grid-cols-1">
            {RENTAL_SECTIONS[1].cards.map((card) => (
              <ServiceModelCard
                key={card.title}
                image={card.image}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>

          <ServicePillHeading>Dịch vụ thuê máy sự kiện idol</ServicePillHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            Photobooth giúp fan meeting, concert và sự kiện thần tượng có thêm
            điểm check-in, lưu giữ khoảnh khắc và lan tỏa nội dung trên mạng xã
            hội.
          </p>
          <ServiceImageGrid
            images={SERVICE_RENTAL_IDOL_IMAGES}
            className="mx-auto max-w-store-map"
          />
        </div>
      </section>
    </main>
  );
};

const VietnamStoreSvg: React.FC = () => (
  <img
    src={STORE_MAP_IMAGE}
    alt="Bản đồ hệ thống cửa hàng Fun Studio tại Việt Nam"
    className="h-full w-full object-contain"
  />
);

const StoreMapConnectors: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 text-brand-pink map:hidden"
  >
    <span className="absolute left-31.5 top-24 h-1.8 w-1.8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink" />
    <span className="absolute left-31.5 top-24 h-px w-9 bg-brand-pink" />
    <span className="absolute left-40 top-24 h-12 w-px bg-brand-pink" />
    <span className="absolute left-20 top-70 h-1.8 w-1.8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink" />
    <span className="absolute left-10 top-70 h-px w-9 bg-brand-pink" />
    <span className="absolute left-10 top-70 h-9.6 w-px bg-brand-pink" />
  </div>
);

const StoreCoverageMap: React.FC = () => (
  <div className="relative mx-auto h-store-coverage max-w-marketing map:grid map:h-auto map:max-w-store-map map:grid-cols-1 map:gap-7">
    <div className="absolute -top-5 left-50 h-store-map-art w-store-map-art map:static map:h-62 map:w-full phone:h-40">
      <VietnamStoreSvg />
    </div>
    <StoreMapConnectors />
    <div className="contents map:grid map:grid-cols-3 map:gap-4 phone:grid-cols-1">
      {STORE_REGIONS.map((region) => (
        <article
          key={region.type}
          className={cx(
            'absolute rounded-3 bg-brand-pink p-1 text-white map:static map:w-full',
            STORE_REGION_PANEL_CLASS[region.type],
          )}
        >
          <h2 className="m-0 flex h-6 items-center justify-center rounded-t-2 bg-white px-3 text-center text-marketing-section-sm font-extrabold uppercase text-brand-pink">
            {region.name}
          </h2>
          <ul className="m-0 list-none px-3 pb-2.4 pt-1.8 text-brand-card-title font-normal leading-4">
            {STORE_REGION_DISPLAY_PROVINCES[region.type].map((province) => (
              <li key={province} className="flex items-center gap-1.4">
                <span
                  aria-hidden="true"
                  className="text-brand-card-title leading-none"
                >
                  *
                </span>
                <span>{province}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </div>
);

const StoreRegionCarousel: React.FC<{ region: StoreRegionData }> = ({
  region,
}) => {
  const storeCarousel = useCarouselIndex(region.stores.length);
  const storeVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <div className="mt-7.8 phone:mt-5.4">
      <h2 className="mb-12 mt-0 text-center text-3xl font-extrabold uppercase text-brand-muted">
        {region.name}
      </h2>
      <Carousel
        items={region.stores}
        position={storeCarousel.position}
        visibleCount={storeVisibleCount}
        getKey={(store) => `${region.type}-${store.provinceType}`}
        onDragSlide={(direction) =>
          storeCarousel.setSlide(storeCarousel.current + direction)
        }
        viewportClassName="-mx-4 phone:mx-0"
        itemClassName="px-4 phone:px-0"
        renderItem={(store) => (
          <div className="text-center">
            <article className="border border-neutral-200">
              <h3 className="m-0 flex h-7 items-center justify-center text-brand-card-title font-extrabold uppercase text-brand-pink">
                {store.province}
              </h3>
              <Media
                src={store.image}
                alt={store.province}
                className="aspect-square"
              />
              <p className="m-0 flex h-7 items-center justify-center gap-2 text-marketing-control text-brand-pink">
                <Image src={storeIcon} alt="" width={24} height={24} />
                <strong>{store.count} cửa hàng</strong>
              </p>
            </article>
            <button
              type="button"
              className="mt-2.4 inline-flex min-h-4 items-center justify-center rounded-full border border-brand-pink bg-white px-4.8 text-brand-body text-brand-pink"
            >
              Xem thêm
            </button>
          </div>
        )}
      />
      <SliderControls
        count={region.stores.length}
        current={storeCarousel.current}
        onChange={storeCarousel.setSlide}
      />
    </div>
  );
};

export const StoresPage: React.FC = () => (
  <main className={PAGE_CLASS}>
    <section className="pb-7.2 pt-5.6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <SectionTitle className="mb-3.6">
          Hệ thống 80 cửa hàng trên toàn quốc
        </SectionTitle>
        <StoreCoverageMap />
      </div>
    </section>

    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionTitle>Danh sách cửa hàng</SectionTitle>
        {STORE_REGIONS.map((region) => (
          <StoreRegionCarousel key={region.name} region={region} />
        ))}
      </div>
    </section>
  </main>
);

export const NewsPage: React.FC = () => {
  const newsCarousel = useCarouselIndex(NEWS_CARDS.length);
  const newsVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-6 pt-5.6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <div className="relative mx-auto max-w-news-list">
            <InlineArrow
              direction="previous"
              className={LEFT_FLOAT_ARROW_CLASS}
              onClick={() => newsCarousel.setSlide(newsCarousel.current - 1)}
            />
            <Carousel
              items={NEWS_CARDS}
              position={newsCarousel.position}
              visibleCount={newsVisibleCount}
              getKey={(card) => card.title}
              onDragSlide={(direction) =>
                newsCarousel.setSlide(newsCarousel.current + direction)
              }
              viewportClassName="-mx-2.4 phone:mx-0"
              itemClassName="px-1.8 phone:px-0"
              renderItem={(card) => (
                <article className="flex min-h-news-card flex-col border border-brand-text bg-white">
                  <Media
                    src={card.image}
                    alt={card.title}
                    className="aspect-square"
                  />
                  <div className="px-2.4 pb-2.4 pt-2.4">
                    <h2 className="mb-2.8 mt-0 text-lg font-extrabold uppercase leading-snug text-brand-pink">
                      {card.title}
                    </h2>
                    <p className="m-0 text-brand-body-lg leading-snug text-brand-text phone:text-base">
                      {card.text}
                    </p>
                  </div>
                </article>
              )}
            />
            <InlineArrow
              direction="next"
              className={RIGHT_FLOAT_ARROW_CLASS}
              onClick={() => newsCarousel.setSlide(newsCarousel.current + 1)}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export const GalleryPage: React.FC = () => {
  const galleryPageCount = getPageCount(
    GALLERY_ITEMS.length,
    GALLERY_PAGE_SIZE,
  );
  const galleryCarousel = useCarouselIndex(galleryPageCount);
  const galleryPages = Array.from(
    { length: galleryPageCount },
    (_, page) => page,
  );

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-3.4 pt-4.2 phone:py-4.8">
        <div className="mx-auto w-full max-w-gallery-grid phone:w-marketing-container-mobile">
          <Carousel
            items={galleryPages}
            position={galleryCarousel.position}
            getKey={(page) => String(page)}
            onDragSlide={(direction) =>
              galleryCarousel.setSlide(galleryCarousel.current + direction)
            }
            renderItem={(page) => (
              <div className="grid grid-cols-6 gap-1.4 tablet:grid-cols-4 phone:grid-cols-2">
                {getPagedItems(GALLERY_ITEMS, page, GALLERY_PAGE_SIZE).map(
                  (item) => (
                    <article
                      key={item.id}
                      className="relative overflow-hidden bg-neutral-900"
                    >
                      <Media
                        src={item.image || GALLERY_FALLBACK_IMAGE}
                        alt={item.title}
                        className="aspect-square bg-neutral-900"
                      />
                    </article>
                  ),
                )}
              </div>
            )}
          />
          <SliderControls
            count={galleryPageCount}
            current={galleryCarousel.current}
            onChange={galleryCarousel.setSlide}
          />
        </div>
      </section>
      <FooterSpacer />
    </main>
  );
};

export const FranchiseRegisterPage: React.FC = () => {
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage('Form hiện chưa kết nối gửi dữ liệu.');
  };

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-7.2 pt-4.6 phone:pb-5.2 phone:pt-3.4">
        <div className={CONTAINER_CLASS}>
          <h1 className="mb-11 mt-0 text-center font-UTMAVo text-marketing-section-lg font-normal uppercase leading-tight text-brand-pink phone:mb-3 phone:text-brand-card-title">
            Form đăng ký tư vấn dịch vụ của Fun Studio
          </h1>
          <form
            noValidate
            className="mx-auto w-register-form rounded-lg border border-brand-control bg-white px-2.4 pb-7 pt-5 shadow-brand-hairline phone:px-1.6 phone:pb-2.5"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4.5 mt-0 border-b border-brand-control pb-2.5 text-lg font-extrabold uppercase leading-snug text-brand-pink phone:text-base">
              Form thông tin tư vấn nhượng quyền:
            </h2>
            <div className="grid gap-3">
              <div>
                <label className="sr-only" htmlFor="franchise-register-name">
                  Họ tên
                </label>
                <input
                  aria-label="Ho ten"
                  id="franchise-register-name"
                  name="name"
                  className={FORM_INPUT_CLASS}
                  placeholder="Họ tên: (Vui lòng nhập đầy đủ họ tên của bạn) (*Bắt buộc)"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="franchise-register-phone">
                  Số điện thoại
                </label>
                <input
                  aria-label="So dien thoai"
                  id="franchise-register-phone"
                  name="phone"
                  type="tel"
                  className={FORM_INPUT_CLASS}
                  placeholder="Số điện thoại: (Để Fun Studio có thể liên hệ tư vấn nhanh nhất) (*Bắt buộc)"
                />
              </div>
              <RegisterFieldGroup label="Email: (Nhận tài liệu và thông tin chi tiết về nhượng quyền)">
                <p className="mb-0.5 mt-0 text-base leading-snug text-brand-placeholder phone:text-brand-caption">
                  Bạn muốn nhận tư vấn về dịch vụ nào (*Bắt buộc)
                </p>
                {REGISTER_FORM_DEMAND_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="serviceNeeds">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <RegisterFieldGroup label="Bạn đã có mặt bằng kinh doanh chưa?">
                {REGISTER_FORM_LOCATION_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="locationStatus">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <RegisterFieldGroup label="Địa chỉ: (đường, phường, thành phố) dự kiến mở cửa hàng:">
                <p className="mb-0.5 mt-0 text-base leading-snug text-brand-placeholder phone:text-brand-caption">
                  Thời gian dự kiến nhượng quyền:
                </p>
                {REGISTER_FORM_TIMING_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="openingTimeline">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <RegisterFieldGroup label="Số vốn dự kiến đầu tư:">
                {REGISTER_FORM_BUDGET_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="investmentBudget">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <div>
                <label className="sr-only" htmlFor="franchise-register-note">
                  Ghi chú thêm
                </label>
                <textarea
                  aria-label="Ghi chu them"
                  id="franchise-register-note"
                  name="note"
                  rows={5}
                  className={cx(FORM_INPUT_CLASS, 'resize-y py-3.5')}
                  placeholder="Ghi chú thêm (nếu có):"
                />
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-1.8 gap-y-3 text-brand-caption text-brand-placeholder">
              <button
                type="submit"
                className="inline-flex min-h-5.8 items-center justify-center rounded border border-brand-control-dark bg-brand-muted px-1.8 text-base font-extrabold text-brand-text transition-colors hover:bg-brand-pink hover:text-white"
              >
                Gửi đi
              </button>
              <a
                href={MARKETING_CONTACT.phoneHref}
                className="text-brand-placeholder no-underline"
              >
                Hotline tư vấn: {MARKETING_CONTACT.phone}
              </a>
              <span className="hidden h-1.8 w-px bg-brand-line md:inline-block" />
              <a
                href="mailto:Sales@funstudio.com.vn"
                className="text-brand-placeholder no-underline"
              >
                Sales@funstudio.com.vn
              </a>
            </div>
            {formMessage && (
              <p
                className="mb-0 mt-3.5 text-brand-caption font-medium text-brand-pink"
                role="status"
              >
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export const MarketingContactStrip: React.FC = () => (
  <section className="hidden">
    <a href={MARKETING_CONTACT.phoneHref}>{MARKETING_CONTACT.phoneLabel}</a>
  </section>
);
