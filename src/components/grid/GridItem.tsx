import React, { FC, HTMLAttributes } from 'react';

export type GridItemProps = HTMLAttributes<HTMLDivElement> & {
  rowSpan?: number;
  colSpan?: number;
};

const GridItem: FC<GridItemProps> = ({ rowSpan, colSpan, ...rest }) => (
  <div
    {...rest}
    className={`${rowSpan ? `row-span-${rowSpan}` : ''}
    ${colSpan ? `col-span-${colSpan}` : ''} ${rest?.className}`}
  />
);

export default GridItem;
