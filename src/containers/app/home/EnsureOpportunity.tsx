import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { OPPORTUNITY_ITEMS } from 'store/static-data/static-data.data';
import { map } from 'lodash';

const EnsureOpportunity = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.ENSURE_OPPORTUNITY}
      className="flex w-full bg-lp-primary-color"
    >
      <Container className="py-[4rem] text-lp-body text-white text-center">
        <h2 className="mb-4 text-lp-section-title-2 uppercase font-[800]">
          {T('cơ hội nhượng quyền thương mại bền vững')}
        </h2>
        <Grid className="mx-auto gap-x-[2rem] grid-cols-2 grid-rows-2 text-[2rem] w-[110rem]">
          {map(OPPORTUNITY_ITEMS, (item) => (
            <GridItem className="text-left">
              <Image src={item?.image} width={60} height={60} alt={item?.alt} />
              <strong className="block my-[2rem]">{item?.label}</strong>
              <p>{item?.description}</p>
            </GridItem>
          ))}
        </Grid>
        <div className="flex mx-auto justify-center mt-[4rem]">
          <Image
            className="border-image h-[40rem]"
            src="/images/banner-images/1.jpg"
            width={500}
            height={400}
            alt="service 1"
          />
          <Image
            className="border-image h-[40rem]"
            src="/images/banner-images/1.jpg"
            width={500}
            height={400}
            alt="service 2"
          />
        </div>
      </Container>
    </section>
  );
};

export default EnsureOpportunity;
