import Image from 'components/image/Image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { isEqualVal } from 'helpers/string.helper';
import { map, range, size } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-scroll';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

const BannerSlider: React.FC<any> = ({ banners }) => {
  const [newsSwiper, setNewsSwiper] = useState<SwiperClass | null>(null);
  const [newsSwiperIndex, setNewsSwiperIndex] = useState(0);

  const handleSlideTo = useCallback(
    (index: number) => {
      if (newsSwiper) {
        newsSwiper.slideToLoop(index);
      }
    },
    [newsSwiper],
  );

  return (
    <section id={HOME_PAGE_SECTIONS.BANNER_SLIDER} className="banner-slider">
      <Swiper
        className="swiper"
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 5000 }}
        onSwiper={setNewsSwiper}
        onRealIndexChange={(swiperData) =>
          setNewsSwiperIndex(swiperData?.realIndex || 0)
        }
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
                <picture>
                  {!!item?.mobileImage && (
                    <source
                      srcSet={item?.mobileImage?.src}
                      media="(max-width: 767px)"
                    />
                  )}
                  {item?.href ? (
                    <Link
                      href={`#${item?.href}`}
                      to={item?.href}
                      spy={true}
                      smooth={true}
                      offset={300}
                      duration={500}
                    >
                      {imageCom as any}
                    </Link>
                  ) : (
                    imageCom
                  )}
                </picture>
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
