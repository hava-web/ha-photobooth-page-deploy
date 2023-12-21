import React, { FC } from 'react';
import { map } from 'lodash';
import Image from 'next/image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import { useTranslation } from 'hooks/useTranslation';
import { OptionProps } from 'models/common.model';

type FunStoresProps = {
  stores: Array<OptionProps & { labelIndex: string }>;
};

const FunStores: FC<FunStoresProps> = ({ stores = [] }) => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.FUN_STORES}
      className="flex w-full bg-lp-primary-color"
    >
      <Container className="py-[4rem] text-white text-center">
        <h2 className="mb-[4rem] text-lp-section-title uppercase font-[800] text-white">
          {T('danh sách cửa hàng')}
        </h2>
        <Grid className="gap-[2rem] grid-cols-2 text-lp-h3">
          {map(stores, (item) => (
            <GridItem key={item?.value} className="flex items-center">
              <Image
                className="rounded-[10px]"
                src="/icons/store.png"
                width={60}
                height={45}
                alt="store icon"
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
