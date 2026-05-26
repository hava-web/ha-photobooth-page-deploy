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
    <span className="absolute left-31.5 top-24 h-1.8 w-1.8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink" />
    <span className="absolute left-31.5 top-24 h-px w-9 bg-brand-pink" />
    <span className="absolute left-40 top-24 h-12 w-px bg-brand-pink" />
    <span className="absolute left-20 top-70 h-1.8 w-1.8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink" />
    <span className="absolute left-10 top-70 h-px w-9 bg-brand-pink" />
    <span className="absolute left-10 top-70 h-9.6 w-px bg-brand-pink" />
  </div>
);

export const StoreCoverageMap: React.FC = () => (
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

export const StoreRegionCarousel: React.FC<{ region: StoreRegionData }> = ({
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
