import React, { FC, HtmlHTMLAttributes, ReactElement } from 'react';
import cx from 'classnames';
import classes from './loader.module.css';

export type LoaderProps = HtmlHTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
  spin?: ReactElement | string;
  outerSpinProps?: HtmlHTMLAttributes<HTMLDivElement>;
};

const Loader: FC<LoaderProps> = ({
  children,
  loading = false,
  spin = null,
  outerSpinProps,
  ...props
}) => (
  <div
    {...props}
    className={cx(classes['pb-loader'], props?.className, {
      [classes.loading]: loading,
    })}
  >
    <>
      {children}
      {loading && (
        <div
          {...outerSpinProps}
          className={cx(
            classes['pb-loader-icon-wrapper'],
            outerSpinProps?.className,
          )}
        >
          {spin || <span className={classes['pb-loader-icon']} />}
        </div>
      )}
    </>
  </div>
);

export default Loader;
