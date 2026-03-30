import React, { useCallback, useState } from 'react';
import { map } from 'lodash';
import Image from 'components/image/Image';
import Container from 'components/grid/Container';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { EVENT_GALLERY } from 'store/static-data/static-data.data';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import leftArrowIcon from 'assets/icons/left_arrow.png';
import rightArrowIcon from 'assets/icons/right_arrow.png';
import { StaticImageData } from 'next/image';

const EventGallery = () => {
  const [eventSwiper, setEventSwiper] = useState<SwiperClass | null>(null);

  const handlePrev = useCallback(() => {
    if (eventSwiper) {
      eventSwiper.slidePrev();
    }
  }, [eventSwiper]);

  const handleNext = useCallback(() => {
    if (eventSwiper) {
      eventSwiper.slideNext();
    }
  }, [eventSwiper]);

  return (
    <section
      id={HOME_PAGE_SECTIONS.EVENT_GALLERY}
      className="event-gallery-section"
    >
      <Container className="event-gallery-container">
        <h2 className="event-gallery-title">Hoạt động sự kiện</h2>
        <div className="event-gallery-wrapper">
          <Swiper
            className="event-gallery-swiper"
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            scrollbar={{ draggable: true }}
            onSwiper={setEventSwiper}
            loop
          >
            {map(EVENT_GALLERY, (item) => (
              <SwiperSlide
                key={`${item?.value}`}
                className="event-gallery-slide"
              >
                <div className="event-gallery-item">
                  <Image
                    className="event-gallery-image object-cover w-full h-full"
                    src={item?.image as StaticImageData}
                    alt={item?.alt}
                    width={400}
                    height={300}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handlePrev}
            type="button"
            className="event-gallery-left-arrow"
            title="trước"
            aria-label="previous slide"
          >
            <Image
              src={leftArrowIcon}
              width={50}
              height={50}
              alt="left arrow"
            />
          </button>
          <button
            onClick={handleNext}
            type="button"
            className="event-gallery-right-arrow"
            title="sau"
            aria-label="next slide"
          >
            <Image
              src={rightArrowIcon}
              width={50}
              height={50}
              alt="right arrow"
            />
          </button>
        </div>
        <div className="event-gallery-button-wrapper">
          <a
            href="https://www.flickr.com/photos/funstudio_/"
            target="_blank"
            rel="noreferrer"
            className="event-gallery-button"
            title="Tìm hiểu thêm"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </Container>
    </section>
  );
};

export default EventGallery;
