import type React from 'react';
import cx from 'classnames';

type SectionTitleProps = {
  as?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  size?: 'section' | 'sectionLg' | 'sectionSm' | 'hero';
};

const SECTION_TITLE_SIZE_CLASS: Record<
  NonNullable<SectionTitleProps['size']>,
  string
> = {
  section: 'text-marketing-section',
  sectionLg: 'text-marketing-section-lg',
  sectionSm: 'text-marketing-section-sm',
  hero: 'text-marketing-hero',
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  as: HeadingTag = 'h2',
  children,
  className,
  muted,
  size = 'section',
}) => {
  return (
    <HeadingTag
      className={cx(
        'mx-auto mb-14 max-w-marketing-title whitespace-pre-line text-center font-UTMAVo font-normal uppercase phone:mb-9 phone:whitespace-normal phone:text-brand-card-title',
        SECTION_TITLE_SIZE_CLASS[size],
        muted ? 'text-white' : 'text-brand-pink',
        className,
      )}
    >
      {children}
    </HeadingTag>
  );
};

export default SectionTitle;
