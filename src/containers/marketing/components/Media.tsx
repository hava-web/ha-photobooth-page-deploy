import type React from 'react';
import cx from 'classnames';
import Image, { type ImageProps } from 'components/image/Image';
import type { MarketingImage } from 'store/static-data/marketing-pages.data';

type MediaProps = {
  src: MarketingImage;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  loading?: ImageProps['loading'];
  priority?: ImageProps['priority'];
  fetchPriority?: ImageProps['fetchPriority'];
};

const Media: React.FC<MediaProps> = ({
  src,
  alt,
  className,
  imageClassName,
  loading,
  priority,
  fetchPriority,
  sizes = '(max-width: 768px) 100vw, 50vw',
}) => (
  <div className={cx('relative overflow-hidden bg-brand-page', className)}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loading={loading}
      priority={priority}
      fetchPriority={fetchPriority}
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      className={cx(
        'pointer-events-none select-none object-cover',
        imageClassName,
      )}
    />
  </div>
);

export default Media;
