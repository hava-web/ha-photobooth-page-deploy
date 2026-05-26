import type React from 'react';
import { useRef, useState } from 'react';
import cx from 'classnames';
import type { MarketingImage } from 'store/static-data/marketing-pages.data';
import { HERO_LEFT_ARROW_CLASS, HERO_RIGHT_ARROW_CLASS } from '../constants';
import { getLoopItem } from '../utils/carousel';
import InlineArrow from './InlineArrow';
import Media from './Media';

export type MarketingHeroSlide = {
  image: MarketingImage;
  title: string;
};

type CarouselDragState = {
  pointerId: number;
  startX: number;
  lastX: number;
  viewportWidth: number;
};

const HeroBannerMedia: React.FC<{
  slide: MarketingHeroSlide;
  variant: 'main' | 'side';
}> = ({ slide, variant }) => (
  <div className="relative">
    <Media
      src={slide.image}
      alt={slide.title}
      className={cx(
        variant === 'main'
          ? 'aspect-hero-main phone:aspect-hero-main-mobile'
          : 'h-full w-full border-14 border-brand-pink',
      )}
      sizes={variant === 'main' ? '100vw' : '240px'}
    />
    {variant === 'main' && (
      <h2 className="absolute bottom-8.5 left-7.5 right-7.5 m-0 text-center text-marketing-hero-overlay font-extrabold uppercase leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] phone:bottom-5 phone:text-lg">
        {slide.title}
      </h2>
    )}
  </div>
);

type HeroBannerCarouselProps = {
  slides: MarketingHeroSlide[];
  position: number;
  current: number;
  onChange: (index: number) => void;
};

const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({
  slides,
  position,
  current,
  onChange,
}) => {
  const dragStateRef = useRef<CarouselDragState | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!slides.length) {
    return null;
  }

  const previousSlide = getLoopItem(slides, position - 1);
  const currentSlide = getLoopItem(slides, position);
  const nextSlide = getLoopItem(slides, position + 1);
  const canDrag = slides.length > 1;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canDrag || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest('a, button, input, label, select, textarea')) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      viewportWidth: event.currentTarget.clientWidth,
    };
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragState.lastX = event.clientX;
    setDragOffset(event.clientX - dragState.startX);
    event.preventDefault();
  };

  const finishDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    shouldSlide: boolean,
  ) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released by the browser.
    }

    dragStateRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (!shouldSlide) {
      return;
    }

    const delta = dragState.lastX - dragState.startX;
    const threshold = Math.min(
      120,
      Math.max(40, dragState.viewportWidth * 0.08),
    );

    if (Math.abs(delta) >= threshold) {
      onChange(current + (delta < 0 ? 1 : -1));
    }
  };

  return (
    <div
      className={cx(
        'grid grid-cols-hero justify-center gap-6 overflow-hidden px-0 tablet:grid-cols-1 tablet:px-2.4 phone:px-1.6',
        canDrag && 'cursor-grab touch-pan-y active:cursor-grabbing',
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
    >
      <button
        type="button"
        aria-label={`go to previous slide ${previousSlide.title}`}
        className="h-hero-side-panel self-center overflow-hidden bg-brand-pink p-0 text-left tablet:hidden"
        onClick={() => onChange(current - 1)}
      >
        <div
          className={cx(
            'h-full transition-transform duration-300',
            isDragging ? 'transition-none' : '',
          )}
          style={{ transform: `translate3d(${dragOffset}px, 0, 0)` }}
        >
          <HeroBannerMedia slide={previousSlide} variant="side" />
        </div>
      </button>
      <div className="relative">
        <div
          className={cx(
            'transition-transform duration-300',
            isDragging ? 'transition-none' : '',
          )}
          style={{ transform: `translate3d(${dragOffset}px, 0, 0)` }}
        >
          <HeroBannerMedia slide={currentSlide} variant="main" />
        </div>
        <InlineArrow
          direction="previous"
          className={HERO_LEFT_ARROW_CLASS}
          onClick={() => onChange(current - 1)}
        />
        <InlineArrow
          direction="next"
          className={HERO_RIGHT_ARROW_CLASS}
          onClick={() => onChange(current + 1)}
        />
      </div>
      <button
        type="button"
        aria-label={`go to next slide ${nextSlide.title}`}
        className="h-hero-side-panel self-center overflow-hidden bg-brand-pink p-0 text-left tablet:hidden"
        onClick={() => onChange(current + 1)}
      >
        <div
          className={cx(
            'h-full transition-transform duration-300',
            isDragging ? 'transition-none' : '',
          )}
          style={{ transform: `translate3d(${dragOffset}px, 0, 0)` }}
        >
          <HeroBannerMedia slide={nextSlide} variant="side" />
        </div>
      </button>
    </div>
  );
};

export default HeroBannerCarousel;
