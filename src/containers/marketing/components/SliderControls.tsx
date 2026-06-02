import type React from 'react';
import cx from 'classnames';
import MarketingIconButton from './MarketingIconButton';

type SliderControlsProps = {
  count: number;
  current: number;
  className?: string;
  light?: boolean;
  showArrows?: boolean;
  tone?: 'brand' | 'muted';
  onChange: (index: number) => void;
};

const SliderControls: React.FC<SliderControlsProps> = ({
  count,
  current,
  className,
  light,
  showArrows = true,
  tone = 'brand',
  onChange,
}) => {
  if (count <= 1) {
    return null;
  }

  const dotBaseClass = cx(
    'h-5 w-5 rounded-full',
    light
      ? 'border border-white'
      : tone === 'muted'
        ? 'border-0'
        : 'border border-brand-pink',
  );
  const activeDotClass = light
    ? 'bg-white'
    : tone === 'muted'
      ? 'bg-brand-muted'
      : 'bg-brand-pink';
  const inactiveDotClass =
    !light && tone === 'muted' ? 'bg-brand-line' : 'bg-transparent';

  return (
    <div
      className={cx('mt-8 flex items-center justify-center gap-4', className)}
    >
      {showArrows && (
        <MarketingIconButton
          icon="chevron-left"
          aria-label="previous"
          size="sm"
          variant={light ? 'overlay' : 'outline'}
          className={light ? 'bg-transparent' : undefined}
          onClick={() => onChange(current - 1)}
        />
      )}
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`go to slide ${index + 1}`}
          className={cx(
            dotBaseClass,
            current === index ? activeDotClass : inactiveDotClass,
          )}
          onClick={() => onChange(index)}
        />
      ))}
      {showArrows && (
        <MarketingIconButton
          icon="chevron-right"
          aria-label="next"
          size="sm"
          variant={light ? 'overlay' : 'outline'}
          className={light ? 'bg-transparent' : undefined}
          onClick={() => onChange(current + 1)}
        />
      )}
    </div>
  );
};

export default SliderControls;
