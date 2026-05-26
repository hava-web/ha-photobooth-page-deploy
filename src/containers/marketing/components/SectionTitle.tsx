import type React from 'react';
import cx from 'classnames';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className,
  muted,
}) => (
  <h1
    className={cx(
      'mx-auto mb-5.4 max-w-marketing-title text-center font-UTMAVo text-marketing-hero font-normal uppercase leading-snug phone:mb-3.6 phone:text-brand-card-title',
      muted ? 'text-white' : 'text-brand-pink',
      className,
    )}
  >
    {children}
  </h1>
);

export default SectionTitle;
