import React from 'react';
import { map } from 'lodash';
import Image from 'components/image/Image';
import cx from 'classnames';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { OPPORTUNITY_ITEMS } from 'store/static-data/static-data.data';
import classes from './home.module.css';

const EnsureOpportunity = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.ENSURE_OPPORTUNITY}
      className="flex flex-col w-full bg-lp-primary-color"
    >
      <Container className="py-[4rem] text-lp-body text-white text-center">
        <h2 className="mb-4 text-lp-section-title-2 uppercase font-[800]">
          {T('cơ hội nhượng quyền thương mại bền vững')}
        </h2>
        <Grid className="mx-auto gap-x-[2rem] grid-cols-2 grid-rows-2 text-[2rem] w-[110rem]">
          {map(OPPORTUNITY_ITEMS, (item) => (
            <GridItem className="text-left">
              <Image src={item?.image} width={60} alt={item?.alt} />
              <strong className="block my-[2rem]">{item?.label}</strong>
              <p>{item?.description}</p>
            </GridItem>
          ))}
        </Grid>
        <div className="flex flex-col items-center mx-auto mt-[4rem] h-[20rem]">
          <div className="flex">
            <Image
              className="object-cover object-bottom border-image h-[40rem] z-[1]"
              src="/images/home/nhuong_quyen_1.jpg"
              width={500}
              height={400}
              alt="opportunity 1"
            />
            <Image
              className="object-cover border-image h-[40rem] z-[1]"
              src="/images/home/nhuong_quyen_2.jpg"
              width={500}
              height={400}
              alt="opportunity 2"
            />
          </div>
          <i className="text-lp-lighter-primary-color text-[2rem] mt-[2rem] z-[1]">
            Ký kết hợp đồng cùng đối tác nhượng quyền
          </i>
        </div>
      </Container>
      <div
        className={cx(
          classes?.['ensure-opportunity-bottom-div'],
          'bg-white h-[250px] w-full',
        )}
      />
    </section>
  );
};

export default EnsureOpportunity;
