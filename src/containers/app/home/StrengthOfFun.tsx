import React from 'react';
import { map } from 'lodash';
import cx from 'classnames';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { STRENGTH_ITEMS } from 'store/static-data/static-data.data';
import classes from './home.module.css';

const StrengthOfFun = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.STRENGTH_OF_FUN}
      className="flex w-full bg-gradient-pink border-t-[3rem] border-lp-lighter-primary-color"
    >
      <Container className="flex flex-col py-[4rem] pb-[5rem] text-lp-body text-white text-center">
        <h2 className="mb-4 text-lp-section-title text-lp-primary-color whitespace-pre-line uppercase">
          {T('funstudio tự tin về điều gì?')}
        </h2>
        <div
          className={cx(
            classes?.['strength-of-fun-wrapper'],
            'mx-auto flex align gap-0 my-[2rem] h-[50rem]',
          )}
        >
          {map(STRENGTH_ITEMS, (item, ind: number) => (
            <div
              className={cx(
                classes?.['strength-item'],
                `whitespace-pre-line relative shadow-box flex items-center h-[45rem] w-[27rem] bg-white rounded-[1rem] mx-[0.75rem] ${
                  ind % 2 === 0 ? `self-end` : 'self-start'
                }`,
                ind % 2 === 0
                  ? classes?.['strength-item-under']
                  : classes?.['strength-item-over'],
              )}
            >
              <div className="relative bg-white w-full h-full z-[1] rounded-[3rem] p-[2rem] text-center">
                <span className={classes?.['strength-index']}>{ind + 1}</span>
                <strong className="text-lp-primary-color mb-2rem uppercase">
                  {item?.label}
                </strong>
                <br />
                <p className="text-lp-primary-color text-[22px]">
                  {item?.description}
                </p>
                <div className={classes['triangle-border-left']} />
                <div className={classes['triangle-border-right']} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StrengthOfFun;
