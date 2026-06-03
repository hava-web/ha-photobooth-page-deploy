import type React from 'react';
import cx from 'classnames';

type MarketingIconButtonIcon = 'chevron-left' | 'chevron-right' | 'close';
type MarketingIconButtonSize = 'sm' | 'md' | 'lg';
type MarketingIconButtonVariant = 'outline' | 'solid' | 'overlay';

type MarketingIconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  icon: MarketingIconButtonIcon;
  size?: MarketingIconButtonSize;
  variant?: MarketingIconButtonVariant;
};

const sizeClassMap: Record<
  MarketingIconButtonSize,
  { button: string; icon: string }
> = {
  sm: {
    button: 'h-10 w-10',
    icon: 'h-5 w-5',
  },
  md: {
    button: 'h-11 w-11',
    icon: 'h-6 w-6',
  },
  lg: {
    button: 'h-14 w-14',
    icon: 'h-7 w-7',
  },
};

const variantClassMap: Record<MarketingIconButtonVariant, string> = {
  outline: 'border border-brand-pink bg-white text-brand-pink',
  solid: 'border border-brand-pink bg-brand-pink text-white',
  overlay: 'border border-white text-white',
};

const chevronVariantClassMap: Record<MarketingIconButtonVariant, string> = {
  outline:
    'border border-brand-pink bg-white text-brand-pink hover:bg-brand-pink hover:text-white',
  solid:
    'border border-brand-pink bg-brand-pink text-white hover:border-brand-pink-hover hover:bg-brand-pink-hover',
  overlay:
    'border border-white bg-transparent text-white hover:bg-white hover:text-brand-pink',
};

const renderIcon = (icon: MarketingIconButtonIcon, iconClassName?: string) => {
  if (icon === 'chevron-left' || icon === 'chevron-right') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cx('block', iconClassName)}
      >
        <path
          d={icon === 'chevron-left' ? 'M15 6L9 12L15 18' : 'M9 6L15 12L9 18'}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (icon === 'close') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cx('block', iconClassName)}
      >
        <path
          d="M6 6L18 18M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }
  return null;
};

const MarketingIconButton: React.FC<MarketingIconButtonProps> = ({
  icon,
  size,
  variant,
  className,
  type = 'button',
  ...buttonProps
}) => {
  const sizeClass = size ? sizeClassMap[size] : undefined;
  const isChevron = icon === 'chevron-left' || icon === 'chevron-right';

  return (
    <button
      type={type}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full transition duration-200 focus:outline-none',
        isChevron && 'p-0 hover:scale-105 active:scale-95',
        sizeClass?.button,
        isChevron && !variant
          ? 'border border-brand-pink bg-white text-brand-pink hover:bg-brand-pink hover:text-white'
          : undefined,
        variant
          ? isChevron
            ? chevronVariantClassMap[variant]
            : variantClassMap[variant]
          : undefined,
        className,
      )}
      {...buttonProps}
    >
      {renderIcon(icon, sizeClass?.icon || 'h-6 w-6')}
    </button>
  );
};

export default MarketingIconButton;
