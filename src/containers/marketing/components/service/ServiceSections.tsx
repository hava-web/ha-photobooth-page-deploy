import type React from 'react';
import cx from 'classnames';
import Image from 'components/image/Image';
import {
  MARKETING_CONTACT,
  type MarketingImage,
} from 'store/static-data/marketing-pages.data';
import { getImageKey } from '../../utils/images';
import Media from '../Media';

export const ServiceSectionHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}> = ({ children, className, muted }) => (
  <h1
    className={cx(
      'mx-auto mb-5 max-w-marketing-title text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight phone:text-brand-card-title',
      muted ? 'text-white' : 'text-brand-pink',
      className,
    )}
  >
    {children}
  </h1>
);

export const ServicePillHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h2
    className={cx(
      'mx-auto mb-6 flex min-h-5.8 w-video-carousel max-w-full items-center justify-center rounded-full bg-brand-pink px-6 text-center text-2xl font-extrabold uppercase leading-tight text-white phone:min-h-4.8 phone:text-lg',
      className,
    )}
  >
    {children}
  </h2>
);

export const ServiceMachineCard: React.FC<{
  image: MarketingImage;
  title: string;
}> = ({ image, title }) => (
  <article className="border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-service-card" />
    <h3 className="m-0 flex min-h-8 items-center border-b border-brand-muted px-3.5 text-brand-card-title font-extrabold uppercase leading-tight text-brand-pink phone:text-xl">
      {title}
    </h3>
    <a
      href={MARKETING_CONTACT.ctaHref}
      className="flex min-h-5.8 items-center justify-center px-3 text-lg font-extrabold uppercase leading-tight text-brand-pink no-underline phone:text-base"
    >
      Nhận báo giá
    </a>
  </article>
);

export const ServiceImageGrid: React.FC<{
  images: MarketingImage[];
  className?: string;
  square?: boolean;
}> = ({ images, className, square }) => (
  <div
    className={cx(
      'grid grid-cols-3 gap-x-4.8 gap-y-4.8 phone:grid-cols-1 phone:gap-2.4',
      className,
    )}
  >
    {images.map((image, index) => (
      <Media
        key={getImageKey(image, `service-image-${index}`)}
        src={image}
        alt="Fun Studio service"
        className={square ? 'aspect-square' : 'aspect-service-card'}
      />
    ))}
  </div>
);

export const ServiceSalesCircle: React.FC<{
  icon?: MarketingImage;
  text: string;
}> = ({ icon, text }) => (
  <article className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-brand-pink p-5 text-center text-xl font-extrabold leading-snug text-white phone:h-24 phone:w-24 phone:text-base">
    {icon && (
      <span className="absolute -left-1.2 -top-1.2 flex h-7.6 w-7.6 items-center justify-center rounded-full border border-white bg-brand-pink">
        <Image src={icon} alt="" width={36} height={36} />
      </span>
    )}
    {text}
  </article>
);

export const ServiceModelCard: React.FC<{
  image: MarketingImage;
  title: string;
  text: string;
}> = ({ image, title, text }) => (
  <article className="border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-service-model" />
    <h3 className="mx-3.5 mb-2.4 mt-3 text-brand-card-title font-extrabold uppercase leading-tight text-brand-pink">
      {title}
    </h3>
    <p className="mx-3.5 mb-5 mt-0 text-lg leading-relaxed text-brand-text phone:text-base">
      {text}
    </p>
  </article>
);

export const ServiceOtherProductCard: React.FC<{
  image: MarketingImage;
  title: string;
}> = ({ image, title }) => (
  <article className="mx-auto w-30 border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-square" />
    <h3 className="m-0 flex min-h-5.8 items-center justify-center px-2 text-center text-lg font-extrabold uppercase leading-tight text-brand-pink">
      {title}
    </h3>
  </article>
);
