import React, { FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {};

const Container: FC<ContainerProps> = ({ ...rest }) => (
  <div {...rest} className={cx('container mx-auto', rest?.className)} />
);

export default Container;
