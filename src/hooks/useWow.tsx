import { useEffect } from 'react';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

const useWow = (): void => {
  useEffect(() => {
    new WOW().init();
  }, []);
};

export default useWow;
