import React from 'react';
import { useTranslation } from 'hooks/useTranslation';
import Image from 'components/image/Image';
import nhuongQuyenIcon from 'assets/icons/nhuong_quyen.png';
import zaloIcon from 'assets/icons/zalo.png';
import messengerIcon from 'assets/icons/messenger.png';
import phoneIcon from 'assets/icons/phone.png';

const FloatingSocialButtons = () => {
  const { T } = useTranslation();

  return (
    <div className="flex items-end fixed flex-col right-2 bottom-10 z-z-index-floating-button">
      <button
        type="button"
        className="animate-scale-pulse mt-2"
        aria-label="zalo"
        title={T('zalo')}
      >
        <Image src={zaloIcon} height={60} alt="zalo" />
      </button>
      <a
        href={process.env.NEXT_PUBLIC_MESSENGER_URL}
        target="_blank"
        className="animate-scale-pulse mt-2"
        title={T('Tin nhắn facebook')}
        aria-label="messenger"
        rel="noreferrer"
      >
        <Image src={messengerIcon} height={60} alt="messenger" />
      </a>
      <a
        className="animate-tilt-shaking mt-2"
        title={T('hotline')}
        aria-label="phone"
        href="tel:0975338244"
      >
        <Image src={phoneIcon} height={60} alt="phone" />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_FRANCHISE_FORM_REGISTER_URL}
        target="_blank"
        className="animate-tilt-shaking mt-2"
        title={T('nhượng quyền')}
        aria-label="nhuong quyen"
        rel="noreferrer"
      >
        <Image src={nhuongQuyenIcon} height={100} alt="nhuong quyen" />
      </a>
    </div>
  );
};

export default FloatingSocialButtons;
