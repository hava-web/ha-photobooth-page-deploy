import React, { FC, useCallback, useState } from 'react';
import { filter, forEach, get, map, size, toNumber } from 'lodash';
import cx from 'classnames';
import Image from 'components/image/Image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'hooks/useTranslation';
import storeIcon from 'assets/icons/store.png';
import { OptionProps } from 'models/common.model';
import { isEqualVal } from 'helpers/string.helper';
import { ProvinceTypes } from 'store/static-data/static-data.data';
import leftArrowIcon from 'assets/icons/left_arrow.png';
import rightArrowIcon from 'assets/icons/right_arrow.png';

type FunStoresProps = {
  stores: Array<OptionProps & { labelIndex: string; storeLocation: string }>;
};

const listStoreLocationOfType = [
  ProvinceTypes.HANOI,
  ProvinceTypes.HCM,
  ProvinceTypes.OTHER,
];

const listProvinceNames = {
  [ProvinceTypes.HANOI]: 'Hà Nội',
  [ProvinceTypes.HCM]: 'TP Hồ Chí Minh',
  [ProvinceTypes.OTHER]:
    'Các tỉnh khác: \nVĩnh Phúc, Phú Thọ, Hải Dương, Hải Phòng, Hưng Yên, \n Bắc Giang, Hà Tĩnh, Thừa Thiên Huế, Bình Dương...',
};

