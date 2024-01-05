/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC,
  HtmlHTMLAttributes,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import cx from 'classnames';
import { ValueOf } from 'next/dist/shared/lib/constants';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import { POPOVER_OFFSET_ANCHOR, PopoverDir } from './popover.util';
import classes from './popover.module.css';

export type PopoverBoxProps = any &
  HtmlHTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    popoverDir?: PopoverDir | ValueOf<PopoverDir>;
    content?: ReactElement | string | any;
    anchorDimension?: DOMRect | null | any;
    RenderContent?: () => ReactElement | string | any;
    PopoverBoxBoxProps?: HtmlHTMLAttributes<HTMLDivElement>;
  };

const PopoverBox: FC<PopoverBoxProps> = ({
  open = false,
  popoverDir = 'top',
  content = '',
  anchorDimension,
  RenderContent = null,
  PopoverBoxBoxProps,

  ...rest
}) => {
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);

  const { left, top } = useMemo(() => {
    const { x = 0, y = 0, width = 0, height = 0 } = anchorDimension || {};
    const { width: popW = 0, height: popH = 0 } = dimensions || {};
    let pLeft = 0;
    let pTop = 0;

    if (popoverDir === PopoverDir.TOP) {
      pLeft = x + (width - popW) / 2;
      pTop = y - popH - POPOVER_OFFSET_ANCHOR;
    } else if (popoverDir === PopoverDir.RIGHT) {
      pLeft = x + width + POPOVER_OFFSET_ANCHOR;
      pTop = y + (height - popH) / 2;
    } else if (popoverDir === PopoverDir.BOTTOM) {
      pLeft = x + (width - popW) / 2;
      pTop = y + height + POPOVER_OFFSET_ANCHOR;
    } else if (popoverDir === PopoverDir.LEFT) {
      pLeft = x - popW - POPOVER_OFFSET_ANCHOR;
      pTop = y + (height - popH) / 2;
    }
    return {
      left: pLeft,
      top: pTop,
    };
  }, [anchorDimension, dimensions, popoverDir]);

  const callBackRef = useCallback((domNode: HTMLElement | null) => {
    if (domNode) {
      setDimensions(domNode.getBoundingClientRect());
    }
  }, []);

  return (
    <div>
      {open ? (
        <div {...rest} className={cx(classes['pb-popover'], rest?.className)}>
          <div
            ref={callBackRef}
            {...PopoverBoxBoxProps}
            className={cx(
              classes['pb-popover-box'],
              PopoverBoxBoxProps?.className,
            )}
            style={{ ...PopoverBoxBoxProps?.style, left, top }}
          >
            <div className={classes['pb-popover-content']}>
              {RenderContent ? (
                RenderContent()
              ) : (
                <Typography variant={TYPOGRAPHY_VARIANTS.BODY} firstCapCase>
                  {content}
                </Typography>
              )}
            </div>
            <div
              className={cx(classes['pb-popover-arrow'], {
                [classes['pb-popover-arrow-at']]: popoverDir === PopoverDir.TOP,
                [classes['pb-popover-arrow-ar']]:
                  popoverDir === PopoverDir.RIGHT,
                [classes['pb-popover-arrow-ab']]:
                  popoverDir === PopoverDir.BOTTOM,
                [classes['pb-popover-arrow-al']]:
                  popoverDir === PopoverDir.LEFT,
              })}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PopoverBox;
