import React from 'react';
import { map } from 'lodash';
import cx from 'classnames';
import Image from 'next/image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './home.module.css';

const CustomerTalkAboutUs = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US}
      className={cx(
        classes?.['talk-about-us-section'],
        'flex w-full bg-gradient-pink ',
      )}
    >
      <Container className="py-[4rem] text-lp-body text-center">
        <div className="mx-auto">
          <div className="mx-auto w-[90rem]">
            <h2 className="mb-[4rem] text-lp-section-title uppercase text-lp-secondary-color">
              {T('khách hàng nói về chúng tôi')}
            </h2>
            <Swiper
              spaceBetween={50}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 5000 }}
              loop
            >
              {map([1, 2, 3], () => (
                <SwiperSlide className="flex w-full h-full items-center justify-center text-center">
                  <div className={classes?.['customer-swiper-card']}>
                    <Image
                      width={250}
                      height={250}
                      src="/images/banner-images/1.jpg"
                      alt="news avatar"
                    />
                    <div>
                      <div className="text-left text-white py-[2.7rem] px-[1rem]">
                        <h4 className="text-[3.5rem]">
                          Bạn <strong>Bùi Lan Phương</strong>
                        </h4>
                        <p className="w-[4rem] mt-[2rem] border-white border-b-[0.5rem]" />
                        <p className="text-lp-h3 mt-[2rem]">
                          Siêu mê sốp nha, ảnh vừa đẹp, phụ kiện quá tuyệt vời,
                          hẹn sốp lần thứ 10.
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mx-auto mt-[4rem] w-[90rem]">
            <h2 className="mb-4 text-lp-section-title uppercase text-lp-primary-color">
              {T('báo chí nói về chúng tôi')}
            </h2>
            <Swiper
              width={900}
              spaceBetween={50}
              scrollbar={{ draggable: true }}
              slidesPerView={2}
              slidesPerGroup={2}
              autoplay={{ delay: 5000 }}
              loop
            >
              {map([1, 2, 3, 4, 5, 6], () => (
                <SwiperSlide>
                  <div className={classes?.['news-swiper-card']}>
                    <Image
                      className="border-image"
                      width={450}
                      height={300}
                      src="/images/banner-images/1.jpg"
                      alt="news cover"
                    />
                    <p className="text-white uppercase py-[2rem] text-lp-card-title">
                      Báo công luận
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CustomerTalkAboutUs;
