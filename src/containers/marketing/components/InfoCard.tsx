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
        ? 'min-h-info-card-compact px-[4.375rem] pb-[4.375rem] pt-14'
        : variant === 'franchise-service'
          ? 'min-h-[21.25rem] px-14 pb-14 pt-[4.375rem] phone:min-h-0 phone:px-12 phone:pb-12 phone:pt-14'
          : 'min-h-info-card px-[5.625rem] pb-[5.625rem] pt-[10.3125rem]',
    )}
  >
    {typeof index === 'number' && (
      <div className="absolute left-1/2 -top-8 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-brand-subtitle font-bold text-brand-pink">
        {index}
      </div>
    )}
    {icon && (
      <div className="absolute left-1/2 -top-8 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-brand-pink">
        <Image src={icon} alt="" width={42} height={42} />
      </div>
    )}
    {title && (
      <h3
        className={cx(
          'mt-0 font-extrabold uppercase leading-snug text-brand-pink',
          variant === 'franchise-service' ? 'mb-7 text-lg' : 'mb-14 text-xl',
        )}
      >
        {title}
      </h3>
    )}
    <p
      className={cx(
        'm-0 phone:text-base',
        compact || variant === 'franchise-service'
          ? 'text-[1.25rem] leading-relaxed'
          : 'text-lg leading-relaxed',
      )}
    >
      {text}
    </p>
  </article>
);

export default InfoCard;
