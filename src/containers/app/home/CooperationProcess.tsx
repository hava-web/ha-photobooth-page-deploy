import React from 'react';
import cx from 'classnames';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import p1Image from 'assets/images/process/p1.png';
import p2Image from 'assets/images/process/p2.png';
import p3Image from 'assets/images/process/p3.png';
import p4Image from 'assets/images/process/p4.png';
import p5Image from 'assets/images/process/p5.png';
import p6Image from 'assets/images/process/p6.png';
import whiteRightArrowIcon from 'assets/icons/white_right_arrow.png';
import classes from './home.module.css';

const CooperationProcess = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.COOPERATION_PROCESS}
      className={cx(
        classes?.['cooperation-process'],
        'flex w-full bg-lp-lighter-primary-color',
      )}
    >
      <Container className="py-[6rem] text-lp-body text-white text-center">
        <h2 className="mb-[8rem] text-lp-section-title uppercase font-[800] text-white">
          {T('trình tự đăng ký')}
        </h2>
        <div className="mx-auto">
          <div className="mb-[10rem] flex items-center justify-center">
            <Image width={300} src={p1Image} alt="step 1" />
            <Image
              className="h-[4rem] px-[4rem]"
              src={whiteRightArrowIcon}
              alt="right arrow"
            />
            <Image width={300} src={p2Image} alt="step 2" />
            <Image
              className="h-[4rem] px-[4rem]"
              src={whiteRightArrowIcon}
              alt="right arrow"
            />
            <Image width={300} src={p3Image} alt="step 3" />
          </div>
          <div className="flex items-center justify-center">
            <Image width={300} src={p4Image} alt="step 4" />
            <Image
              className="h-[4rem] px-[4rem]"
              src={whiteRightArrowIcon}
              alt="right arrow"
            />
            <Image width={300} src={p5Image} alt="step 5" />
            <Image
              className="h-[4rem] px-[4rem]"
              src={whiteRightArrowIcon}
              alt="right arrow"
            />
            <Image width={300} src={p6Image} alt="step 6" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CooperationProcess;
