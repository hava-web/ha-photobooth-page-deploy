import React from 'react';
import { useTranslation } from 'hooks/useTranslation';

const FloatingSocialButtons = () => {
  const { T } = useTranslation();

  return (
    <div className="flex items-end fixed flex-col right-2 bottom-10">
      <button
        type="button"
        className="animate-scale-pulse w-[8rem] mt-2"
        aria-label="zalo"
        title={T('zalo')}
      >
        <img src="/icons/zalo.png" alt="zalo" />
      </button>
      <button
        type="button"
        className="animate-scale-pulse w-[8rem] mt-2"
        title={T('Tin nhắn facebook')}
        aria-label="messenger"
      >
        <img src="/icons/messenger.png" alt="messenger" />
      </button>
      <button
        type="button"
        className="animate-tilt-shaking w-[8rem] mt-2"
        title={T('hotline')}
        aria-label="phone"
      >
        <img src="/icons/phone.png" alt="phone" />
      </button>
      <button
        type="button"
        className="animate-tilt-shaking mt-2"
        title={T('nhượng quyền')}
        aria-label="nhuong quyen"
      >
        <img
          className="h-[12rem]"
          src="/icons/nhuong_quyen.png"
          alt="nhuong quyen"
        />
      </button>
    </div>
  );
};

export default FloatingSocialButtons;
