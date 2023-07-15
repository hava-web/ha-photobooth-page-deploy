import React, { FC, HtmlHTMLAttributes } from 'react';
import cx from 'classnames';
import classes from './background.module.css';

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
      classes['bg-image'],
      {
        [classes['bg-image-frame']]: type === BackgroundTypes.FRAME || !type,
        [classes['bg-image-layout']]: type === BackgroundTypes.LAYOUT,
        [classes['bg-image-payment']]: type === BackgroundTypes.PAYMENT,
      },
      className,
    )}
  />
);

export default Background;
