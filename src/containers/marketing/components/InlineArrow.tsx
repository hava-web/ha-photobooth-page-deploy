import type React from 'react';
import cx from 'classnames';
import { ARROW_CLASS } from '../constants';

type InlineArrowProps = {
  direction: 'previous' | 'next';
  onClick: () => void;
  className?: string;
};

const InlineArrow: React.FC<InlineArrowProps> = ({
  direction,
  onClick,
  className,
}) => (
  <button
    type="button"
    aria-label={direction}
    className={cx(ARROW_CLASS, className)}
    onClick={onClick}
  >
    {direction === 'previous' ? '<' : '>'}
  </button>
);

export default InlineArrow;
