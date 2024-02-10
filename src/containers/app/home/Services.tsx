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
    <section id={HOME_PAGE_SECTIONS.SERVICES} className="service-section">
      <Container className="service-container">
        <h2 className="section-title">
          {T('4 dịch vụ miễn phí\n khi hợp tác cùng fun studio')}
        </h2>
        <Grid className="service-grid">
          <Grid className="service-description-grid">
            {map(SERVICE_ITEMS, (item) => (
              <GridItem className="service-description-item">
                <Image src={item?.image} width={60} alt={item?.alt} />
                <p className="service-description-item-title">
                  <strong>Miễn phí</strong> {item?.label}
                </p>
              </GridItem>
            ))}
          </Grid>
          <div className="service-image-wrapper">
            <Image
              className="service-image-primary"
              src={service1Image}
              alt="service 1"
            />
            <Image
              className="service-image-secondary-1"
              src={service2Image}
              alt="service 2"
            />
            <Image
              className="service-image-secondary-2"
              src={service3Image}
              alt="service 3"
            />
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default Services;
