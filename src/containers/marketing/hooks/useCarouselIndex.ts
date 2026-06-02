import { useCallback, useState } from 'react';
import { normalizeIndex } from '../utils/carousel';

export const useCarouselIndex = (count: number, initialPosition = 0) => {
  const [position, setPosition] = useState(initialPosition);
  const current = normalizeIndex(position, count);

  const setSlide = useCallback(
    (index: number) => {
      setPosition((previousPosition) => {
        if (count <= 0) {
          return 0;
        }

        const previousCurrent = normalizeIndex(previousPosition, count);

        if (index === previousCurrent + 1) {
          return previousPosition + 1;
        }

        if (index === previousCurrent - 1) {
          return previousPosition - 1;
        }

        const target = normalizeIndex(index, count);
        let delta = target - previousCurrent;

        if (delta > count / 2) {
          delta -= count;
        }

        if (delta < -count / 2) {
          delta += count;
        }

        return previousPosition + delta;
      });
    },
    [count],
  );

  return { current, position, setSlide };
};
