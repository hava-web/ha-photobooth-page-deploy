import React, { FC } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

export type ImageProps = NextImageProps & {};

const Image: FC<ImageProps> = ({ ...rest }) => (
  <NextImage quality={100} {...rest} />
);

export default Image;
