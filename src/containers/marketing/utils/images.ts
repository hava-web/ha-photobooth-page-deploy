import type { MarketingImage } from 'store/static-data/marketing-pages.data';

export const getImageKey = (image: MarketingImage, fallback: string) =>
  typeof image === 'string' ? image : image.src || fallback;
