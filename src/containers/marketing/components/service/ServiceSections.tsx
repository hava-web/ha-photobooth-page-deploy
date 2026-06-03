import type React from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import { AssetIcons, type AssetIconName } from 'assets/icons/AssetIcons';
import Image from 'components/image/Image';
import {
  MARKETING_CONTACT,
  type MarketingImage,
} from 'store/static-data/marketing-pages.data';
import { getImageKey } from '../../utils/images';
import Media from '../Media';

export const ServiceSectionHeading: React.FC<{
  as?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  size?: 'section' | 'sectionLg' | 'sectionSm' | 'hero';
}> = ({
  as: HeadingTag = 'h2',
  children,
  className,
  muted,
  size = 'section',
}) => (
  <HeadingTag
    className={cx(
      'mx-auto mb-12 max-w-marketing-title whitespace-pre-line text-center font-UTMAVo font-normal uppercase phone:whitespace-normal phone:text-brand-card-title',
      {
        'text-marketing-section': size === 'section',
        'text-marketing-section-lg': size === 'sectionLg',
        'text-marketing-section-sm': size === 'sectionSm',
        'text-marketing-hero': size === 'hero',
      },
      muted ? 'text-white' : 'text-brand-pink',
      className,
    )}
  >
    {children}
  </HeadingTag>
);

export const ServicePillHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h2
    className={cx(
      'mx-auto mb-14 flex min-h-14 w-video-carousel max-w-full items-center justify-center rounded-full bg-brand-pink px-14 text-center text-2xl font-extrabold uppercase leading-tight text-white phone:min-h-12 phone:text-lg',
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
    <h3 className="m-0 flex min-h-20 items-center border-b border-brand-muted px-9 text-brand-card-title font-extrabold uppercase text-brand-pink phone:text-xl">
      {title}
    </h3>
    <NextLink
      href={MARKETING_CONTACT.ctaHref}
      className="flex min-h-14 items-center justify-center px-7 text-lg font-extrabold uppercase leading-tight text-brand-pink no-underline phone:text-base"
    >
      Nhận báo giá
    </NextLink>
  </article>
);

export const ServiceImageGrid: React.FC<{
  images: MarketingImage[];
  className?: string;
  square?: boolean;
}> = ({ images, className, square }) => (
  <div
    className={cx(
      'grid grid-cols-3 gap-x-12 gap-y-12 phone:grid-cols-1 phone:gap-6',
      className,
    )}
  >
    {images.map((image, index) => (
      <Media
        key={getImageKey(image, `service-image-${index}`)}
        src={image}
        alt={`Dịch vụ photobooth Fun Studio ${index + 1}`}
        className={square ? 'aspect-square' : 'aspect-service-card'}
      />
    ))}
  </div>
);

export const ServiceSalesCircle: React.FC<{
  icon?: MarketingImage;
  assetIcon?: AssetIconName;
  text: string;
}> = ({ icon, assetIcon, text }) => {
  const Icon = assetIcon ? AssetIcons[assetIcon] : null;

  return (
    <article className="relative mx-auto flex h-80 w-80 items-center justify-center rounded-full bg-brand-pink p-12 text-center text-xl font-extrabold leading-snug text-white phone:h-60 phone:w-60 phone:text-base">
      {Icon && (
        <span className="absolute -left-3 -top-3 flex h-20 w-20 items-center justify-center rounded-full border border-white bg-brand-pink text-white">
          <Icon className="h-12 w-12" aria-hidden="true" />
        </span>
      )}
      {!Icon && icon && (
        <span className="absolute -left-3 -top-3 flex h-20 w-20 items-center justify-center rounded-full border border-white bg-brand-pink">
          <Image src={icon} alt="" width={36} height={36} />
        </span>
      )}
      {text}
    </article>
  );
};

export const ServiceModelCard: React.FC<{
  image: MarketingImage;
  title: string;
  text: string;
  bodyClassName?: string;
}> = ({ image, title, text, bodyClassName }) => (
  <article className="border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-service-model" />
    <h3 className="mx-9 mb-6 mt-7 text-brand-card-title font-extrabold uppercase text-brand-pink">
      {title}
    </h3>
    <p
      className={cx(
        'mx-9 mb-12 mt-0 leading-relaxed text-brand-text phone:text-base',
        bodyClassName || 'text-lg',
      )}
    >
      {text}
    </p>
  </article>
);

export const ServiceOtherProductCard: React.FC<{
  image: MarketingImage;
  title: string;
}> = ({ image, title }) => (
  <article className="mx-auto w-[18.75rem] border border-brand-muted bg-white">
    <Media src={image} alt={title} className="aspect-square" />
    <h3 className="m-0 flex min-h-14 items-center justify-center px-5 text-center text-lg font-extrabold uppercase leading-tight text-brand-pink">
      {title}
    </h3>
  </article>
);