const FunStores: FC<FunStoresProps> = ({ stores = [] }) => {
  const { T } = useTranslation();

  const [storeSwipers, setStoreSwipers] = useState<{
    [key in ProvinceTypes]: SwiperClass | null;
  }>();
  const [canPrevs, setCanPrevs] = useState<{
    [key in ProvinceTypes]: boolean;
  }>();
  const [canNexts, setCanNexts] = useState<{
    [key in ProvinceTypes]: boolean;
  }>({
    [ProvinceTypes.HANOI]: true,
    [ProvinceTypes.HCM]: true,
    [ProvinceTypes.OTHER]: true,
  } as any);

  const handleStorePrev = useCallback(
    (location: ProvinceTypes) => {
      setCanNexts((s) => ({ ...(s as any), [location]: true }));
      if (storeSwipers?.[location]) {
        storeSwipers?.[location]?.slidePrev();
        if (!toNumber(storeSwipers?.[location]?.activeIndex)) {
          setCanPrevs((s) => ({ ...(s as any), [location]: false }));
        }
      }
    },
    [storeSwipers],
  );

  const handleStoreNext = useCallback(
    (location: ProvinceTypes) => {
      setCanPrevs((s) => ({ ...(s as any), [location]: true }));
      if (storeSwipers?.[location]) {
        storeSwipers?.[location]?.slideNext();
        let slidePerView = 5;
        forEach(
          storeSwipers?.[location]?.params?.breakpoints,
          (item, breakKey) => {
            if (
              toNumber(storeSwipers?.[location]?.currentBreakpoint) < +breakKey
            )
              return false;
            slidePerView = toNumber(item?.slidesPerView);
          },
        );
        const listStores = filter(stores, (s) =>
          isEqualVal(s?.storeLocation, location),
        );
        if (
          size(listStores) - toNumber(storeSwipers?.[location]?.activeIndex) <=
          slidePerView
        ) {
          setCanNexts((s) => ({ ...(s as any), [location]: false }));
        }
      }
    },
    [storeSwipers],
  );

  const handleChangeActiveIndex = useCallback(
    (location: ProvinceTypes) => {
      if (storeSwipers?.[location]) {
        let slidePerView = 4;
        forEach(
          storeSwipers?.[location]?.params?.breakpoints,
          (item, breakKey) => {
            if (
              toNumber(storeSwipers?.[location]?.currentBreakpoint) < +breakKey
            )
              return false;
            slidePerView = toNumber(item?.slidesPerView);
          },
        );
        const listStores = filter(stores, (s) =>
          isEqualVal(s?.storeLocation, location),
        );
        setCanNexts((s) => ({
          ...(s as any),
          [location]:
            toNumber(storeSwipers?.[location]?.activeIndex) + slidePerView <
            size(listStores),
        }));
        setCanPrevs((s) => ({
          ...(s as any),
          [location]: toNumber(storeSwipers?.[location]?.activeIndex || 0) > 0,
        }));
      }
    },
    [storeSwipers],
  );

  const renderSwiperContent = (storeData: FunStoresProps['stores'] = []) =>
    map(storeData, (mess, ind) => (
      <SwiperSlide key={`${mess?.value}`} className="store-swiper-slide">
        <div className="store-swiper-card">
          <Image
            width={250}
            height={250}
            src={mess?.image}
            alt={mess?.alt}
            className="store-swiper-item-image"
          />
          <div>
            <p className="store-swiper-item-title">
              <Image
                className="store-swiper-item-icon"
                src={storeIcon}
                alt="store icon"
                quality={75}
              />{' '}
              <strong>
                {ind + 1}. {mess?.labelIndex}
              </strong>
            </p>
            <p className="store-swiper-item-title">{mess?.label}</p>
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <section id={HOME_PAGE_SECTIONS.FUN_STORES} className="fun-stores">
      <Container className="fun-stores-container no-select">
        <h2 className="section-title">{T('danh sách cửa hàng')}</h2>

        {map(listStoreLocationOfType, (storeLocation) => {
          const listStores = filter(stores, (s) =>
            isEqualVal(s?.storeLocation, storeLocation),
          );

          let slidePerView = 5;
          forEach(
            storeSwipers?.[storeLocation]?.params?.breakpoints,
            (item, breakKey) => {
              if (
                toNumber(storeSwipers?.[storeLocation]?.currentBreakpoint) <
                +breakKey
              )
                return false;
              slidePerView = toNumber(item?.slidesPerView);
            },
          );
          const isHasArrow = size(listStores) > slidePerView;

          return (
            <React.Fragment key={storeLocation}>
              <h3 className="store-location-title">
                {get(listProvinceNames, `[${storeLocation}]`, '')}
              </h3>
              <div className="store-swiper-wrapper">
                <Swiper
                  onSwiper={(swipe) =>
                    setStoreSwipers((swipers) => ({
                      ...((swipers || {}) as any),
                      [storeLocation]: swipe,
                    }))
                  }
                  onActiveIndexChange={() =>
                    handleChangeActiveIndex(storeLocation)
                  }
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    639: {
                      slidesPerView: 2,
                    },
                    1023: {
                      slidesPerView: 3,
                    },
                    1279: {
                      slidesPerView: 5,
                    },
                  }}
                  spaceBetween={50}
                  slidesPerView={5}
                  scrollbar={{ draggable: true }}
                  autoplay={{ delay: 5000 }}
                  className="store-swiper"
                  centerInsufficientSlides
                >
                  {renderSwiperContent(listStores)}
                </Swiper>
                {isHasArrow && (
                  <>
                    <button
                      onClick={() => handleStorePrev(storeLocation)}
                      type="button"
                      className={cx('store-swiper-left-arrow', {
                        disabled: !canPrevs?.[storeLocation],
                      })}
                      title="trước"
                    >
                      <Image
                        src={leftArrowIcon}
                        width={50}
                        height={50}
                        alt="left arrow"
                      />
                    </button>
                    <button
                      onClick={() => handleStoreNext(storeLocation)}
                      type="button"
                      className={cx('store-swiper-right-arrow', {
                        disabled: !canNexts?.[storeLocation],
                      })}
                      title="sau"
                    >
                      <Image
                        src={rightArrowIcon}
                        width={50}
                        height={50}
                        alt="right arrow"
                      />
                    </button>
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
        {/* <Grid className="fun-stores-grid">
          {map(stores, (item) => (
            <GridItem key={item?.value} className="fun-stores-item">
              <Image
                className="fun-stores-item-image"
                src={item?.image}
                alt="store"
                quality={75}
              />
              <br />
              <div>
                <p className="fun-stores-item-title">
                  <Image
                    className="fun-stores-item-icon"
                    src={storeIcon}
                    alt="store icon"
                    quality={75}
                  />{' '}
                  <strong>{item?.labelIndex}</strong>
                </p>
                <p className="fun-stores-item-title">{item?.label}</p>
              </div>
            </GridItem>
          ))}
        </Grid> */}
      </Container>
    </section>
  );
};

export default FunStores;
