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
    <section
      id={HOME_PAGE_SECTIONS.FUN_STORES}
      className="flex w-full bg-lp-primary-color border-t-[3rem] border-white"
    >
      <Container className="py-[4rem] text-white text-center">
        <h2 className="mb-[4rem] text-lp-section-title uppercase font-[800] text-white">
          {T('danh sách cửa hàng')}
        </h2>
        <Grid className="gap-[2rem] grid-cols-2 text-lp-body">
          {map(stores, (item) => (
            <GridItem key={item?.value} className="flex items-center">
              <Image
                className="rounded-[10px]"
                src={storeIcon}
                width={60}
                alt="store icon"
                quality={75}
              />
              <p className="text-left ml-[10px]">
                {item?.labelIndex}:{' '}
                <strong className="font-[600]">{item?.label}</strong>
              </p>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FunStores;
