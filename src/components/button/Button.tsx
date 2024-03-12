import React, { FC } from 'react';
import Typography, {
  Props as TypographyPropsProps,
} from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import cx from 'classnames';
import { BUTTON_COLORS } from './button-utils';

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
  TypographyProps?: TypographyPropsProps;
};

const Button: FC<Props> = ({
  className,
  color = BUTTON_COLORS.PRIMARY,
  children,
  TypographyProps,
  disabled,
  ...rest
}) => (
  <button
    {...rest}
    disabled={disabled}
    type="button"
    className={cx(
      'pb-button',
      {
        'pb-button-info': color === BUTTON_COLORS.INFO,
        'pb-button-primary': color === BUTTON_COLORS.PRIMARY,
        'pb-button-default': color === BUTTON_COLORS.DEFAULT,
        'pb-button-transparent': color === BUTTON_COLORS.TRANSPARENT,
        'pb-button-disabled': disabled,
      },
      className,
    )}
  >
    <Typography
      variant={TYPOGRAPHY_VARIANTS.BODY}
      firstCapCase
      {...TypographyProps}
      className={cx('pb-button-text', TypographyProps?.className)}
    >
      {children}
    </Typography>
  </button>
);

export default Button;
