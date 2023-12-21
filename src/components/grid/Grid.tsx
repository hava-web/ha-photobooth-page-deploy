import React, { FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: number;
  rows?: number;
};

const Grid: FC<GridProps> = ({ cols, rows, ...rest }) => (
  <div
    {...rest}
    className={cx(
      `grid ${cols ? `grid-cols-${cols}` : ''}
      ${rows ? `grid-rows-${rows}` : ''} ${rest?.className}`,
    )}
  />
);

export default Grid;
