import React, { useCallback, useState } from 'react';
import { map } from 'lodash';
import Link from 'next/link';
import Image from 'components/image/Image';
import {
  CUSTOMER_MESSAGES,
  NEWS_MESSAGES,
} from 'store/static-data/static-data.data';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import leftArrowIcon from 'assets/icons/left_arrow.png';
import rightArrowIcon from 'assets/icons/right_arrow.png';
import { StaticImageData } from 'next/image';

const CustomerTalkAboutUs = () => {
  const { T } = useTranslation();
  const [customerSwiper, setCustomerSwiper] = useState<SwiperClass | null>(
    null,
  );
  const [newsSwiper, setNewsSwiper] = useState<SwiperClass | null>(null);

  const handleNewsPrev = useCallback(() => {
    if (newsSwiper) {
      newsSwiper.slidePrev();
    }
  }, [newsSwiper]);

  const handleNewsNext = useCallback(() => {
    if (newsSwiper) {
      newsSwiper.slideNext();
    }
  }, [newsSwiper]);

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
    <section
      id={HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US}
      className="talk-about-us-section"
    >
      <Container className="talk-about-us-section-container">
        <div className="news-swiper-wrapper">
          <h2 className="news-swiper-card-title">
            {T('báo chí nói về chúng tôi')}
          </h2>
          <Swiper
            className="news-swiper"
            spaceBetween={50}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 5000 }}
            onSwiper={setNewsSwiper}
            loop
          >
            {map(NEWS_MESSAGES, (news) => (
              <SwiperSlide key={`${news?.value}`} className="news-swiper-slide">
                <div className="news-swiper-card">
                  {news?.video ? (
                    <iframe
                      className="news-swiper-youtube-frame"
                      src={news?.video}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <Link href={news?.href} target="blank">
                      <Image
                        className="news-swiper-image"
                        src={news?.image as StaticImageData}
                        alt={news?.alt}
                      />
                    </Link>
                  )}
                  <Link href={news?.href} target="blank">
                    <p className="news-swiper-title">
                      {news?.logo ? (
                        <Image
                          className="mx-auto"
                          src={news?.logo}
                          alt={news?.alt}
                          style={news?.style || {}}
                        />
                      ) : (
                        news?.label
                      )}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handleNewsPrev}
            type="button"
            className="news-swiper-left-arrow"
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
            onClick={handleNewsNext}
            type="button"
            className="news-swiper-right-arrow"
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
      </Container>
    </section>
  );
};

export default CustomerTalkAboutUs;
