import React from 'react';
import closeIcon from 'assets/icons/icon-close.png';
import cx from 'classnames';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { MarketingCtaLink, MarketingNavLinks } from './MarketingHeaderLinks';

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
        'fixed inset-0 z-z-index-backdrop hidden tablet:block',
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
          'absolute top-0 flex h-full w-mobile-sidebar flex-col gap-0.8 bg-white p-2.4 transition-right duration-200',
          open ? 'right-0' : '-right-32',
        )}
      >
        <button
          type="button"
          className="h-4.2 w-4.2 self-end border-0 bg-transparent"
          aria-label="more"
          title={T('close')}
          onClick={onClose}
        >
          <Image src={closeIcon} height={25} alt="close" />
        </button>
        <MarketingNavLinks variant="mobile" onNavigate={onClose} />
        <div className="mt-1.2">
          <MarketingCtaLink onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebarHeader;
