import React, { useCallback, useState } from 'react';
import { map, range, size } from 'lodash';
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
        newsSwiper.slideToLoop(index * 2);
      }
    },
    [newsSwiper],
  );

  return (
    <section
      id={HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US}
      className="talk-about-us-section"
    >
      <Container className="talk-about-us-section-container">
        <div className="customer-swiper-wrapper">
          <h2 className="customer-swiper-card-title">
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
                className="customer-swiper-slide"
              >
                <div className="customer-swiper-card">
                  <Image
                    width={250}
                    height={250}
                    src={mess?.image}
                    alt={mess?.alt}
                  />
                  <div>
                    <div className="customer-swiper-item">
                      <span className="customer-swiper-title">
                        Bạn <strong>{mess?.label}</strong>
                      </span>
                      <p className="customer-swiper-title-underline" />
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
            className="customer-swiper-left-arrow"
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
            className="customer-swiper-right-arrow"
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
        <div className="news-swiper-wrapper">
          <h2 className="news-swiper-card-title">
            {T('báo chí nói về chúng tôi')}
          </h2>
          <Swiper
            spaceBetween={10}
            scrollbar={{ draggable: true }}
            slidesPerView={2}
            slidesPerGroup={2}
            autoplay={{ delay: 5000 }}
            onSwiper={setNewsSwiper}
            onRealIndexChange={(swiperData) =>
              setNewsSwiperIndex((swiperData?.realIndex || 0) / 2)
            }
            breakpoints={{
              640: { spaceBetween: 10 },
              768: { spaceBetween: 10 },
              1024: { spaceBetween: 50 },
              1280: { spaceBetween: 50 },
              1536: { spaceBetween: 50 },
            }}
            loop
          >
            {map(NEWS_MESSAGES, (news) => (
              <SwiperSlide key={`${news?.value}`} className="news-swiper-slide">
                <a
                  target="_blank"
                  href={news?.href}
                  className="news-swiper-card"
                  rel="noreferrer"
                >
                  <Image
                    className="news-swiper-image"
                    width={400}
                    height={250}
                    src={news?.image}
                    alt={news?.alt}
                  />
                  <p className="news-swiper-title">{news?.label}</p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="news-swiper-dots">
            {map(range(size(NEWS_MESSAGES) / 2), (groupSlideIndex: number) => (
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
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CustomerTalkAboutUs;
