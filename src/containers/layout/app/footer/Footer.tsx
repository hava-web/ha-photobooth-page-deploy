import React, { FC } from 'react';
import { map } from 'lodash';
import cx from 'classnames';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import Image from 'components/image/Image';
import { FOOTER_ITEMS } from 'store/static-data/static-data.data';
import logoIcon from 'assets/icons/logo.png';
import classes from './footer.module.css';

const Footer: FC = () => (
  <footer className="font-Montserrat flex w-full">
    <Container className="py-[4rem] mx-auto text-lp-body">
      <Grid className="gap-2 text-lp-secondary-color" cols={2} rows={4}>
        <GridItem className={cx(classes.footerItem, 'row-span-2')} rowSpan={2}>
          <Image src={logoIcon} width={240} alt="fun footer icon" />
        </GridItem>
        {map(FOOTER_ITEMS, (item) => (
          <GridItem key={item?.value} className="flex items-center">
            <Image src={item?.image} width={50} alt={item?.alt} />
            <p className="ml-[10px]">{item?.label}</p>
          </GridItem>
        ))}
      </Grid>
    </Container>
  </footer>
);

export default Footer;
