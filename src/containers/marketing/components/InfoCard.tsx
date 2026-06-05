import type React from 'react';
import cx from 'classnames';
import { AssetIcons, type AssetIconName } from 'assets/icons/AssetIcons';
import Image from 'components/image/Image';
import type { MarketingImage } from 'store/static-data/marketing-pages.data';

type InfoCardProps = {
  index?: number;
  icon?: MarketingImage;
  assetIcon?: AssetIconName;
  title?: string;
  text: string;
  compact?: boolean;
  variant?: 'default' | 'franchise-service';
};

const InfoCard: React.FC<InfoCardProps> = ({
  index,
  icon,
  assetIcon,
  title,
  text,
  compact,
  variant = 'default',
}) => {
  const Icon = assetIcon ? AssetIcons[assetIcon] : null;

  return (
    <article
      className={cx(
        'relative bg-white text-brand-text',
        compact
          ? 'min-h-info-card-compact rounded-[20px] border-[3px] border-white px-5 pb-5 pt-[3.75rem]'
          : variant === 'franchise-service'
            ? 'min-h-[21.25rem] rounded-[20px] border border-brand-muted px-[1.875rem] pb-[1.875rem] pt-[3.75rem] phone:min-h-0 phone:px-[1.875rem] phone:pb-[1.875rem] phone:pt-[3.75rem]'
            : 'min-h-info-card rounded-lg border border-brand-muted px-[5.625rem] pb-[5.625rem] pt-[10.3125rem]',
      )}
    >
      {typeof index === 'number' && !Icon && (
        <div className="absolute left-1/2 -top-8 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-brand-subtitle font-bold text-brand-pink">
          {index}
        </div>
      )}
      {Icon && (
        <div
          className={cx(
            'absolute left-1/2 -top-8 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-brand-pink text-white',
            compact ? 'border-[3px] border-white' : 'border border-brand-pink',
          )}
        >
          <Icon className="h-12 w-12" aria-hidden="true" />
        </div>
      )}
      {!Icon && icon && (
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
          'm-0 whitespace-pre-line phone:text-base',
          compact || variant === 'franchise-service'
            ? 'text-[1.25rem] leading-relaxed'
            : 'text-lg leading-relaxed',
        )}
      >
        {text}
      </p>
    </article>
  );
};

export default InfoCard;
