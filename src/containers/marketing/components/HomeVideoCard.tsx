import type React from 'react';
import type { MarketingImage } from 'store/static-data/marketing-pages.data';
import Media from './Media';

export type HomeVideoSlide = {
  image: MarketingImage;
  title: string;
  video: string;
};

const withAutoplay = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;

type HomeVideoCardProps = {
  slide: HomeVideoSlide;
  isPlaying: boolean;
  onPlay: () => void;
};

const HomeVideoCard: React.FC<HomeVideoCardProps> = ({
  slide,
  isPlaying,
  onPlay,
}) => (
  <div className="relative aspect-video overflow-hidden rounded-3xl border-14 border-gray-100 bg-brand-text shadow-brand-outline phone:rounded-1.4 phone:border-8">
    {isPlaying ? (
      <iframe
        className="h-full w-full"
        src={withAutoplay(slide.video)}
        title={slide.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      <>
        <Media
          src={slide.image}
          alt={slide.title}
          className="h-full w-full"
          sizes="(max-width: 768px) 90vw, 760px"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/15" />
        <button
          type="button"
          aria-label={`play video ${slide.title}`}
          className="absolute left-1/2 top-1/2 z-10 flex h-7.2 w-7.2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-pink shadow-lg transition-colors hover:bg-brand-pink-hover phone:h-5.6 phone:w-5.6"
          onClick={onPlay}
        >
          <span
            aria-hidden="true"
            className="ml-0.5 h-0 w-0 border-y-8 border-l-14 border-y-transparent border-l-white"
          />
        </button>
      </>
    )}
  </div>
);

export default HomeVideoCard;
