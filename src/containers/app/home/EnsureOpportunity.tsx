import React, { useCallback, useState } from 'react';
import { map, range, size } from 'lodash';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { OPPORTUNITY_ITEMS } from 'store/static-data/static-data.data';
import nhuongQuyen1Image from 'assets/images/home/nhuong_quyen_1.jpg';
import nhuongQuyen2Image from 'assets/images/home/nhuong_quyen_2.jpg';
import nhuongQuyen3Image from 'assets/images/home/nhuong_quyen_3.jpg';
import { isEqualVal } from 'helpers/string.helper';

const EnsureOpportunityMobileSwiper = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const handleSlideTo = useCallback(
    (index: number) => {
      if (swiper) {
        swiper.slideToLoop(index);
      }
    },
    [swiper],
  );

  return (
    <div className="ensure-opportunity-swiper-wrapper">
      <Swiper
        autoHeight
        spaceBetween={50}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 5000 }}
        onSwiper={setSwiper}
        onRealIndexChange={(swiperData) =>
          setSwiperIndex(swiperData?.realIndex || 0)
        }
        loop
      >
        {map(OPPORTUNITY_ITEMS, (item) => (
          <SwiperSlide key={`${item?.value}`} className="customer-swiper-slide">
            <GridItem className="ensure-opportunity-item">
              <Image src={item?.image} width={60} alt={item?.alt} />
              <strong className="ensure-opportunity-item-title">
                {item?.label}
              </strong>
              <p className="ensure-opportunity-item-description">
                {item?.description}
              </p>
            </GridItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-dots">
        {map(range(size(OPPORTUNITY_ITEMS)), (slideIndex: number) => (
          <button
            onClick={() => handleSlideTo(slideIndex)}
            type="button"
            className={`dot-slider ${
              isEqualVal(swiperIndex, slideIndex) ? 'dot-slider-active' : ''
            }`}
            title="trước"
            aria-label="dot slider"
          />
        ))}
      </div>
    </div>
  );
};

const EnsureOpportunity = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.ENSURE_OPPORTUNITY}
      className="ensure-opportunity"
    >
      <Container className="ensure-opportunity-container">
        <h2 className="section-title">
          {T('cơ hội nhượng quyền thương mại bền vững')}
        </h2>
        <Grid className="ensure-opportunity-grid">
          {map(OPPORTUNITY_ITEMS, (item) => (
            <GridItem className="ensure-opportunity-item">
              <Image src={item?.image} width={60} alt={item?.alt} />
              <strong className="ensure-opportunity-item-title">
                {item?.label}
              </strong>
              <p className="ensure-opportunity-item-description">
                {item?.description}
              </p>
            </GridItem>
          ))}
        </Grid>
        <EnsureOpportunityMobileSwiper />
        <div className="ensure-opportunity-wrapper">
          <div className="ensure-opportunity-image-wrapper">
            <Image
              className="ensure-opportunity-image object-bottom"
              src={nhuongQuyen1Image}
              alt="opportunity 1"
            />
            <Image
              className="ensure-opportunity-image"
              src={nhuongQuyen2Image}
              alt="opportunity 2"
            />
            <Image
              className="ensure-opportunity-image"
              src={nhuongQuyen3Image}
              alt="opportunity 3"
            />
          </div>
          <i className="ensure-opportunity-description">
            Ký kết hợp đồng cùng đối tác nhượng quyền
          </i>
        </div>
      </Container>
      <div className="ensure-opportunity-bottom-div" />
    </section>
  );
};

export default EnsureOpportunity;
