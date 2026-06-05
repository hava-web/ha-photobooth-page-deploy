import {
  HOME_VIDEO,
  PRESS_ITEMS,
} from 'store/static-data/marketing-pages.data';
import type { HomeVideoSlide } from '../components/HomeVideoCard';

const HOME_VIDEO_EMBEDS = [
  'https://www.youtube.com/embed/unyZnLKiWUw?si=UCcTrLZJO7K50aFl',
  'https://www.youtube.com/embed/CnKDC4b1HTo?si=MeEzBoT1diw2gHP8',
  'https://www.youtube.com/embed/nkewKtTuHts?si=fkPGFrjVnNQhaKP2',
];

export const HOME_VIDEO_SLIDES: HomeVideoSlide[] = [
  { title: HOME_VIDEO.title, video: HOME_VIDEO_EMBEDS[0] },
  ...PRESS_ITEMS.slice(0, 2).map((item, index) => ({
    title: item.title,
    video: HOME_VIDEO_EMBEDS[index + 1] ?? HOME_VIDEO_EMBEDS[0],
  })),
];
