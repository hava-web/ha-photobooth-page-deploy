import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { map } from 'lodash';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import classes from './home.module.css';

const BannerSlider: FC<any> = ({ banners }) => (
  <section id={HOME_PAGE_SECTIONS.BANNER_SLIDER} className={classes.banner}>
    <Swiper
      spaceBetween={0}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 5000 }}
      loop
    >
      {map(banners, (item) => (
        <SwiperSlide
          className="flex w-full h-full items-center justify-center text-center"
          key={`${item?.value}`}
        >
          <div title={item?.label} className="w-full h-full">
            <img className="w-full h-full" src={item?.image} alt={item?.alt} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default BannerSlider;
