import React from 'react';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';

const AboutPhotoBooth = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.ABOUT_PHOTOBOOTH}
      className="about-photobooth"
    >
      <Container className="about-photobooth-container">
        <h2 className="section-title">
          {T(
            'tìm hiểu về mô hình\n photobooth tự chụp ảnh\n phong cách hàn quốc',
          )}
        </h2>
        <div className="mx-auto">
          <iframe
            className="about-photobooth-video-frame"
            src={process.env.NEXT_PUBLIC_INTRODUCE_VIDEO_YOUTUBE_URL}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Container>
    </section>
  );
};

export default AboutPhotoBooth;
