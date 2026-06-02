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
    button: 'h-5 w-5',
    icon: 'h-3 w-3',
  },
  md: {
    button: 'h-11 w-11',
    icon: 'h-6 w-6',
  },
  lg: {
    button: 'h-14 w-14',
    icon: 'h-6 w-6',
  },
};

const variantClassMap: Record<MarketingIconButtonVariant, string> = {
  outline: 'border border-brand-pink bg-white text-brand-pink',
  solid: 'border border-brand-pink bg-brand-pink text-white',
  overlay: 'border border-white text-white',
};

const renderIcon = (icon: MarketingIconButtonIcon, iconClassName?: string) => {
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

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cx(
        'block',
        iconClassName,
        icon === 'chevron-left' && 'rotate-180',
      )}
    >
      <path
        d="M9 5L16 12L9 19"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
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

  return (
    <button
      type={type}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none',
        sizeClass?.button,
        variant ? variantClassMap[variant] : undefined,
        className,
      )}
      {...buttonProps}
    >
      {renderIcon(icon, sizeClass?.icon || 'h-6 w-6')}
    </button>
  );
};

export default MarketingIconButton;
