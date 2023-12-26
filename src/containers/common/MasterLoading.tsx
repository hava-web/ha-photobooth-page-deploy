import React, { useEffect, useState } from 'react';
import { useTranslation } from 'hooks/useTranslation';
import Image from 'components/image/Image';
import { useSpring, animated } from '@react-spring/web';
import funlogo from 'assets/images/fun_studio_logo.png';

const MasterLoading = () => {
  useTranslation();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const styles = useSpring({
    opacity: isFirstLoading ? 1 : 0,
  });

  useEffect(() => {
    if (document?.body) {
      document.body.style.overflow = 'hidden';
    }
    setTimeout(() => {
      if (document?.body) {
        document.body.style.overflow = 'auto';
      }
      setIsFirstLoading(false);
    }, 3000);
  }, []);

  return (
    <animated.div
      style={styles}
      className="pointer-events-none fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-white z-z-index-loading"
    >
      <Image
        className="animate-scale-pulse no-select"
        src={funlogo}
        width={150}
        alt="loading icon"
      />
    </animated.div>
  );
};

export default MasterLoading;
