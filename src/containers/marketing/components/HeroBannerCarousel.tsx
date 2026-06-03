import type React from 'react';
import { useEffect, useRef, useState } from 'react';
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

type SlideDirection = -1 | 0 | 1;

const HERO_SLIDE_ANIMATION_MS = 500;
const DESKTOP_SLIDE_DISTANCE = '74.0625rem';

const HeroBannerMedia: React.FC<{
  slide: MarketingHeroSlide;
  active?: boolean;
  framed?: boolean;
}> = ({ slide, active, framed = true }) => (
  <div className="relative h-full w-full">
    <Media
      src={slide.image}
      alt={slide.title}
      className={cx('h-full w-full', framed && 'border-14 border-brand-pink')}
      sizes={
        active ? '(max-width: 1180px) calc(100vw - 48px), 1320px' : '930px'
      }
    />
    {active && (
      <h2 className="absolute bottom-9 left-[4.6875rem] right-[4.6875rem] m-0 whitespace-pre-line text-center text-marketing-hero-caption font-extrabold uppercase leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] phone:bottom-12 phone:whitespace-normal phone:text-lg">
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
  const animationFrameRef = useRef<number | null>(null);
  const animationTimerRef = useRef<number | null>(null);
  const [renderedPosition, setRenderedPosition] = useState(position);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimatingSlide, setIsAnimatingSlide] = useState(false);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(0);

  useEffect(() => {
    if (!slides.length || position === renderedPosition) {
      return undefined;
    }

    const direction: SlideDirection = position > renderedPosition ? 1 : -1;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (animationTimerRef.current !== null) {
      window.clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    setIsAnimatingSlide(false);
    setSlideDirection(0);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      setIsAnimatingSlide(true);
      setSlideDirection(direction);

      animationTimerRef.current = window.setTimeout(() => {
        animationTimerRef.current = null;
        setIsAnimatingSlide(false);
        setRenderedPosition(position);
        setSlideDirection(0);
      }, HERO_SLIDE_ANIMATION_MS);
    });

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (animationTimerRef.current !== null) {
        window.clearTimeout(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, [position, renderedPosition, slides.length]);

  if (!slides.length) {
    return null;
  }

  const previousSlide = getLoopItem(slides, renderedPosition - 1);
  const currentSlide = getLoopItem(slides, renderedPosition);
  const nextSlide = getLoopItem(slides, renderedPosition + 1);
  const canDrag = slides.length > 1;
  const desktopAnimationOffset =
    slideDirection > 0
      ? ` - ${DESKTOP_SLIDE_DISTANCE}`
      : slideDirection < 0
        ? ` + ${DESKTOP_SLIDE_DISTANCE}`
        : '';
  const mobileAnimationOffset =
    slideDirection > 0 ? ' - 100%' : slideDirection < 0 ? ' + 100%' : '';
  const trackTransitionClass =
    isAnimatingSlide && !isDragging
      ? 'transition-transform duration-500 ease-in-out'
      : 'transition-none';
  const desktopScaleTransitionClass =
    isAnimatingSlide && !isDragging
      ? 'transition-transform duration-500 ease-in-out'
      : 'transition-none';
  const previousDesktopScaleClass =
    isAnimatingSlide && slideDirection < 0 ? 'scale-100' : 'scale-[0.705]';
  const currentDesktopScaleClass =
    isAnimatingSlide && slideDirection !== 0 ? 'scale-[0.705]' : 'scale-100';
  const nextDesktopScaleClass =
    isAnimatingSlide && slideDirection > 0 ? 'scale-100' : 'scale-[0.705]';
  const previousDesktopZClass =
    isAnimatingSlide && slideDirection < 0 ? 'z-20' : 'z-0';
  const currentDesktopZClass = isAnimatingSlide ? 'z-10' : 'z-20';
  const nextDesktopZClass =
    isAnimatingSlide && slideDirection > 0 ? 'z-20' : 'z-0';
  const desktopTrackTransform = `translate3d(calc(-50% + ${dragOffset}px${desktopAnimationOffset}), 0, 0)`;
  const mobileTrackTransform = `translate3d(calc(-100% + ${dragOffset}px${mobileAnimationOffset}), 0, 0)`;
  const arrowVisibilityClass = isDragging
    ? 'opacity-0 pointer-events-none'
    : 'opacity-100';

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
        'overflow-hidden px-0 tablet:px-6 phone:px-4',
        canDrag && 'cursor-grab touch-pan-y active:cursor-grabbing',
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
    >
      <div className="relative h-[34.375rem] overflow-hidden tablet:hidden">
        <div
          className={cx(
            'absolute left-1/2 top-0 flex h-[34.375rem] w-max items-center',
            trackTransitionClass,
          )}
          style={{ transform: desktopTrackTransform }}
        >
          <button
            type="button"
            aria-label={`go to previous slide ${previousSlide.title}`}
            className={cx(
              'relative h-[34.375rem] w-[82.5rem] shrink-0 origin-center overflow-hidden bg-brand-pink p-0 text-left',
              desktopScaleTransitionClass,
              previousDesktopScaleClass,
              previousDesktopZClass,
            )}
            onClick={() => onChange(current - 1)}
          >
            <HeroBannerMedia slide={previousSlide} />
          </button>
          <div
            className={cx(
              'relative -ml-[8.4375rem] h-[34.375rem] w-[82.5rem] shrink-0 origin-center',
              desktopScaleTransitionClass,
              currentDesktopScaleClass,
              currentDesktopZClass,
            )}
          >
            <HeroBannerMedia slide={currentSlide} active />
          </div>
          <button
            type="button"
            aria-label={`go to next slide ${nextSlide.title}`}
            className={cx(
              'relative -ml-[8.4375rem] h-[34.375rem] w-[82.5rem] shrink-0 origin-center overflow-hidden bg-brand-pink p-0 text-left',
              desktopScaleTransitionClass,
              nextDesktopScaleClass,
              nextDesktopZClass,
            )}
            onClick={() => onChange(current + 1)}
          >
            <HeroBannerMedia slide={nextSlide} />
          </button>
        </div>
        <InlineArrow
          direction="previous"
          className={cx(HERO_LEFT_ARROW_CLASS, arrowVisibilityClass)}
          onClick={() => onChange(current - 1)}
        />
        <InlineArrow
          direction="next"
          className={cx(HERO_RIGHT_ARROW_CLASS, arrowVisibilityClass)}
          onClick={() => onChange(current + 1)}
        />
      </div>

      <div className="relative hidden tablet:block">
        <div
          className={cx('flex w-full', trackTransitionClass)}
          style={{ transform: mobileTrackTransform }}
        >
          <div className="aspect-[1320/550] w-full shrink-0 phone:aspect-hero-main-mobile">
            <HeroBannerMedia slide={previousSlide} framed={false} />
          </div>
          <div className="aspect-[1320/550] w-full shrink-0 phone:aspect-hero-main-mobile">
            <HeroBannerMedia slide={currentSlide} active />
          </div>
          <div className="aspect-[1320/550] w-full shrink-0 phone:aspect-hero-main-mobile">
            <HeroBannerMedia slide={nextSlide} framed={false} />
          </div>
        </div>
        <InlineArrow
          direction="previous"
          className={cx(HERO_LEFT_ARROW_CLASS, arrowVisibilityClass)}
          onClick={() => onChange(current - 1)}
        />
        <InlineArrow
          direction="next"
          className={cx(HERO_RIGHT_ARROW_CLASS, arrowVisibilityClass)}
          onClick={() => onChange(current + 1)}
        />
      </div>
    </div>
  );
};

export default HeroBannerCarousel;
