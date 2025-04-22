import Image from 'components/image/Image';
import { TIME_MASTER_LOADING_ALIVE } from 'constants/common.const';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { isEqualVal } from 'helpers/string.helper';
import { map, range, size } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

const BannerSlider: React.FC<any> = ({ banners }) => {
  const [newsSwiper, setNewsSwiper] = useState<SwiperClass | null>(null);
  const [newsSwiperIndex, setNewsSwiperIndex] = useState(0);
  const [isDelayAutoPlay, setIsDelayAutoPlay] = useState(true);

  const handleSlideTo = useCallback(
    (index: number) => {
      if (newsSwiper) {
        newsSwiper.slideToLoop(index);
      }
    },
    [newsSwiper],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsDelayAutoPlay(false);
    }, TIME_MASTER_LOADING_ALIVE);
  }, []);

  return (
    <section id={HOME_PAGE_SECTIONS.BANNER_SLIDER} className="banner-slider">
      <Swiper
        className="swiper"
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        onSwiper={setNewsSwiper}
        onRealIndexChange={(swiperData) =>
          setNewsSwiperIndex(swiperData?.realIndex || 0)
        }
        modules={[Autoplay]}
        autoplay={{
          delay: isDelayAutoPlay ? 2000000 : 2000,
          disableOnInteraction: false,
        }}
        loop
      >
        {map(banners, (item) => {
          const imageCom = (
            <Image
              className={`swiper-slide-image ${item?.imageClass || ''}`}
              src={item?.image}
              alt={item?.alt}
              sizes="100vw"
              quality={100}
              style={item?.imageStyle}
            />
          );
          return (
            <SwiperSlide className="swiper-slide" key={`${item?.value}`}>
              <div title={item?.label} className="swiper-slide-wrapper">
                {item?.href ? (
                  <Link
                    href={`#${item?.href}`}
                    to={item?.href}
                    spy={true}
                    smooth={true}
                    offset={300}
                    duration={500}
                  >
                    {
                      (
                        <picture>
                          {!!item?.mobileImage && (
                            <source
                              srcSet={item?.mobileImage?.src}
                              media="(max-width: 767px)"
                            />
                          )}
                          {imageCom}
                        </picture>
                      ) as any
                    }
                  </Link>
                ) : (
                  <picture>
                    {!!item?.mobileImage && (
                      <source
                        srcSet={item?.mobileImage?.src}
                        media="(max-width: 767px)"
                      />
                    )}
                    {imageCom}
                  </picture>
                )}
                <p className="label-title">{item?.label}</p>
                {!!item?.label && <div className="shadow-white-bg" />}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiper-dot-wrapper">
        {map(range(size(banners)), (groupSlideIndex: number) => (
          <button
            onClick={() => handleSlideTo(groupSlideIndex)}
            type="button"
            className={`dot-slider ${
              isEqualVal(newsSwiperIndex, groupSlideIndex)
                ? 'dot-slider-active'
                : ''
            }`}
            title="bấm chuyển"
            aria-label="dot slider"
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
