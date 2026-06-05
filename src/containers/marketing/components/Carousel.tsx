import type React from 'react';
import { useRef, useState } from 'react';
import cx from 'classnames';

type CarouselProps<T> = {
  items: T[];
  position: number;
  visibleCount?: number;
  renderItem: (item: T, index: number, isCurrent: boolean) => React.ReactNode;
  getKey: (item: T, index: number) => string;
  onDragSlide?: (direction: 1 | -1) => void;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
};

type CarouselDragState = {
  pointerId: number;
  startX: number;
  lastX: number;
  viewportWidth: number;
};

const Carousel = <T,>({
  items,
  position,
  visibleCount = 1,
  renderItem,
  getKey,
  onDragSlide,
  viewportClassName,
  trackClassName,
  itemClassName,
}: CarouselProps<T>) => {
  const count = items.length;
  const dragStateRef = useRef<CarouselDragState | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!count) {
    return null;
  }

  const safeVisibleCount = Math.max(1, Math.min(visibleCount, count));
  const repeatBuffer = 2 + Math.ceil(Math.abs(position) / count);
  const totalItems = count * (repeatBuffer * 2 + 1);
  const offsetIndex = count * repeatBuffer + position;
  const canDrag = Boolean(onDragSlide && count > 1);

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

    if (!shouldSlide || !onDragSlide) {
      return;
    }

    const delta = dragState.lastX - dragState.startX;
    const itemWidth = dragState.viewportWidth / safeVisibleCount;
    const threshold = Math.min(120, Math.max(40, itemWidth * 0.18));

    if (Math.abs(delta) >= threshold) {
      onDragSlide(delta < 0 ? 1 : -1);
    }
  };

  return (
    <div
      className={cx(
        'overflow-hidden select-none',
        canDrag && 'cursor-grab touch-pan-y active:cursor-grabbing',
        viewportClassName,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishDrag(event, true)}
      onPointerCancel={(event) => finishDrag(event, false)}
    >
      <div
        className={cx(
          'flex will-change-transform',
          isDragging
            ? 'transition-none'
            : 'transition-transform duration-500 ease-out',
          trackClassName,
        )}
        style={{
          width: `${(totalItems / safeVisibleCount) * 100}%`,
          transform: `translate3d(calc(-${
            (offsetIndex / totalItems) * 100
          }% + ${dragOffset}px), 0, 0)`,
        }}
      >
        {Array.from({ length: totalItems }, (_, loopIndex) => {
          const itemIndex = loopIndex % count;
          const item = items[itemIndex];

          return (
            <div
              key={`${loopIndex}-${getKey(item, itemIndex)}`}
              className={cx('shrink-0 select-none', itemClassName)}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              style={{ flexBasis: `${100 / totalItems}%` }}
            >
              {renderItem(item, itemIndex, loopIndex === offsetIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
