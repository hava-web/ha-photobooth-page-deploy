import React, { FC, useCallback, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { map, range, size } from 'lodash';
import Image from 'components/image/Image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { isEqualVal } from 'helpers/string.helper';
import classes from './home.module.css';

const BannerSlider: FC<any> = ({ banners }) => {
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
    <section id={HOME_PAGE_SECTIONS.BANNER_SLIDER} className={classes.banner}>
      <Swiper
        className="w-full h-full"
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 5000 }}
        onSwiper={setNewsSwiper}
        onRealIndexChange={(swiperData) =>
          setNewsSwiperIndex(swiperData?.realIndex || 0)
        }
        loop
      >
        {map(banners, (item, ind: number) => (
          <SwiperSlide
            className="flex w-full h-full items-center justify-center text-center"
            key={`${item?.value}`}
          >
            <div title={item?.label} className="w-full h-full">
              <Image
                {...(!ind && { rel: 'preload' })}
                className="w-full h-full object-cover"
                src={item?.image}
                alt={item?.alt}
                sizes="100vw"
                quality={!ind ? 100 : 70}
                fill
              />
              <p className="banner-title">{item?.label}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute w-full bottom-[1rem] text-center z-z-index-banner-dot">
        {map(range(size(banners)), (groupSlideIndex: number) => (
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
    </section>
  );
};

export default BannerSlider;
