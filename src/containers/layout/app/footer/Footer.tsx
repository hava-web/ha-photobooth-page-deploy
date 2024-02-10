import React, { FC } from 'react';
import { map } from 'lodash';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import Image from 'components/image/Image';
import { FOOTER_ITEMS } from 'store/static-data/static-data.data';
import logoIcon from 'assets/icons/logo.png';

const Footer: FC = () => (
  <footer className="footer">
    <Container className="footer-container">
      <Grid className="footer-grid">
        <GridItem className="footer-logo-item">
          <Image src={logoIcon} width={240} alt="fun footer icon" />
        </GridItem>
        {map(FOOTER_ITEMS, (item) => (
          <GridItem key={item?.value} className="footer-item">
            {item?.href ? (
              <a target="_blank" href={item?.href} rel="noreferrer">
                <Image src={item?.image} width={50} alt={item?.alt} />
                <p className="footer-item-title">{item?.label}</p>
              </a>
            ) : (
              <>
                <Image src={item?.image} width={50} alt={item?.alt} />
                <p className="footer-item-title">{item?.label}</p>
              </>
            )}
          </GridItem>
        ))}
      </Grid>
    </Container>
  </footer>
);

export default Footer;
