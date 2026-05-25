import React from 'react';
import closeIcon from 'assets/icons/icon-close.png';
import cx from 'classnames';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { map } from 'lodash';
import NextLink from 'next/link';
import {
  MARKETING_CONTACT,
  MARKETING_NAV_LINKS,
} from 'store/static-data/marketing-pages.data';

type MobileSidebarHeaderProps = {
  open?: boolean;
  onClose?: () => void;
};

const MobileSidebarHeader: React.FC<MobileSidebarHeaderProps> = ({
  open,
  onClose,
}) => {
  const { T } = useTranslation();

  return (
    <div
      className={cx(
        'fixed inset-0 z-z-index-backdrop hidden [@media(max-width:1180px)]:block',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        className={cx(
          'absolute inset-0 bg-black/45 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={cx(
          'absolute top-0 flex h-full w-[min(320px,82vw)] flex-col gap-[8px] bg-white p-[24px] transition-[right] duration-200',
          open ? 'right-0' : 'right-[-320px]',
        )}
      >
        <button
          type="button"
          className="h-[42px] w-[42px] self-end border-0 bg-transparent"
          aria-label="more"
          title={T('close')}
          onClick={onClose}
        >
          <Image src={closeIcon} height={25} alt="close" />
        </button>
        {map(MARKETING_NAV_LINKS, (item) => (
          <NextLink
            key={item.href}
            href={item.href}
            className="relative inline-flex min-h-[52px] items-center justify-start whitespace-nowrap border-b border-[#f5d0d4] text-center text-[18px] font-normal leading-[1.2] text-[#606060] no-underline"
            onClick={onClose}
          >
            {item.label}
          </NextLink>
        ))}
        <NextLink
          href={MARKETING_CONTACT.ctaHref}
          className="mt-[12px] inline-flex min-h-[46px] items-center justify-center whitespace-nowrap rounded-full bg-[#f7b5b9] px-[30px] text-[18px] font-extrabold uppercase leading-none text-white no-underline"
          onClick={onClose}
        >
          {MARKETING_CONTACT.ctaLabel}
        </NextLink>
      </div>
    </div>
  );
};

export default MobileSidebarHeader;
