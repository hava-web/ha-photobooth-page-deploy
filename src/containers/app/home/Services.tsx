import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { map } from 'lodash';
import { SERVICE_ITEMS } from 'store/static-data/static-data.data';

const Services = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.SERVICES}
      className="flex w-full bg-lp-lighter-primary-color"
    >
      <Container className="py-[4rem] text-lp-body text-white text-center">
        <h2 className="mb-4 text-lp-section-title uppercase text-white">
          {T('4 dịch vụ miễn phí khi hợp tác cùng fun studio')}
        </h2>
        <Grid className="mx-auto gap-2 grid-cols-2 grid-rows-1 w-[120rem]">
          <Grid className="gap-2 grid-cols-1 grid-rows-4">
            {map(SERVICE_ITEMS, (item) => (
              <GridItem className="flex items-center">
                <Image
                  src={item?.image}
                  width={60}
                  height={60}
                  alt={item?.alt}
                />
                <p className="text-left text-lp-h3 ml-[2rem]">{item?.label}</p>
              </GridItem>
            ))}
          </Grid>
          <div className="mx-auto relative">
            <Image
              className="border-image top-0 h-[500px]"
              src="/images/banner-images/1.jpg"
              width={500}
              height={500}
              alt="service 1"
            />
            <Image
              className="absolute border-image left-[35px] h-[250px] bottom-0"
              src="/images/banner-images/1.jpg"
              width={200}
              height={200}
              alt="service 2"
            />
            <Image
              className="absolute border-image left-[265px] h-[250px] bottom-0"
              src="/images/banner-images/1.jpg"
              width={200}
              height={200}
              alt="service 2"
            />
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default Services;
