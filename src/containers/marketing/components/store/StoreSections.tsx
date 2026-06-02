import { useEffect, useMemo, useState } from 'react';
import type React from 'react';
import cx from 'classnames';
import storeIcon from 'assets/icons/store.png';
import Image from 'components/image/Image';
import {
  funStores,
  ProvinceNames,
  ProvinceOfRegions,
  ProvinceTypes,
  RegionLocationName,
  RegionLocationType,
  type StoreType,
} from 'store/static-data/static-data.data';
import { useCarouselIndex } from '../../hooks/useCarouselIndex';
import { useResponsiveVisibleCount } from '../../hooks/useResponsiveVisibleCount';
import Carousel from '../Carousel';
import Media from '../Media';
import SliderControls from '../SliderControls';

const STORE_MAP_IMAGE = '/images/generated/store-vietnam-map.svg';

const STORE_REGION_ORDER = [
  RegionLocationType.NORTH,
  RegionLocationType.MIDDLE,
  RegionLocationType.SOUTH,
];

const STORE_REGION_PANEL_CLASS: Record<RegionLocationType, string> = {
  [RegionLocationType.NORTH]: 'left-[9rem] top-20 w-[15rem]',
  [RegionLocationType.MIDDLE]: 'left-[20rem] top-[23.875rem] w-[20rem]',
  [RegionLocationType.SOUTH]: 'left-[9rem] top-[46.875rem] w-[15rem]',
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

export type StoreRegionData = {
  type: RegionLocationType;
  name: string;
  provinces: ProvinceTypes[];
  stores: StoreProvinceSummary[];
};

const getProvinceName = (provinceType: ProvinceTypes) =>
  ProvinceNames[provinceType] || '';

const getProvinceStores = (provinceType: ProvinceTypes) =>
  funStores.filter((store) => store.storeLocation === provinceType);

export const STORE_REGIONS: StoreRegionData[] = STORE_REGION_ORDER.map(
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

const VietnamStoreSvg: React.FC = () => (
  <Image
    src={STORE_MAP_IMAGE}
    alt="Bản đồ hệ thống cửa hàng Fun Studio tại Việt Nam"
    fill
    sizes="(max-width: 900px) 100vw, 800px"
    className="object-contain"
  />
);

const StoreMapConnectors: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 text-brand-pink map:hidden"
  >
    <span className="absolute left-[26.25rem] top-56 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink" />
    <span className="absolute left-[26.25rem] top-56 h-px w-12 bg-brand-pink" />
    <span className="absolute left-[29.25rem] top-56 h-24 w-px bg-brand-pink" />
    <span className="absolute left-[29.25rem] top-80 h-0 w-0 -translate-x-1/2 border-l-[0.375rem] border-r-[0.375rem] border-t-[0.5rem] border-l-transparent border-r-transparent border-t-brand-pink" />
    <span className="absolute left-[19.1875rem] top-[37.5rem] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink" />
    <span className="absolute left-[15.625rem] top-[37.5rem] h-px w-[3.5625rem] bg-brand-pink" />
    <span className="absolute left-[15.625rem] top-[37.5rem] h-[8.4375rem] w-px bg-brand-pink" />
    <span className="absolute left-[15.625rem] top-[45.9375rem] h-0 w-0 -translate-x-1/2 border-l-[0.375rem] border-r-[0.375rem] border-t-[0.5rem] border-l-transparent border-r-transparent border-t-brand-pink" />
  </div>
);

type StoreListPopupProps = {
  province: StoreProvinceSummary | null;
  stores: StoreType[];
  onClose: () => void;
};

const StoreListPopup: React.FC<StoreListPopupProps> = ({
  province,
  stores,
  onClose,
}) => {
  if (!province) {
    return null;
  }

  const titleId = `store-list-popup-${province.provinceType}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-z-index-popup flex items-center justify-center bg-black/70 px-6 py-6 phone:px-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[86vh] w-full max-w-[72rem] flex-col overflow-hidden rounded-lg bg-white shadow-brand-hairline"
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <header className="flex items-start justify-between gap-6 border-b border-brand-soft-line px-8 py-6 phone:px-5 phone:py-4">
          <h2
            id={titleId}
            className="m-0 text-brand-card-title font-extrabold uppercase text-brand-pink phone:text-lg"
          >
            Danh sách cửa hàng {province.province}
          </h2>
          <button
            type="button"
            aria-label="Đóng danh sách cửa hàng"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-soft-line bg-white text-2xl leading-none text-brand-pink transition-colors hover:border-brand-pink-hover hover:text-brand-pink-hover"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <div className="overflow-y-auto px-8 py-8 phone:px-5 phone:py-5">
          {stores.length ? (
            <div className="grid grid-cols-3 gap-6 tablet:grid-cols-2 phone:grid-cols-1">
              {stores.map((store) => (
                <article
                  key={`${store.storeLocation}-${store.value}`}
                  className="overflow-hidden rounded-lg border border-brand-soft-line/70 bg-white text-left"
                >
                  <Media
                    src={store.image}
                    alt={store.alt || store.labelIndex}
                    className="aspect-square"
                    sizes="(max-width: 768px) 100vw, 360px"
                    loading="eager"
                    fetchPriority="low"
                  />
                  <div className="px-5 pb-5 pt-4">
                    <h3 className="mb-3 mt-0 text-lg font-extrabold uppercase leading-snug text-brand-pink phone:text-base">
                      {store.labelIndex}
                    </h3>
                    <p className="m-0 text-brand-body leading-relaxed text-brand-text phone:text-sm">
                      {store.label}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="m-0 text-center text-brand-body text-brand-text">
              Chưa có cửa hàng trong khu vực này.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const StoreCoverageMap: React.FC = () => (
  <div className="relative mx-auto h-store-coverage max-w-marketing map:grid map:h-auto map:max-w-store-map map:grid-cols-1 map:gap-[4.375rem]">
    <div className="absolute -top-12 left-[31.25rem] h-store-map-art w-store-map-art map:static map:h-[38.75rem] map:w-full phone:h-[25rem]">
      <VietnamStoreSvg />
    </div>
    <StoreMapConnectors />
    <div className="contents map:grid map:grid-cols-3 map:gap-10 phone:grid-cols-1">
      {STORE_REGIONS.map((region) => (
        <article
          key={region.type}
          className={cx(
            'absolute rounded-2xl bg-brand-pink p-2 text-white shadow-brand-hairline map:static map:w-full',
            STORE_REGION_PANEL_CLASS[region.type],
          )}
        >
          <h2 className="m-0 flex h-12 items-center justify-center rounded-t-xl bg-white px-6 text-center text-marketing-card-heading font-extrabold uppercase text-brand-pink">
            {region.name}
          </h2>
          <ul className="m-0 list-none px-6 pb-5 pt-3 text-lg font-normal">
            {STORE_REGION_DISPLAY_PROVINCES[region.type].map((province) => (
              <li key={province} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-marketing-map-bullet">
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

export const StoreRegionCarousel: React.FC<{ region: StoreRegionData }> = ({
  region,
}) => {
  const [activeProvince, setActiveProvince] =
    useState<StoreProvinceSummary | null>(null);
  const storeCarousel = useCarouselIndex(region.stores.length);
  const storeVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });
  const activeProvinceStores = useMemo(
    () =>
      activeProvince ? getProvinceStores(activeProvince.provinceType) : [],
    [activeProvince],
  );

  useEffect(() => {
    if (!activeProvince) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProvince(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProvince]);

  return (
    <div className="mt-20 phone:mt-14">
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
        viewportClassName="-mx-10 phone:mx-0"
        itemClassName="px-10 phone:px-0"
        renderItem={(store) => (
          <div className="text-center">
            <article className="border border-brand-soft-line/70 bg-white">
              <h3 className="m-0 flex h-[4.375rem] items-center justify-center text-brand-card-title font-extrabold uppercase text-brand-pink">
                {store.province}
              </h3>
              <Media
                src={store.image}
                alt={`Cửa hàng photobooth Fun Studio tại ${store.province}`}
                className="aspect-square"
                sizes="(max-width: 768px) 100vw, 420px"
                loading="eager"
                fetchPriority="low"
              />
              <p className="m-0 flex h-[4.375rem] items-center justify-center gap-5 text-marketing-control text-brand-pink">
                <Image src={storeIcon} alt="" width={24} height={24} />
                <strong>{store.count} cửa hàng</strong>
              </p>
            </article>
            <button
              type="button"
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-full border border-brand-soft-line bg-white px-12 text-brand-body text-brand-pink transition-colors hover:border-brand-pink-hover hover:text-brand-pink-hover"
              onClick={() => setActiveProvince(store)}
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
      <StoreListPopup
        province={activeProvince}
        stores={activeProvinceStores}
        onClose={() => setActiveProvince(null)}
      />
    </div>
  );
};
