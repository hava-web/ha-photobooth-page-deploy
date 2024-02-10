import React, { FC } from 'react';
import { map } from 'lodash';
import Image from 'components/image/Image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { useTranslation } from 'hooks/useTranslation';
import storeIcon from 'assets/icons/store.png';
import { OptionProps } from 'models/common.model';

type FunStoresProps = {
  stores: Array<OptionProps & { labelIndex: string }>;
};

const FunStores: FC<FunStoresProps> = ({ stores = [] }) => {
  const { T } = useTranslation();

  return (
    <section id={HOME_PAGE_SECTIONS.FUN_STORES} className="fun-stores">
      <Container className="fun-stores-container">
        <h2 className="section-title">{T('danh sách cửa hàng')}</h2>
        <Grid className="fun-stores-grid">
          {map(stores, (item) => (
            <GridItem key={item?.value} className="fun-stores-item">
              <Image
                className="rounded-[10px]"
                src={storeIcon}
                alt="store icon"
                quality={75}
              />
              <p className="fun-stores-item-title">
                {item?.labelIndex}: <strong>{item?.label}</strong>
              </p>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FunStores;
