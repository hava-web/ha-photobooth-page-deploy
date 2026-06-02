import type React from 'react';
import cx from 'classnames';
import { ARROW_CLASS } from '../constants';
import MarketingIconButton from './MarketingIconButton';

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
  <MarketingIconButton
    icon={direction === 'previous' ? 'chevron-left' : 'chevron-right'}
    aria-label={direction}
    className={cx(ARROW_CLASS, className)}
    onClick={onClick}
  />
);

export default InlineArrow;
