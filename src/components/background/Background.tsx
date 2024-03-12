import React, { FC, HtmlHTMLAttributes } from 'react';
import cx from 'classnames';

export enum BackgroundTypes {
  FRAME = 'frame',
  LAYOUT = 'layout',
  PAYMENT = 'payment',
}

export type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  type?: BackgroundTypes;
};

const Background: FC<Props> = ({
  className,
  type = BackgroundTypes.FRAME,
  ...rest
}) => (
  <div
    {...rest}
    className={cx(
      'w-screen h-screen fixed top-0 left-0 -z-50 object-cover bg-image',
      'bg-image',
      {
        'bg-image-frame': type === BackgroundTypes.FRAME || !type,
        'bg-image-layout': type === BackgroundTypes.LAYOUT,
        'bg-image-payment': type === BackgroundTypes.PAYMENT,
      },
      className,
    )}
  />
);

export default Background;
