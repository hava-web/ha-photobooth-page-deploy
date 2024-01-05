import React from 'react';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { map } from 'lodash';
import { SERVICE_ITEMS } from 'store/static-data/static-data.data';
import service1Image from 'assets/images/home/services_1.jpg';
import service2Image from 'assets/images/home/services_2.jpg';
import service3Image from 'assets/images/home/services_3.jpg';

const Services = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.SERVICES}
      className="flex w-full bg-lp-lighter-primary-color"
    >
      <Container className="py-[4rem] text-lp-body text-white text-center">
        <h2 className="mb-4 text-lp-section-title whitespace-pre-line uppercase text-white">
          {T('4 dịch vụ miễn phí\n khi hợp tác cùng fun studio')}
        </h2>
        <Grid className="mx-auto gap-[4rem] grid-cols-2 grid-rows-[auto,1lr] w-[115rem]">
          <Grid className="gap-y-[4rem]">
            {map(SERVICE_ITEMS, (item) => (
              <GridItem className="flex items-center">
                <Image src={item?.image} width={60} alt={item?.alt} />
                <p className="text-justify ml-[2rem]">
                  <strong>Miễn phí</strong> {item?.label}
                </p>
              </GridItem>
            ))}
          </Grid>
          <div className="mx-auto relative">
            <Image
              className="object-cover border-image top-0 h-[500px]"
              src={service1Image}
              width={500}
              height={500}
              alt="service 1"
            />
            <Image
              className="object-cover absolute border-image left-[35px] h-[250px] bottom-[3rem]"
              src={service2Image}
              width={210}
              height={200}
              alt="service 2"
            />
            <Image
              className="object-cover absolute border-image left-[265px] h-[250px] bottom-[3rem]"
              src={service3Image}
              width={210}
              height={200}
              alt="service 3"
            />
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default Services;
