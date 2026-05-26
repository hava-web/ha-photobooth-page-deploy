import type React from 'react';
import cx from 'classnames';
import Image from 'components/image/Image';
import type { MarketingImage } from 'store/static-data/marketing-pages.data';

type InfoCardProps = {
  index?: number;
  icon?: MarketingImage;
  title?: string;
  text: string;
  compact?: boolean;
  variant?: 'default' | 'franchise-service';
};

const InfoCard: React.FC<InfoCardProps> = ({
  index,
  icon,
  title,
  text,
  compact,
  variant = 'default',
}) => (
  <article
    className={cx(
      'relative rounded-lg border border-brand-muted bg-white text-brand-text',
      compact
        ? 'min-h-info-card-compact px-7 pb-7 pt-5.4'
        : variant === 'franchise-service'
          ? 'min-h-franchise-service-card px-7 pb-7 pt-16.5'
          : 'min-h-info-card px-9 pb-9 pt-16.5',
    )}
  >
    {typeof index === 'number' && (
      <div className="absolute left-1/2 -top-3.4 flex h-7.6 w-7.6 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-brand-subtitle font-bold text-brand-pink">
        {index}
      </div>
    )}
    {icon && (
      <div className="absolute left-1/2 -top-3.4 flex h-7.6 w-7.6 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-brand-pink">
        <Image src={icon} alt="" width={42} height={42} />
      </div>
    )}
    {title && (
      <h3 className="mb-6 mt-0 text-xl font-extrabold uppercase leading-snug text-brand-pink">
        {title}
      </h3>
    )}
    <p className="m-0 text-lg leading-relaxed phone:text-base">{text}</p>
  </article>
);

export default InfoCard;
