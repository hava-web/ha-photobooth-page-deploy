import { useEffect, useState } from 'react';

type ResponsiveVisibleCountOptions = {
  desktop: number;
  tablet?: number;
  mobile?: number;
};

export const useResponsiveVisibleCount = ({
  desktop,
  tablet = desktop,
  mobile = tablet,
}: ResponsiveVisibleCountOptions) => {
  const [visibleCount, setVisibleCount] = useState(desktop);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(mobile);
        return;
      }

      if (window.innerWidth <= 1180) {
        setVisibleCount(tablet);
        return;
      }

      setVisibleCount(desktop);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [desktop, mobile, tablet]);

  return visibleCount;
};
