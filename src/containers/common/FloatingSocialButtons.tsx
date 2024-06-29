import React, { useRef, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'hooks/useTranslation';
import Image from 'components/image/Image';
import nhuongQuyenIcon from 'assets/icons/nhuong_quyen.png';
import zaloIcon from 'assets/icons/zalo.png';
import plusIcon from 'assets/icons/icon-plus.png';
import messengerIcon from 'assets/icons/messenger.png';
import phoneIcon from 'assets/icons/phone.png';
import PopoverBox from 'components/popover/PopoverBox';
import zaloQRCodeImage from 'assets/images/home/zalo_qrcode.webp';

const FloatingSocialButtons = () => {
  const { T } = useTranslation();
  const btnZaloRef = useRef<HTMLButtonElement>(null);
  const [zaloAnchorDimension, setZaloAnchorDimension] = useState<
    DOMRect | null | undefined
  >(null);
  const [isOpenZaloPopup, setIsOpenZaloPopup] = useState<boolean>(false);
  const [isShowButtonInMobile, setIsShowButtonInMobile] =
    useState<boolean>(false);

  const handleShowZaloPopup = () => {
    setIsOpenZaloPopup(true);
    setTimeout(() => {
      setZaloAnchorDimension(btnZaloRef?.current?.getBoundingClientRect?.());
    }, 200);
  };

  const handleHideZaloPopup = () => {
    setIsOpenZaloPopup(false);
  };

  const handleTToggleShowButtonInMobile = () => {
    setIsShowButtonInMobile((o) => !o);
  };

  return (
    <div
      className={cx('floating-social-buttons', {
        'show-in-mobile': isShowButtonInMobile,
      })}
    >
      <PopoverBox
        className="zalo-popover"
        anchorDimension={zaloAnchorDimension}
        popoverDir={'left'}
        content={
          <div>
            <Image src={zaloQRCodeImage} height={400} alt="zalo qr code" />
          </div>
        }
        open={isOpenZaloPopup}
        onClick={handleHideZaloPopup}
        PopoverBoxBoxProps={{ className: 'zalo-popover-box' }}
      />
      <button
        ref={btnZaloRef}
        type="button"
        className="floating-button animate-scale-pulse"
        aria-label="zalo"
        title={T('zalo')}
        onClick={handleShowZaloPopup}
      >
        <Image src={zaloIcon} height={60} alt="zalo" />
      </button>
      <a
        href={process.env.NEXT_PUBLIC_MESSENGER_URL}
        target="_blank"
        className="floating-button animate-scale-pulse"
        title={T('Tin nhắn facebook')}
        aria-label="messenger"
        rel="noreferrer"
      >
        <Image src={messengerIcon} height={60} alt="messenger" />
      </a>
      <a
        className="floating-button animate-tilt-shaking"
        title={T('hotline')}
        aria-label="phone"
        href="tel:0975338244"
      >
        <Image src={phoneIcon} height={60} alt="phone" />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_FRANCHISE_FORM_REGISTER_URL}
        target="_blank"
        className="floating-button animate-tilt-shaking"
        title={T('nhượng quyền')}
        aria-label="nhuong quyen"
        rel="noreferrer"
      >
        <Image src={nhuongQuyenIcon} height={100} alt="nhuong quyen" />
      </a>
      <button
        type="button"
        className="floating-button btn-show-more"
        aria-label="more"
        title={T('more')}
        onClick={handleTToggleShowButtonInMobile}
      >
        <Image src={plusIcon} height={65} alt="more" />
      </button>
    </div>
  );
};

export default FloatingSocialButtons;
