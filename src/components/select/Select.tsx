import React, {
  FC,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { find, map } from 'lodash';
import { OptionProps } from 'models/common.model';
import Typography, {
  Props as TypographyProps,
} from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import { isEqualVal } from 'helpers/string.helper';
import classes from './select.module.css';

export type SelectProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value?: OptionProps['value'];
  options?: OptionProps[];
  OuterProps?: React.HTMLAttributes<HTMLDivElement>;
  isError?: boolean;
  disabled?: boolean;
  prefixIcon?: React.ReactNode;
  surfixIcon?: React.ReactNode;
  SelectTextProps?: TypographyProps;
  SurfixIconProps?: React.HTMLAttributes<HTMLSpanElement>;
  onChange?: (val: OptionProps['value']) => void;
};

const Select: FC<SelectProps> = ({
  value,
  options = [],
  className,
  OuterProps,
  prefixIcon = null,
  surfixIcon = null,
  SelectTextProps,
  SurfixIconProps,
  onChange = null,
  ...rest
}) => {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const valueText = useMemo(
    () => find(options, (o) => isEqualVal(o?.value, value))?.label,
    [value, options],
  );

  const handleShowOptions = () => {
    setShowDropdown((s) => !s);
  };

  const handleSelectItem = (item: OptionProps) => (e: any) => {
    e.stopPropagation();
    setShowDropdown(false);
    onChange?.(item?.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      {...OuterProps}
      ref={ref}
      className={cx(classes['pb-select'], OuterProps?.className, {
        [classes['pb-select-show']]: showDropdown,
      })}
    >
      <div
        type="text"
        readOnly
        {...rest}
        className={cx(
          classes['pb-select__input'],
          {
            [classes['pb-select-disabled']]: !!rest?.disabled,
            [classes['pb-select-error']]: !!rest?.isError,
          },
          className,
        )}
        onClick={handleShowOptions}
        aria-hidden="true"
      >
        {prefixIcon && (
          <span className={classes['pb-select__prefix-icon']}>
            {prefixIcon}
          </span>
        )}
        <Typography
          variant={TYPOGRAPHY_VARIANTS.XS}
          {...SelectTextProps}
          className={cx(
            classes['pb-select__select-text'],
            SelectTextProps?.className,
          )}
        >
          {valueText}
        </Typography>
        <span
          {...SurfixIconProps}
          className={cx(
            classes['pb-select__surfix-icon'],
            SurfixIconProps?.className,
          )}
        >
          {surfixIcon}
        </span>
        <ul className={classes['pb-select__list']}>
          {map(options, (item) => (
            <li
              key={item?.value}
              className={classes['pb-select__item']}
              onClick={handleSelectItem(item)}
              aria-hidden="true"
            >
              <Typography variant={TYPOGRAPHY_VARIANTS.XS}>
                {item?.label}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
