import React, { useEffect, useState } from 'react';
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
  SERVICE_MODELS,
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
  <div className={cx('relative overflow-hidden bg-[#f8f8f8]', className)}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cx('object-cover', imageClassName)}
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
      'mx-auto mb-[54px] max-w-[1240px] text-center font-Montserrat text-[clamp(28px,2.1vw,40px)] font-normal uppercase leading-[1.38] [@media(max-width:768px)]:mb-[36px] [@media(max-width:768px)]:text-[26px]',
      muted ? 'text-white' : 'text-[#f7b5b9]',
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

const useCarouselIndex = (count: number) => {
  const [position, setPosition] = useState(0);
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

const HOME_VIDEO_SLIDES = [
  HOME_VIDEO,
  ...PRESS_ITEMS.slice(0, 2).map((item) => ({
    image: item.image,
    title: item.title,
  })),
];

const ARROW_CLASS =
  'z-[2] inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#f7b5b9] bg-white/85 text-[36px] leading-none text-[#f7b5b9] [@media(max-width:768px)]:h-[36px] [@media(max-width:768px)]:w-[36px] [@media(max-width:768px)]:text-[28px]';

const SliderControls: React.FC<{
  count: number;
  current: number;
  light?: boolean;
  onChange: (index: number) => void;
}> = ({ count, current, light, onChange }) => {
  if (count <= 1) {
    return null;
  }

  const dotBaseClass = cx(
    'h-[22px] w-[22px] rounded-full border',
    light ? 'border-white' : 'border-[#f7b5b9]',
  );
  const activeDotClass = light ? 'bg-white' : 'bg-[#f7b5b9]';

  return (
    <div className="mt-[34px] flex items-center justify-center gap-[18px]">
      <button
        type="button"
        aria-label="previous"
        className={cx(
          'h-[22px] w-[22px] rounded-full border text-[22px] leading-[18px]',
          light
            ? 'border-white bg-transparent text-white'
            : 'border-[#f7b5b9] bg-white text-[#f7b5b9]',
        )}
        onClick={() => onChange(current - 1)}
      >
        {'<'}
      </button>
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
      <button
        type="button"
        aria-label="next"
        className={cx(
          'h-[22px] w-[22px] rounded-full border text-[22px] leading-[18px]',
          light
            ? 'border-white bg-transparent text-white'
            : 'border-[#f7b5b9] bg-white text-[#f7b5b9]',
        )}
        onClick={() => onChange(current + 1)}
      >
        {'>'}
      </button>
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

type CarouselProps<T> = {
  items: T[];
  position: number;
  visibleCount?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T, index: number) => string;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
};

const Carousel = <T,>({
  items,
  position,
  visibleCount = 1,
  renderItem,
  getKey,
  viewportClassName,
  trackClassName,
  itemClassName,
}: CarouselProps<T>) => {
  const count = items.length;

  if (!count) {
    return null;
  }

  const safeVisibleCount = Math.max(1, Math.min(visibleCount, count));
  const repeatBuffer = 2 + Math.ceil(Math.abs(position) / count);
  const totalItems = count * (repeatBuffer * 2 + 1);
  const offsetIndex = count * repeatBuffer + position;

  return (
    <div className={cx('overflow-hidden', viewportClassName)}>
      <div
        className={cx(
          'flex transition-transform duration-500 ease-out will-change-transform',
          trackClassName,
        )}
        style={{
          width: `${(totalItems / safeVisibleCount) * 100}%`,
          transform: `translate3d(-${(offsetIndex / totalItems) * 100}%, 0, 0)`,
        }}
      >
        {Array.from({ length: totalItems }, (_, loopIndex) => {
          const itemIndex = loopIndex % count;
          const item = items[itemIndex];

          return (
            <div
              key={`${loopIndex}-${getKey(item, itemIndex)}`}
              className={cx('shrink-0', itemClassName)}
              style={{ flexBasis: `${100 / totalItems}%` }}
            >
              {renderItem(item, itemIndex)}
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
}> = ({ index, icon, title, text, compact }) => (
  <article
    className={cx(
      'relative rounded-[8px] border border-[#bcbec0] bg-white text-[#606060]',
      compact
        ? 'min-h-[235px] px-[28px] pb-[28px] pt-[54px]'
        : 'min-h-[300px] px-[36px] pb-[36px] pt-[66px]',
    )}
  >
    {typeof index === 'number' && (
      <div className="absolute left-1/2 top-[-34px] flex h-[76px] w-[76px] -translate-x-1/2 items-center justify-center rounded-full border border-[#d8dada] bg-white text-[34px] font-bold text-[#f7b5b9]">
        {index}
      </div>
    )}
    {icon && (
      <div className="absolute left-1/2 top-[-34px] flex h-[76px] w-[76px] -translate-x-1/2 items-center justify-center rounded-full border border-[#d8dada] bg-[#f7b5b9]">
        <Image src={icon} alt="" width={42} height={42} />
      </div>
    )}
    {title && (
      <h3 className="mb-[24px] mt-0 text-[20px] font-extrabold uppercase leading-[1.3] text-[#f7b5b9]">
        {title}
      </h3>
    )}
    <p className="m-0 text-[18px] leading-[1.55] [@media(max-width:768px)]:text-[16px]">
      {text}
    </p>
  </article>
);

const FooterSpacer: React.FC = () => <div className="h-[24px]" />;

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
  'w-full overflow-hidden bg-white font-Montserrat text-[#606060]';
const CONTAINER_CLASS =
  'mx-auto w-[min(1400px,calc(100%_-_48px))] [@media(max-width:768px)]:w-[min(100%_-_32px,640px)]';
const GALLERY_PAGE_SIZE = 12;
const SECTION_CLASS = 'py-[72px] [@media(max-width:768px)]:py-[48px]';
const LEFT_FLOAT_ARROW_CLASS =
  'absolute left-[-30px] top-1/2 -translate-y-1/2 [@media(max-width:768px)]:left-[8px]';
const RIGHT_FLOAT_ARROW_CLASS =
  'absolute right-[-30px] top-1/2 -translate-y-1/2 [@media(max-width:768px)]:right-[8px]';
const CARD_TITLE_CLASS =
  'mx-[28px] mb-[18px] mt-[28px] text-[24px] font-extrabold uppercase leading-[1.35] text-[#f7b5b9]';
const CARD_TEXT_CLASS =
  'mx-[28px] mb-[34px] mt-0 text-[18px] leading-[1.55] text-[#606060] [@media(max-width:768px)]:text-[16px]';
const LEAD_CLASS =
  'mx-auto mb-[56px] mt-[32px] max-w-[1400px] text-left text-[20px] leading-[1.65] text-[#606060] [@media(max-width:768px)]:text-[16px]';
const STORE_REGION_ORDER = [
  RegionLocationType.NORTH,
  RegionLocationType.MIDDLE,
  RegionLocationType.SOUTH,
];
const STORE_REGION_COLORS: Record<RegionLocationType, string> = {
  [RegionLocationType.NORTH]: '#9da1a5',
  [RegionLocationType.MIDDLE]: '#b9bdc1',
  [RegionLocationType.SOUTH]: '#70777c',
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

type StoreMapLabelPosition = {
  markerX: number;
  markerY: number;
  labelX: number;
  labelY: number;
};

type StoreMapLabel = StoreMapLabelPosition & {
  provinceType: ProvinceTypes;
  name: string;
};

const STORE_MAP_LABEL_POSITIONS: Partial<
  Record<ProvinceTypes, StoreMapLabelPosition>
> = {
  [ProvinceTypes.TUYEN_QUANG]: {
    markerX: 330,
    markerY: 72,
    labelX: 500,
    labelY: 62,
  },
  [ProvinceTypes.PHU_THO]: {
    markerX: 320,
    markerY: 120,
    labelX: 500,
    labelY: 96,
  },
  [ProvinceTypes.BAC_NINH]: {
    markerX: 372,
    markerY: 142,
    labelX: 500,
    labelY: 130,
  },
  [ProvinceTypes.QUANG_NINH]: {
    markerX: 425,
    markerY: 122,
    labelX: 500,
    labelY: 164,
  },
  [ProvinceTypes.HAIPHONG]: {
    markerX: 400,
    markerY: 168,
    labelX: 500,
    labelY: 198,
  },
  [ProvinceTypes.HUNG_YEN]: {
    markerX: 370,
    markerY: 188,
    labelX: 500,
    labelY: 232,
  },
  [ProvinceTypes.HANOI]: {
    markerX: 352,
    markerY: 164,
    labelX: 500,
    labelY: 266,
  },
  [ProvinceTypes.NGHE_AN]: {
    markerX: 348,
    markerY: 320,
    labelX: 500,
    labelY: 330,
  },
  [ProvinceTypes.HA_TINH]: {
    markerX: 366,
    markerY: 372,
    labelX: 500,
    labelY: 374,
  },
  [ProvinceTypes.HUE]: {
    markerX: 392,
    markerY: 446,
    labelX: 500,
    labelY: 430,
  },
  [ProvinceTypes.DA_NANG]: {
    markerX: 415,
    markerY: 484,
    labelX: 500,
    labelY: 474,
  },
  [ProvinceTypes.LAM_DONG]: {
    markerX: 405,
    markerY: 612,
    labelX: 500,
    labelY: 590,
  },
  [ProvinceTypes.BINH_THUAN]: {
    markerX: 440,
    markerY: 650,
    labelX: 500,
    labelY: 634,
  },
  [ProvinceTypes.TAY_NINH]: {
    markerX: 328,
    markerY: 672,
    labelX: 500,
    labelY: 690,
  },
  [ProvinceTypes.DONG_NAI]: {
    markerX: 392,
    markerY: 690,
    labelX: 500,
    labelY: 724,
  },
  [ProvinceTypes.HCM]: {
    markerX: 355,
    markerY: 720,
    labelX: 500,
    labelY: 758,
  },
  [ProvinceTypes.LONG_AN]: {
    markerX: 332,
    markerY: 735,
    labelX: 500,
    labelY: 792,
  },
};

const getProvinceName = (provinceType: ProvinceTypes) =>
  ProvinceNames[provinceType] || '';

const getProvinceStores = (provinceType: ProvinceTypes) =>
  funStores.filter((store) => store.storeLocation === provinceType);

const getProvinceRegionType = (provinceType: ProvinceTypes) =>
  STORE_REGION_ORDER.find((regionType) =>
    ProvinceOfRegions[regionType].includes(provinceType),
  ) || RegionLocationType.NORTH;

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

const STORE_MAP_LABELS: StoreMapLabel[] = STORE_REGION_ORDER.flatMap(
  (regionType) => ProvinceOfRegions[regionType],
)
  .map((provinceType) => {
    const position = STORE_MAP_LABEL_POSITIONS[provinceType];

    if (!position) {
      return null;
    }

    return {
      provinceType,
      name: getProvinceName(provinceType),
      ...position,
    };
  })
  .filter((label): label is StoreMapLabel => Boolean(label));
const FORM_INPUT_CLASS =
  'min-h-[52px] w-full rounded-[4px] border border-[#9a9a9a] bg-white px-[16px] text-[16px] leading-[1.4] text-[#606060] outline-none placeholder:text-[#b8b8b8] focus:border-[#f7b5b9] focus:ring-2 focus:ring-[#f7b5b9]/30 [@media(max-width:768px)]:text-[15px]';
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
  <label className="flex min-h-[34px] cursor-pointer items-center gap-[12px] text-[16px] leading-[1.35] text-[#606060] [@media(max-width:768px)]:text-[15px]">
    <input
      aria-label={String(children)}
      type="checkbox"
      name={name}
      value={String(children)}
      className="h-[22px] w-[22px] shrink-0 rounded-[4px] border-[#9a9a9a] accent-[#f7b5b9]"
    />
    <span>{children}</span>
  </label>
);

const RegisterFieldGroup: React.FC<{
  children: React.ReactNode;
  label?: string;
}> = ({ children, label }) => (
  <fieldset className="m-0 rounded-[4px] border border-[#9a9a9a] px-[14px] pb-[12px] pt-[14px]">
    {label && (
      <legend className="px-[2px] text-[16px] leading-[1.35] text-[#606060] [@media(max-width:768px)]:text-[15px]">
        {label}
      </legend>
    )}
    <div className="grid gap-[8px]">{children}</div>
  </fieldset>
);

export const MarketingHomePage: React.FC = () => {
  const heroCarousel = useCarouselIndex(HOME_HERO_SLIDES.length);
  const videoCarousel = useCarouselIndex(HOME_VIDEO_SLIDES.length);
  const videoSlide = HOME_VIDEO_SLIDES[videoCarousel.current];

  return (
    <main className={PAGE_CLASS}>
      <section className="relative grid grid-cols-[210px_minmax(0,1320px)_250px] justify-center gap-[50px] px-[24px] pb-[34px] pt-[42px] [@media(max-width:1180px)]:grid-cols-1 [@media(max-width:768px)]:px-[16px] [@media(max-width:768px)]:pb-[20px] [@media(max-width:768px)]:pt-[24px]">
        <div className="grid content-center gap-[16px] [@media(max-width:1180px)]:hidden">
          {PRESS_ITEMS.slice(0, 2).map((item) => (
            <Media
              key={item.title}
              src={item.image}
              alt={item.title}
              className="aspect-[1/0.74] border-[14px] border-[#f7b5b9]"
            />
          ))}
        </div>
        <div className="relative">
          <Carousel
            items={HOME_HERO_SLIDES}
            position={heroCarousel.position}
            getKey={(slide) => slide.title}
            renderItem={(slide) => (
              <div className="relative">
                <Media
                  src={slide.image}
                  alt={slide.title}
                  className="aspect-[1320/570] [@media(max-width:768px)]:aspect-[1/0.68]"
                  sizes="100vw"
                />
                <h2 className="absolute bottom-[34px] left-[30px] right-[30px] m-0 text-center text-[clamp(22px,2vw,38px)] font-extrabold uppercase leading-[1.2] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] [@media(max-width:768px)]:bottom-[20px] [@media(max-width:768px)]:text-[18px]">
                  {slide.title}
                </h2>
              </div>
            )}
          />
          <InlineArrow
            direction="previous"
            className={LEFT_FLOAT_ARROW_CLASS}
            onClick={() => heroCarousel.setSlide(heroCarousel.current - 1)}
          />
          <InlineArrow
            direction="next"
            className={RIGHT_FLOAT_ARROW_CLASS}
            onClick={() => heroCarousel.setSlide(heroCarousel.current + 1)}
          />
        </div>
        <div className="grid min-h-[315px] content-center gap-[16px] bg-[#f7b5b9] p-[36px] text-center text-[24px] font-extrabold uppercase leading-[1.35] text-white [@media(max-width:1180px)]:hidden">
          <p>Hệ thống photobooth nhượng quyền của Hàn Quốc</p>
        </div>
        <div className="col-start-2 [@media(max-width:1180px)]:col-start-1">
          <SliderControls
            count={HOME_HERO_SLIDES.length}
            current={heroCarousel.current}
            onChange={heroCarousel.setSlide}
          />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionTitle>{videoSlide.title}</SectionTitle>
          <div className="relative flex min-h-[560px] items-center justify-center [@media(max-width:768px)]:min-h-0">
            <InlineArrow
              direction="previous"
              onClick={() => videoCarousel.setSlide(videoCarousel.current - 1)}
            />
            <Carousel
              items={HOME_VIDEO_SLIDES}
              position={videoCarousel.position}
              getKey={(slide) => slide.title}
              viewportClassName="w-[min(940px,86vw)] [@media(max-width:768px)]:w-full"
              renderItem={(slide) => (
                <div className="relative">
                  <Media
                    src={slide.image}
                    alt={slide.title}
                    className="aspect-[940/585] rounded-[24px] border-[14px] border-[#f6f6f6] shadow-[0_0_0_1px_#d9d9d9] [@media(max-width:768px)]:rounded-[14px] [@media(max-width:768px)]:border-[8px]"
                    sizes="(max-width: 768px) 90vw, 760px"
                  />
                  <button
                    type="button"
                    aria-label="play video"
                    className="absolute left-1/2 top-1/2 flex h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-[#ff0000] text-[32px] text-white [@media(max-width:768px)]:h-[58px] [@media(max-width:768px)]:w-[58px] [@media(max-width:768px)]:text-[22px]"
                  >
                    &#9654;
                  </button>
                </div>
              )}
            />
            <InlineArrow
              direction="next"
              onClick={() => videoCarousel.setSlide(videoCarousel.current + 1)}
            />
          </div>
          <SliderControls
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
          <div className="grid grid-cols-2 items-start gap-[80px] [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[28px]">
            <div className="text-[20px] leading-[1.6] text-[#606060] [@media(max-width:768px)]:text-[16px]">
              {ABOUT_COPY.map((paragraph) => (
                <p key={paragraph} className="mb-[24px] mt-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid gap-[38px]">
              {ABOUT_IMAGES.map((image) => (
                <Media
                  key={getImageKey(image, 'about-image')}
                  src={image}
                  alt="Fun Studio"
                  className="aspect-[700/360]"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[72px] pt-[36px] [@media(max-width:768px)]:py-[48px]">
        <div className={CONTAINER_CLASS}>
          <SectionTitle>Quá trình hình thành & phát triển</SectionTitle>
          <div className="grid grid-cols-8 items-stretch gap-[18px] [@media(max-width:1180px)]:grid-cols-4 [@media(max-width:768px)]:grid-cols-2">
            {DEVELOPMENT_TIMELINE.map(([date, text]) => (
              <article
                key={date}
                className="min-h-[240px] rounded-[14px] bg-[#f7b5b9] px-[14px] py-[24px] text-center text-white"
              >
                <strong className="mb-[18px] block text-[18px]">{date}</strong>
                <p className="m-0 text-[17px] font-bold leading-[1.35]">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(SECTION_CLASS, 'bg-[#f7b5b9]')}>
        <div className={cx(CONTAINER_CLASS, '[&>h1]:text-white')}>
          <SectionTitle>Khách hàng của chúng tôi</SectionTitle>
          <div className="grid grid-cols-6 gap-[22px] [@media(max-width:1180px)]:grid-cols-4 [@media(max-width:768px)]:grid-cols-2">
            {CUSTOMER_LOGOS.map((client) => (
              <div
                key={client.name}
                className="flex min-h-[95px] items-center justify-center bg-white p-[16px] text-center text-[18px] font-extrabold text-[#606060]"
              >
                {client.image ? (
                  <Image
                    src={client.image}
                    alt={client.name}
                    className="max-h-[58px] max-w-[118px] object-contain"
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
    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionTitle>
          Photobooth không chỉ là trào lưu còn là cơ hội để bạn bắt đầu câu
          chuyện thành công
        </SectionTitle>
        <div className="grid grid-cols-3 gap-[36px] [@media(max-width:768px)]:grid-cols-1">
          {FRANCHISE_TOP_IMAGES.map((image) => (
            <Media
              key={getImageKey(image, 'franchise-image')}
              src={image}
              alt="Nhượng quyền Fun Studio"
              sizes="(max-width: 768px) 100vw, 420px"
              className="aspect-[450/310]"
            />
          ))}
        </div>
        <p className={LEAD_CLASS}>
          Photobooth không còn là xu hướng nhất thời, mà đã trở thành một mô
          hình kinh doanh hấp dẫn và sinh lời bền vững. Với Fun Studio, chuỗi
          photobooth nhượng quyền lớn nhất Việt Nam, đối tác được đồng hành từ
          A-Z trong vận hành và phát triển.
        </p>

        <div className="mt-[64px] grid grid-cols-[1fr_1.45fr] items-stretch gap-[36px] [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[28px]">
          <article className="border border-[#bcbec0] px-[56px] py-[70px] [@media(max-width:768px)]:px-[24px] [@media(max-width:768px)]:py-[32px] [&>h2]:mb-[48px] [&>h2]:mt-0 [&>h2]:text-[30px] [&>h2]:font-extrabold [&>h2]:uppercase [&>h2]:leading-[1.4] [&>h2]:text-[#f7b5b9] [&>p]:mb-[28px] [&>p]:mt-0 [&>p]:text-[20px] [&>p]:leading-[1.55] [@media(max-width:768px)]:[&>p]:text-[16px]">
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
          </article>
          <div className="grid grid-cols-2 gap-[18px] [&>div]:aspect-square">
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

    <section className={cx(SECTION_CLASS, 'bg-[#f7b5b9]')}>
      <div className={CONTAINER_CLASS}>
        <SectionTitle muted>
          Lý do nên trở thành đối tác của Fun Studio chuỗi photobooth nhượng
          quyền lớn nhất Việt Nam
        </SectionTitle>
        <div className="grid grid-cols-4 gap-[38px] pt-[36px] [@media(max-width:1180px)]:grid-cols-2 [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-x-[20px] [@media(max-width:768px)]:gap-y-[56px]">
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

    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionTitle>
          6 dịch vụ miễn phí dành riêng cho đối tác của Fun Studio
        </SectionTitle>
        <div className="grid grid-cols-3 gap-x-[28px] gap-y-[72px] pt-[36px] [@media(max-width:1180px)]:grid-cols-2 [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-x-[20px] [@media(max-width:768px)]:gap-y-[56px]">
          {FREE_SERVICE_CARDS.map((card, index) => (
            <InfoCard
              key={card.title}
              index={index + 1}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </div>
    </section>
  </main>
);

export const ServicesPage: React.FC = () => {
  const productCarousel = useCarouselIndex(PRODUCT_MACHINES.length);
  const conceptCarousel = useCarouselIndex(CONCEPT_CARDS.length);
  const productVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });
  const conceptVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <main className={PAGE_CLASS}>
      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionTitle>Dải dòng máy Fun Studio</SectionTitle>
          <Carousel
            items={PRODUCT_MACHINES}
            position={productCarousel.position}
            visibleCount={productVisibleCount}
            getKey={(machine) => machine.title}
            viewportClassName="-mx-[18px] [@media(max-width:768px)]:mx-0"
            itemClassName="px-[18px] [@media(max-width:768px)]:px-0"
            renderItem={(machine) => (
              <article className="border border-[#bcbec0] bg-white">
                <Media
                  src={machine.image}
                  alt={machine.title}
                  className="aspect-[1/0.72]"
                />
                <h3 className={CARD_TITLE_CLASS}>{machine.title}</h3>
                <p className={CARD_TEXT_CLASS}>{machine.text}</p>
              </article>
            )}
          />
          <SliderControls
            count={PRODUCT_MACHINES.length}
            current={productCarousel.current}
            onChange={productCarousel.setSlide}
          />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionTitle>Dịch vụ bán máy</SectionTitle>
          <h2 className="mb-[44px] mt-[-24px] text-center text-[clamp(22px,1.55vw,30px)] font-medium uppercase text-[#f7b5b9]">
            Kinh doanh Photobooth phù hợp với
          </h2>
          <div className="mb-[78px] grid grid-cols-3 gap-[38px] pt-[36px] [@media(max-width:1180px)]:grid-cols-2 [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-x-[20px] [@media(max-width:768px)]:gap-y-[56px]">
            {BUSINESS_FIT_CARDS.map((card) => (
              <InfoCard
                key={card.text}
                icon={card.icon}
                text={card.text}
                compact
              />
            ))}
          </div>
          <h2 className="mb-[44px] mt-[-24px] text-center text-[clamp(22px,1.55vw,30px)] font-medium uppercase text-[#f7b5b9]">
            Các mô hình kết hợp photobooth
          </h2>
          <div className="grid grid-cols-2 gap-[80px] [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[28px]">
            {SERVICE_MODELS.map((model) => (
              <article
                key={model.title}
                className="border border-[#bcbec0] bg-white"
              >
                <Media
                  src={model.image}
                  alt={model.title}
                  className="aspect-[680/420]"
                />
                <h3 className={CARD_TITLE_CLASS}>{model.title}</h3>
                <p className={CARD_TEXT_CLASS}>{model.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(SECTION_CLASS, 'bg-[#f7b5b9]')}>
        <div className={CONTAINER_CLASS}>
          <SectionTitle muted>Concept phòng chụp</SectionTitle>
          <Carousel
            items={CONCEPT_CARDS}
            position={conceptCarousel.position}
            visibleCount={conceptVisibleCount}
            getKey={(concept) => getImageKey(concept.image, 'concept-image')}
            viewportClassName="-mx-[18px] [@media(max-width:768px)]:mx-0"
            itemClassName="px-[18px] [@media(max-width:768px)]:px-0"
            renderItem={(concept) => (
              <article className="bg-white [&>div]:aspect-[420/320]">
                <Media src={concept.image} alt="Concept phòng chụp" />
                <h3 className={CARD_TITLE_CLASS}>{concept.title}</h3>
                <p className={CARD_TEXT_CLASS}>
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

      {RENTAL_SECTIONS.map((section) => (
        <section key={section.title} className={SECTION_CLASS}>
          <div className={CONTAINER_CLASS}>
            <SectionTitle>{section.title}</SectionTitle>
            <p className={LEAD_CLASS}>{section.intro}</p>
            <div className="mb-[48px] grid grid-cols-3 gap-[34px] [@media(max-width:768px)]:grid-cols-1 [&>div]:aspect-[1/0.72]">
              {section.images.map((image) => (
                <Media
                  key={getImageKey(image, section.title)}
                  src={image}
                  alt={section.title}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-[80px] [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[28px]">
              {section.cards.map((card) => (
                <article
                  key={card.title}
                  className="border border-[#bcbec0] bg-white"
                >
                  <Media
                    src={card.image}
                    alt={card.title}
                    className="aspect-[680/420]"
                  />
                  <h3 className={CARD_TITLE_CLASS}>{card.title}</h3>
                  <p className={CARD_TEXT_CLASS}>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

const VietnamStoreSvg: React.FC = () => (
  <svg
    viewBox="0 0 640 820"
    role="img"
    aria-label="Ban do he thong cua hang Fun Studio tai Viet Nam"
    className="h-full w-full"
  >
    <defs>
      <filter
        id="store-map-shadow"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
      >
        <feDropShadow
          dx="0"
          dy="6"
          floodColor="#d4d4d4"
          floodOpacity="0.6"
          stdDeviation="4"
        />
      </filter>
    </defs>
    <rect width="640" height="820" fill="#ffffff" />
    <g
      filter="url(#store-map-shadow)"
      stroke="#d6d8da"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path
        d="M292 40C335 10 384 30 407 66C444 67 461 94 445 127C470 147 452 185 414 184C396 212 359 205 345 178C318 194 282 187 271 158C239 151 233 116 258 96C246 68 263 48 292 40Z"
        fill="#e8eaec"
      />
      <path
        d="M356 176C386 206 386 250 367 284C394 316 385 360 408 392C429 422 424 454 446 489C462 514 449 548 466 578C479 605 455 634 427 624C397 597 398 551 389 514C382 472 355 449 351 407C346 362 329 335 332 298C337 256 327 223 356 176Z"
        fill="#dde0e3"
      />
      <path
        d="M407 610C446 608 492 630 502 669C488 706 455 716 430 705C409 746 353 752 328 719C300 719 284 688 303 665C327 634 366 642 386 620C392 615 399 612 407 610Z"
        fill="#e3e5e7"
      />
    </g>
    <g>
      {STORE_MAP_LABELS.map((label) => {
        const lineEndX = label.labelX - 16;
        const fill =
          STORE_REGION_COLORS[getProvinceRegionType(label.provinceType)];

        return (
          <React.Fragment key={label.provinceType}>
            <path
              d={`M ${label.markerX} ${label.markerY} L ${lineEndX} ${label.labelY}`}
              fill="none"
              stroke="#8b9095"
              strokeDasharray="4 5"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle
              cx={label.markerX}
              cy={label.markerY}
              fill={fill}
              r="9"
              stroke="#ffffff"
              strokeWidth="3"
            />
            <text
              x={label.labelX}
              y={label.labelY + 5}
              fill="#606060"
              fontFamily="Montserrat, sans-serif"
              fontSize="18"
              fontWeight="500"
              textAnchor="end"
            >
              {label.name}
            </text>
          </React.Fragment>
        );
      })}
    </g>
  </svg>
);

const StoreCoverageMap: React.FC = () => (
  <div className="mx-auto grid max-w-[1180px] grid-cols-[360px_minmax(0,1fr)] items-center gap-[36px] [@media(max-width:900px)]:grid-cols-1 [@media(max-width:900px)]:gap-[28px]">
    <div className="grid gap-[24px] [@media(max-width:900px)]:grid-cols-3 [@media(max-width:768px)]:grid-cols-1">
      {STORE_REGIONS.map((region) => (
        <article
          key={region.type}
          className="rounded-[8px] bg-[#f7b5b9] p-[12px] text-white"
        >
          <h2 className="mb-[14px] mt-0 rounded-[4px] bg-white px-[16px] py-[8px] text-center text-[24px] font-extrabold uppercase text-[#f7b5b9] [@media(max-width:768px)]:text-[20px]">
            {region.name}
          </h2>
          <ul className="m-0 list-none px-[18px] pb-[14px] pt-[2px] text-[20px] leading-[1.75] [@media(max-width:768px)]:text-[18px]">
            {region.provinces.map((provinceType) => (
              <li key={provinceType} className="flex items-center gap-[12px]">
                <span aria-hidden="true" className="text-[24px] leading-none">
                  *
                </span>
                <span>{getProvinceName(provinceType)}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
    <div className="min-h-[620px] w-full [@media(max-width:900px)]:min-h-0">
      <VietnamStoreSvg />
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
    <div className="mt-[78px] [@media(max-width:768px)]:mt-[54px]">
      <h2 className="mb-[48px] mt-0 text-center text-[28px] font-extrabold uppercase text-[#bcbec0]">
        {region.name}
      </h2>
      <Carousel
        items={region.stores}
        position={storeCarousel.position}
        visibleCount={storeVisibleCount}
        getKey={(store) => `${region.type}-${store.provinceType}`}
        viewportClassName="-mx-[40px] [@media(max-width:768px)]:mx-0"
        itemClassName="px-[40px] [@media(max-width:768px)]:px-0"
        renderItem={(store) => (
          <article className="border border-[#e0e0e0] text-center">
            <h3 className="my-[24px] text-[26px] font-extrabold uppercase text-[#f7b5b9]">
              {store.province}
            </h3>
            <Media
              src={store.image}
              alt={store.province}
              className="aspect-square"
            />
            <p className="mb-[14px] mt-[24px] inline-flex items-center gap-[10px] text-[22px] text-[#f7b5b9]">
              <Image src={storeIcon} alt="" width={24} height={24} />
              <strong>{store.count} cửa hàng</strong>
            </p>
            <button
              type="button"
              className="mb-[28px] rounded-full border border-[#f7b5b9] bg-white px-[26px] py-[8px] text-[#f7b5b9]"
            >
              Xem thÃªm
            </button>
          </article>
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
    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionTitle>Hệ thống 80 cửa hàng trên toàn quốc</SectionTitle>
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
      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <div className="relative pt-[36px]">
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
              viewportClassName="-mx-[18px] [@media(max-width:768px)]:mx-0"
              itemClassName="px-[18px] [@media(max-width:768px)]:px-0"
              renderItem={(card) => (
                <article className="border border-[#606060] bg-white">
                  <Media
                    src={card.image}
                    alt={card.title}
                    className="aspect-square"
                  />
                  <div>
                    <h2 className={cx(CARD_TITLE_CLASS, 'min-h-[96px]')}>
                      {card.title}
                    </h2>
                    <p className={CARD_TEXT_CLASS}>{card.text}</p>
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
          <SliderControls
            count={NEWS_CARDS.length}
            current={newsCarousel.current}
            onChange={newsCarousel.setSlide}
          />
        </div>
      </section>
      <FooterSpacer />
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
      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <Carousel
            items={galleryPages}
            position={galleryCarousel.position}
            getKey={(page) => String(page)}
            renderItem={(page) => (
              <div className="grid grid-cols-6 gap-[18px] [@media(max-width:1180px)]:grid-cols-4 [@media(max-width:768px)]:grid-cols-2">
                {getPagedItems(GALLERY_ITEMS, page, GALLERY_PAGE_SIZE).map(
                  (item, visibleIndex) => {
                    const itemIndex = page * GALLERY_PAGE_SIZE + visibleIndex;

                    return (
                      <article
                        key={item.id}
                        className="group relative overflow-hidden bg-[#111]"
                      >
                        <Media
                          src={
                            itemIndex < 6 ? GALLERY_FALLBACK_IMAGE : item.image
                          }
                          alt={item.title}
                          className="aspect-square bg-[#111]"
                          imageClassName="transition-transform duration-200 group-hover:scale-[1.04]"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/80 px-[14px] pb-[14px] pt-[44px] text-white">
                          <h2 className="mb-[8px] mt-0 text-[18px] font-medium leading-[1.2]">
                            {item.title}
                          </h2>
                          <p className="m-0 text-[12px] leading-[1.3]">
                            {item.meta}
                          </p>
                        </div>
                      </article>
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
      <section className="pb-[72px] pt-[46px] [@media(max-width:768px)]:pb-[52px] [@media(max-width:768px)]:pt-[34px]">
        <div className={CONTAINER_CLASS}>
          <h1 className="mb-[44px] mt-0 text-center font-Montserrat text-[clamp(28px,2.25vw,42px)] font-normal uppercase leading-[1.25] text-[#f7b5b9] [@media(max-width:768px)]:mb-[30px] [@media(max-width:768px)]:text-[26px]">
            Form đăng ký tư vấn dịch vụ của Fun Studio
          </h1>
          <form
            noValidate
            className="mx-auto w-[min(720px,100%)] rounded-[8px] border border-[#9a9a9a] bg-white px-[24px] pb-[28px] pt-[20px] shadow-[0_1px_0_rgba(0,0,0,0.04)] [@media(max-width:768px)]:px-[16px] [@media(max-width:768px)]:pb-[22px]"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-[18px] mt-0 border-b border-[#9a9a9a] pb-[10px] text-[18px] font-extrabold uppercase leading-[1.35] text-[#f7b5b9] [@media(max-width:768px)]:text-[16px]">
              Form thông tin tư vấn nhượng quyền:
            </h2>
            <div className="grid gap-[12px]">
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
                <p className="mb-[2px] mt-0 text-[16px] leading-[1.35] text-[#b8b8b8] [@media(max-width:768px)]:text-[15px]">
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
                <p className="mb-[2px] mt-0 text-[16px] leading-[1.35] text-[#b8b8b8] [@media(max-width:768px)]:text-[15px]">
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
                  className={cx(FORM_INPUT_CLASS, 'resize-y py-[14px]')}
                  placeholder="Ghi chú thêm (nếu có):"
                />
              </div>
            </div>
            <div className="mt-[28px] flex flex-wrap items-center gap-x-[18px] gap-y-[12px] text-[15px] text-[#b8b8b8]">
              <button
                type="submit"
                className="inline-flex min-h-[58px] items-center justify-center rounded-[4px] border border-[#8f8f8f] bg-[#bcbec0] px-[18px] text-[16px] font-extrabold text-[#606060] transition-colors hover:bg-[#f7b5b9] hover:text-white"
              >
                Gửi đi
              </button>
              <a
                href={MARKETING_CONTACT.phoneHref}
                className="text-[#b8b8b8] no-underline"
              >
                Hotline tư vấn: {MARKETING_CONTACT.phone}
              </a>
              <span className="hidden h-[18px] w-px bg-[#d9d9d9] [@media(min-width:768px)]:inline-block" />
              <a
                href="mailto:Sales@funstudio.com.vn"
                className="text-[#b8b8b8] no-underline"
              >
                Sales@funstudio.com.vn
              </a>
            </div>
            {formMessage && (
              <p
                className="mb-0 mt-[14px] text-[15px] font-medium text-[#f7b5b9]"
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
