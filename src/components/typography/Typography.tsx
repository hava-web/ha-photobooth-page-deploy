import React, { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';
import { TYPOGRAPHY_COMPONENT, TYPOGRAPHY_VARIANTS } from './typography-utils';
import classes from './typography.module.css';

export type Props = HtmlHTMLAttributes<HTMLParagraphElement> &
  any & {
    variant?: string;
    component?: string;
    normalCase?: boolean;
    upperCase?: boolean;
    firstCapCase?: boolean;
  };

const DynamicComponent: FC<PropsWithChildren<Props>> = ({
  component = TYPOGRAPHY_COMPONENT.DIV,
  children,
  ...rest
}) => React.createElement(component, rest, children) as any;

const Typography: FC<Props> = ({
  className,
  variant = TYPOGRAPHY_VARIANTS.BODY,
  normalCase = false,
  upperCase = false,
  firstCapCase = false,
  ...rest
}) => (
  <DynamicComponent
    {...rest}
    className={cx(
      classes['pb-typography'],
      'font-Inter',
      {
        'normal-case': normalCase,
        uppercase: upperCase,
        [classes['pb-typography-firstCapCase']]: firstCapCase,
        'text-pb-h1': variant === TYPOGRAPHY_VARIANTS.H1,
        'text-pb-h2': variant === TYPOGRAPHY_VARIANTS.H2,
        'text-pb-body': variant === TYPOGRAPHY_VARIANTS.BODY,
        'text-pb-small': variant === TYPOGRAPHY_VARIANTS.SMALL,
        'text-pb-xs': variant === TYPOGRAPHY_VARIANTS.XS,
      },
      className,
    )}
  />
);

export default Typography;
