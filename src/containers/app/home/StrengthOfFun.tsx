import React, { useCallback, useState } from 'react';
import { map } from 'lodash';
import cx from 'classnames';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { STRENGTH_ITEMS } from 'store/static-data/static-data.data';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import Image from 'components/image/Image';
import leftArrowIcon from 'assets/icons/left_arrow.png';
import rightArrowIcon from 'assets/icons/right_arrow.png';

const StrengthOfFunSwiper = () => {
  const [customerSwiper, setCustomerSwiper] = useState<SwiperClass | null>(
    null,
  );

  const handleCustomerPrev = useCallback(() => {
    if (customerSwiper) {
      customerSwiper.slidePrev();
    }
  }, [customerSwiper]);

  const handleCustomerNext = useCallback(() => {
    if (customerSwiper) {
      customerSwiper.slideNext();
    }
  }, [customerSwiper]);

  return (
    <div className="strength-of-fun-mobile-wrapper">
      <Swiper
        className="strength-of-fun-swiper"
        onSwiper={setCustomerSwiper}
        spaceBetween={50}
        slidesPerView={1}
        slidesPerGroup={1}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 5000 }}
        centeredSlides
        loop
      >
        {map(STRENGTH_ITEMS, (item, ind: number) => (
          <SwiperSlide key={`${item?.value}`}>
            <div
              className={cx(
                'strength-item-wrapper',
                `${ind % 2 === 0 ? `self-end` : 'self-start'}`,
                ind % 2 === 0 ? 'strength-item-under' : 'strength-item-over',
              )}
            >
              <div className="strength-item">
                <span className="strength-index">{ind + 1}</span>
                <strong className="strength-item-title">{item?.label}</strong>
                <br />
                <p className="strength-item-description">{item?.description}</p>
                <div className="triangle-border-left" />
                <div className="triangle-border-right" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={handleCustomerPrev}
        type="button"
        className="swiper-left-arrow"
        title="trước"
      >
        <Image src={leftArrowIcon} width={50} height={50} alt="left arrow" />
      </button>
      <button
        onClick={handleCustomerNext}
        type="button"
        className="swiper-right-arrow"
        title="sau"
      >
        <Image src={rightArrowIcon} width={50} height={50} alt="right arrow" />
      </button>
    </div>
  );
};

const StrengthOfFun = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.STRENGTH_OF_FUN}
      className="strength-of-fun"
    >
      <Container className="strength-of-fun-container">
        <h2 className="section-title">{T('funstudio tự tin về điều gì?')}</h2>
        <div className="strength-of-fun-wrapper">
          {map(STRENGTH_ITEMS, (item, ind: number) => (
            <div
              className={cx(
                'strength-item-wrapper',
                `${ind % 2 === 0 ? `self-end` : 'self-start'}`,
                ind % 2 === 0 ? 'strength-item-under' : 'strength-item-over',
              )}
            >
              <div className="strength-item">
                <span className="strength-index">{ind + 1}</span>
                <strong className="strength-item-title">{item?.label}</strong>
                <br />
                <p className="strength-item-description">{item?.description}</p>
                <div className="triangle-border-left" />
                <div className="triangle-border-right" />
              </div>
            </div>
          ))}
        </div>
        <StrengthOfFunSwiper />
      </Container>
    </section>
  );
};

export default StrengthOfFun;
