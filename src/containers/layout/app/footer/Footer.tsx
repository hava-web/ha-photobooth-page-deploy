import React, { FC } from 'react';
import { map } from 'lodash';
import Image from 'next/image';
import cx from 'classnames';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { FOOTER_ITEMS } from 'store/static-data/static-data.data';
import classes from './footer.module.css';

const Footer: FC = () => (
  <footer className="flex w-full">
    <Container className="py-[4rem] mx-auto text-lp-h3">
      <Grid className="gap-2 text-lp-secondary-color" cols={2} rows={4}>
        <GridItem className={cx(classes.footerItem, 'row-span-2')} rowSpan={2}>
          <Image
            src="/icons/logo.png"
            width={240}
            height={100}
            alt="fun footer icon"
          />
        </GridItem>
        {map(FOOTER_ITEMS, (item) => (
          <GridItem key={item?.value} className="flex items-center">
            <Image src={item?.image} width={50} height={50} alt={item?.alt} />
            <p className="ml-[10px]">{item?.label}</p>
          </GridItem>
        ))}
      </Grid>
    </Container>
  </footer>
);

export default Footer;
