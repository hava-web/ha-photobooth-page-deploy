/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import closeIcon from 'assets/icons/icon-close.png';
import cx from 'classnames';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { map } from 'lodash';
import { Link } from 'react-scroll/modules';
import { headerNavBarLinks } from 'store/static-data/static-data.data';

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
    <div className={cx('mobile-sidebar-header', { isActive: open })}>
      <div className="mobile-sidebar-backdrop" onClick={onClose} />
      <div className="mobile-sidebar-navbar">
        <button
          type="button"
          className="btn-close-sidebar"
          aria-label="more"
          title={T('close')}
          onClick={onClose}
        >
          <Image src={closeIcon} height={25} alt="close" />
        </button>
        {map(headerNavBarLinks, (item) => (
          <Link
            key={item?.value}
            href={`#${item?.value}`}
            to={item?.value}
            className="header-navbar-link"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-54}
            duration={500}
            onClick={onClose}
          >
            {item?.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileSidebarHeader;
