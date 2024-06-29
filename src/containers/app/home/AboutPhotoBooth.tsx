import React, { useMemo } from 'react';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';
import { map, split } from 'lodash';
// import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
// import { isEqualVal } from 'helpers/string.helper';

const AboutPhotoBooth = () => {
  const { T } = useTranslation();
  // const [newsSwiper, setNewsSwiper] = useState<SwiperClass | null>(null);
  // const [newsSwiperIndex, setNewsSwiperIndex] = useState(0);

  // const handleSlideTo = useCallback(
  //   (index: number) => {
  //     if (newsSwiper) {
  //       newsSwiper.slideToLoop(index);
  //     }
  //   },
  //   [newsSwiper],
  // );

  const youtubeLinks = useMemo(
    () =>
      map(
        split(process.env.NEXT_PUBLIC_INTRODUCE_VIDEO_YOUTUBE_URL, ','),
        (item, ind) => ({ id: ind, video: item }),
      ),
    [],
  );

  return (
    <section
      id={HOME_PAGE_SECTIONS.ABOUT_PHOTOBOOTH}
      className="about-photobooth"
    >
      <Container className="about-photobooth-container">
        <h2 className="section-title">
          {T('Tìm hiểu về mô hình photobooth\n phong cách Hàn Quốc')}
        </h2>
        {map(youtubeLinks, (item) => (
          <div className="mx-auto mt-2">
            <div className="about-photobooth-video-frame-wrapper">
              <iframe
                className="about-photobooth-video-frame"
                src={item?.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        ))}
        {/* <Swiper
          spaceBetween={50}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 5000 }}
          onSwiper={setNewsSwiper}
          onRealIndexChange={(swiperData) =>
            setNewsSwiperIndex(swiperData?.realIndex || 0)
          }
          loop
        >
          {map(youtubeLinks, (item) => (
            <SwiperSlide key={`${item?.id}`} className="customer-swiper-slide">
              <div className="customer-swiper-card">
                <div className="about-photobooth-video-frame-wrapper">
                  <iframe
                    className="about-photobooth-video-frame"
                    src={item?.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="about-photobooth-swiper-dots">
          {map(range(size(youtubeLinks)), (groupSlideIndex: number) => (
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
        </div> */}
      </Container>
    </section>
  );
};

export default AboutPhotoBooth;
