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
    'h-3.5 w-3.5 transform-gpu rounded-full border-0 transition duration-200 ease-out',
  );
  const activeDotClass = light
    ? 'bg-white'
    : tone === 'muted'
      ? 'bg-brand-control-dark'
      : 'bg-brand-pink';
  const inactiveDotClass = light
    ? 'bg-white/45'
    : tone === 'muted'
      ? 'bg-brand-line'
      : 'bg-brand-soft-line';

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
          className={light ? 'bg-transparent text-white' : undefined}
          onClick={() => onChange(current - 1)}
        />
      )}
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`go to slide ${index + 1}`}
          aria-current={current === index ? 'true' : undefined}
          className={cx(
            dotBaseClass,
            current === index
              ? [activeDotClass, 'scale-[1.35]']
              : [inactiveDotClass, 'scale-90 opacity-80'],
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
          className={light ? 'bg-transparent text-white' : undefined}
          onClick={() => onChange(current + 1)}
        />
      )}
    </div>
  );
};

export default SliderControls;
