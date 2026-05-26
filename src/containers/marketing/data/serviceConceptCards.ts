import {
  SERVICE_GALLERY_IMAGES,
  type MarketingImage,
} from 'store/static-data/marketing-pages.data';

type ServiceConceptCard = {
  image: MarketingImage;
  title: string;
};

const CONCEPT_TITLES = [
  'Concept The Railway Station',
  'Concept Timeless Station',
  'Concept Lucid Dream',
];

export const CONCEPT_CARDS: ServiceConceptCard[] = SERVICE_GALLERY_IMAGES.map(
  (image, index) => ({
    image,
    title: CONCEPT_TITLES[index % CONCEPT_TITLES.length],
  }),
);
