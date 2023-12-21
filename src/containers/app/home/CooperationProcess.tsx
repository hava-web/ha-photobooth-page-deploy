import React from 'react';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';

const CooperationProcess = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.COOPERATION_PROCESS}
      className="flex w-full bg-lp-lighter-primary-color"
    >
      <Container className="py-[6rem] text-lp-body text-white text-center">
        <h2 className="mb-[8rem] text-lp-section-title uppercase font-[800] text-white">
          {T('trình tự đăng ký')}
        </h2>
        <div className="mx-auto">
          <div className="mb-[14rem] flex items-center justify-center">
            <img
              src="/images/process/p1.png"
              alt="step 1"
              className="h-[14rem]"
            />
            <img
              src="/icons/white_right_arrow.png"
              alt="right arrow"
              className="h-[4rem] px-[4rem]"
            />
            <img
              src="/images/process/p3.png"
              alt="step 2"
              className="h-[14rem]"
            />
            <img
              src="/icons/white_right_arrow.png"
              alt="right arrow"
              className="h-[4rem] px-[4rem]"
            />
            <img
              src="/images/process/p3.png"
              alt="step 3"
              className="h-[14rem]"
            />
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/images/process/p1.png"
              alt="step 4"
              className="h-[14rem]"
            />
            <img
              src="/icons/white_right_arrow.png"
              alt="right arrow"
              className="h-[4rem] px-[4rem]"
            />
            <img
              src="/images/process/p3.png"
              alt="step 5"
              className="h-[14rem]"
            />
            <img
              src="/icons/white_right_arrow.png"
              alt="right arrow"
              className="h-[4rem] px-[4rem]"
            />
            <img
              src="/images/process/p3.png"
              alt="step 6"
              className="h-[14rem]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CooperationProcess;
