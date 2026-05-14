import React, { FC, useState } from 'react';
import Popup from 'components/popup/Popup';
import Typography from 'components/typography/Typography';
import Button from 'components/button/Button';

type PinModalContentProps = {
  pin: string;
  onPinChange: (value: string) => void;
  onConfirm: () => void;
};

const PinModalContent: FC<PinModalContentProps> = ({
  pin,
  onPinChange,
  onConfirm,
}) => (
  <div className="bg-white rounded-2xl p-8 mx-4 w-full max-w-[80vw] sm:max-w-[30vw] flex flex-col items-center gap-2 shadow-xl pin-popup">
    <Typography
      variant="none"
      className="text-center font-bold text-gray-800 leading-snug text-[2rem]"
    >
      Nhập mã PIN trên ảnh cứng để xem và tải ảnh của bạn
    </Typography>
    <input
      type="password"
      value={pin}
      maxLength={6}
      onChange={(e) => onPinChange(e.target.value)}
      placeholder="Nhập mã PIN"
      className="w-full border-2 border-[var(--sync-primary-color)] rounded-lg px-4 py-1 text-center text-[1.8rem] outline-none focus:border-[var(--sync-secondary-color)] transition placeholder:text-[1.8rem]"
    />
    <Button
      className="confirm-button"
      onClick={onConfirm}
      disabled={!pin.trim()}
      TypographyProps={{ variant: 'none', className: 'text-[2rem]' }}
    >
      Xác nhận
    </Button>
  </div>
);

type PinModalProps = {
  open: boolean;
  onConfirm: (pin: string) => void;
  onClose?: () => void;
};

const PinModal: FC<PinModalProps> = ({ open, onConfirm, onClose }) => {
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
          />
        ) as any
      }
    />
  );
};

export default PinModal;
