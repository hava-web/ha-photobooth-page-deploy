import React, { FC, useState } from 'react';
import PinCodeExample from 'assets/images/download/pin_code_example.png';
import { useTranslation } from 'hooks/useTranslation';
import Popup from 'components/popup/Popup';
import Typography from 'components/typography/Typography';
import Button from 'components/button/Button';

type PinModalContentProps = {
  pin: string;
  onPinChange: (value: string) => void;
  onConfirm: () => void;
  errorMessage?: string;
};

const PinModalContent: FC<PinModalContentProps> = ({
  pin,
  onPinChange,
  onConfirm,
  errorMessage,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-2xl p-[5rem] mx-[2.5rem] w-full max-w-[80vw] sm:max-w-[30vw] flex flex-col items-center gap-[1.25rem] shadow-xl pin-popup">
      <Typography
        variant="none"
        className="text-center font-bold text-gray-800 leading-snug text-xl"
      >
        {t('common:pinModalTitle')}
      </Typography>
      <input
        aria-label="PIN"
        type="password"
        value={pin}
        maxLength={6}
        onChange={(e) => onPinChange(e.target.value)}
        placeholder="Nhập mã PIN"
        className="w-full border-2 border-[var(--sync-primary-color)] rounded-lg px-[2.5rem] py-[0.625rem] text-center text-lg outline-none focus:border-[var(--sync-secondary-color)] transition placeholder:text-lg"
      />
      <div className="flex flex-col items-center w-full my-[1.25rem]">
        <Typography
          variant="none"
          className="text-lg text-red-600 text-center mb-[1.25rem]"
        >
          {t('common:pinModalNote')}
        </Typography>
        <img
          src={PinCodeExample.src}
          alt={t('common:pinModalExampleAlt')}
          style={{
            maxWidth: '220px',
            borderRadius: 8,
            boxShadow: '0 2px 8px #0001',
          }}
        />
      </div>

      {!!errorMessage && (
        <Typography variant="none" className="text-base text-center pin-error">
          {errorMessage}
        </Typography>
      )}
      <Button
        className="confirm-button"
        onClick={onConfirm}
        disabled={!pin.trim()}
        TypographyProps={{ variant: 'none', className: 'text-xl' }}
      >
        Xác nhận
      </Button>
    </div>
  );
};

type PinModalProps = {
  open: boolean;
  onConfirm: (pin: string) => void;
  onClose?: () => void;
  errorMessage?: string;
};

const PinModal: FC<PinModalProps> = ({
  open,
  onConfirm,
  onClose,
  errorMessage,
}) => {
  const [pin, setPin] = useState('');

  const handleConfirm = () => {
    onConfirm(pin);
  };

  return (
    <Popup
      open={open}
      onClose={onClose}
      PopupBoxProps={{
        className: 'flex items-center justify-center',
      }}
      content={
        (
          <PinModalContent
            pin={pin}
            onPinChange={setPin}
            onConfirm={handleConfirm}
            errorMessage={errorMessage}
          />
        ) as any
      }
    />
  );
};

export default PinModal;
