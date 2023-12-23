import React, { useCallback, useState } from 'react';
import { map, range, size } from 'lodash';
import cx from 'classnames';
import Image from 'components/image/Image';
import {
  CUSTOMER_MESSAGES,
  NEWS_MESSAGES,
} from 'store/static-data/static-data.data';
import { isEqualVal } from 'helpers/string.helper';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import leftArrowIcon from 'assets/icons/left_arrow.png';
import rightArrowIcon from 'assets/icons/right_arrow.png';
import classes from './home.module.css';

const CustomerTalkAboutUs = () => {
  const { T } = useTranslation();
  const [customerSwiper, setCustomerSwiper] = useState<SwiperClass | null>(
    null,
  );
  const [newsSwiper, setNewsSwiper] = useState<SwiperClass | null>(null);
  const [newsSwiperIndex, setNewsSwiperIndex] = useState(0);

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

  const handleSlideTo = useCallback(
    (index: number) => {
      if (newsSwiper) {
        newsSwiper.slideTo(index * 2);
        setNewsSwiperIndex(index);
      }
    },
    [newsSwiper],
  );

  return (
    <section
      id={HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US}
      className={cx(
        classes?.['talk-about-us-section'],
        'flex w-full bg-gradient-pink',
      )}
    >
      <Container className="py-[4rem] text-lp-body text-center">
        <div className="mx-auto">
          <div className="relative mx-auto w-[90rem]">
            <h2 className="mb-[4rem] text-lp-section-title uppercase text-lp-secondary-color">
              {T('khách hàng nói về chúng tôi')}
            </h2>
            <Swiper
              onSwiper={setCustomerSwiper}
              spaceBetween={50}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 5000 }}
              loop
            >
              {map(CUSTOMER_MESSAGES, (mess) => (
                <SwiperSlide
                  key={`${mess?.value}`}
                  className="flex w-full h-full items-center justify-center text-center"
                >
                  <div className={classes?.['customer-swiper-card']}>
                    <Image
                      width={250}
                      height={250}
                      src={mess?.image}
                      alt={mess?.alt}
                    />
                    <div>
                      <div className="text-left text-white py-[2.7rem] px-[1rem]">
                        <span className="text-[3.5rem]">
                          Bạn <strong>{mess?.label}</strong>
                        </span>
                        <p className="w-[4rem] mt-[2rem] border-white border-b-[0.5rem]" />
                        <p className="mt-[2rem]">{mess?.description}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={handleCustomerPrev}
              type="button"
              className="absolute -left-[8rem] top-[calc(50%+2rem)]"
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
              onClick={handleCustomerNext}
              type="button"
              className="absolute -right-[8rem] top-[calc(50%+2rem)]"
              title="sau"
            >
              <Image
                src={rightArrowIcon}
                width={50}
                height={50}
                alt="right arrow"
              />
            </button>
          </div>
          <div className="mx-auto mt-[4rem] w-[90rem]">
            <h2 className="mb-4 text-lp-section-title text-lp-primary-color uppercase">
              {T('báo chí nói về chúng tôi')}
            </h2>
            <Swiper
              width={900}
              spaceBetween={50}
              scrollbar={{ draggable: true }}
              slidesPerView={2}
              slidesPerGroup={2}
              autoplay={{ delay: 5000 }}
              onSwiper={setNewsSwiper}
              onSlideChange={(swiperData) =>
                setNewsSwiperIndex((swiperData?.realIndex || 0) / 2)
              }
              loop
            >
              {map(NEWS_MESSAGES, (news) => (
                <SwiperSlide key={`${news?.value}`}>
                  <div className={classes?.['news-swiper-card']}>
                    <Image
                      className="border-image"
                      width={450}
                      height={300}
                      src={news?.image}
                      alt={news?.alt}
                    />
                    <p className="text-white uppercase py-[2rem] text-lp-card-title">
                      {news?.label}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-[2rem]">
              {map(
                range(size(NEWS_MESSAGES) / 2),
                (groupSlideIndex: number) => (
                  <button
                    onClick={() => handleSlideTo(groupSlideIndex)}
                    type="button"
                    className={`dot-slider ${
                      isEqualVal(newsSwiperIndex, groupSlideIndex)
                        ? 'dot-slider-active'
                        : ''
                    }`}
                    title="trước"
                    aria-label="dot slider"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CustomerTalkAboutUs;
