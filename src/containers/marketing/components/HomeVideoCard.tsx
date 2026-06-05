import type React from 'react';

export type HomeVideoSlide = {
  title: string;
  video: string;
};

type HomeVideoCardProps = {
  slide: HomeVideoSlide;
  resetKey?: number;
};

const HomeVideoCard: React.FC<HomeVideoCardProps> = ({ slide, resetKey }) => (
  <div className="relative aspect-[900/538] overflow-hidden rounded-3xl border-14 border-gray-100 bg-brand-text shadow-brand-outline phone:rounded-xl phone:border-8">
    <iframe
      key={`${slide.video}-${resetKey ?? 0}`}
      className="h-full w-full"
      src={slide.video}
      title={slide.title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>
);

export default HomeVideoCard;
