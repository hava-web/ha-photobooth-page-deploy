import type React from 'react';
import cx from 'classnames';

type SliderControlsProps = {
  count: number;
  current: number;
  light?: boolean;
  showArrows?: boolean;
  onChange: (index: number) => void;
};

const SliderControls: React.FC<SliderControlsProps> = ({
  count,
  current,
  light,
  showArrows = true,
  onChange,
}) => {
  if (count <= 1) {
    return null;
  }

  const dotBaseClass = cx(
    'h-2.2 w-2.2 rounded-full border',
    light ? 'border-white' : 'border-brand-pink',
  );
  const activeDotClass = light ? 'bg-white' : 'bg-brand-pink';

  return (
    <div className="mt-3.4 flex items-center justify-center gap-1.8">
      {showArrows && (
        <button
          type="button"
          aria-label="previous"
          className={cx(
            'h-2.2 w-2.2 rounded-full border text-marketing-control leading-1.8',
            light
              ? 'border-white bg-transparent text-white'
              : 'border-brand-pink bg-white text-brand-pink',
          )}
          onClick={() => onChange(current - 1)}
        >
          {'<'}
        </button>
      )}
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`go to slide ${index + 1}`}
          className={cx(
            dotBaseClass,
            current === index ? activeDotClass : 'bg-transparent',
          )}
          onClick={() => onChange(index)}
        />
      ))}
      {showArrows && (
        <button
          type="button"
          aria-label="next"
          className={cx(
            'h-2.2 w-2.2 rounded-full border text-marketing-control leading-1.8',
            light
              ? 'border-white bg-transparent text-white'
              : 'border-brand-pink bg-white text-brand-pink',
          )}
          onClick={() => onChange(current + 1)}
        >
          {'>'}
        </button>
      )}
    </div>
  );
};

export default SliderControls;
