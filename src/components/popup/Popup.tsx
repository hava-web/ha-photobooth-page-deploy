import React, {
  ButtonHTMLAttributes,
  FC,
  HtmlHTMLAttributes,
  ReactElement,
  useEffect,
} from 'react';
import cx from 'classnames';

export type PopupProps = HtmlHTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  content?: ReactElement | string | any;
  RenderContent?: () => ReactElement | string;
  onClose?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  PopupBoxProps?: HtmlHTMLAttributes<HTMLDivElement>;
};

const Popup: FC<PopupProps> = ({
  open = false,
  content = '',
  RenderContent = null,
  onClose,
  PopupBoxProps,
  ...rest
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [open]);

  return open ? (
    <div
      {...rest}
      className={cx(
        'fixed w-screen h-screen top-0 left-0 z-z-index-popup bg-black bg-opacity-70',
        rest?.className,
      )}
    >
      <div
        {...PopupBoxProps}
        className={cx('pb-popup-box w-full h-full', PopupBoxProps?.className)}
      >
        {RenderContent ? RenderContent() : content}
      </div>
    </div>
  ) : null;
};

export default Popup;
