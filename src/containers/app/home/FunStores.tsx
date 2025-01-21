import storeIcon from 'assets/icons/store.png';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { sortBySizeOfItem } from 'helpers/math.helper';
import { useTranslation } from 'hooks/useTranslation';
import { get, groupBy, map, reduce, size } from 'lodash';
import { OptionProps } from 'models/common.model';
import React, { FC, useMemo } from 'react';
import {
  StoreLocationName,
  StoreType,
} from 'store/static-data/static-data.data';

type FunStoresProps = {
  stores: Array<OptionProps & { labelIndex: string; storeLocation: string }>;
};

const FunStores: FC<FunStoresProps> = ({ stores = [] }) => {
  const { T } = useTranslation();

  const listStore = useMemo(() => groupBy(stores, 'storeLocation'), [stores]);

  const listSortedStore = useMemo(
    () => sortBySizeOfItem(groupBy(stores, 'storeLocation')),
    [stores],
  );

  const listHasManyStore = useMemo(
    () =>
      reduce(
        listSortedStore,
        (st, item, key) =>
          size(item) > 1 ? { ...st, [key]: item } : { ...st },
        {},
      ),
    [stores],
  );

  const listOneStore = useMemo(
    () =>
      reduce(
        listStore,
        (st, item, key) =>
          size(item) === 1 ? { ...st, [key]: item } : { ...st },
        {},
      ),
    [stores],
  );

  return (
    <section id={HOME_PAGE_SECTIONS.FUN_STORES} className="fun-stores">
      <Container className="fun-stores-container no-select">
        <h2 className="section-title">{T('danh sách cửa hàng')}</h2>

        {map(listHasManyStore, (items, locationKey) => (
          <>
            <h3 className="store-location-title">
              {get(StoreLocationName, `[${locationKey}]`, '')}
            </h3>
            <div className="list-store-row">
              {map(items, (store: StoreType) => (
                <div className="store-swiper-card">
                  <Image
                    width={250}
                    height={250}
                    src={store?.image}
                    alt={store?.alt}
                    className="store-swiper-item-image"
                  />
                  <div>
                    <p className="store-swiper-item-title">
                      <Image
                        className="store-swiper-item-icon"
                        src={storeIcon}
                        alt="store icon"
                        quality={75}
                      />{' '}
                      <strong>{store?.labelIndex}</strong>
                    </p>
                    <p className="store-swiper-item-title">{store?.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}

        <div className="list-location-grid">
          {map(listOneStore, (items, locationKey) => (
            <div className="list-location-item">
              <h3 className="store-location-title">
                {get(StoreLocationName, `[${locationKey}]`, '')}
              </h3>
              <div className="list-store-row">
                {map(items, (store: StoreType) => (
                  <div className="store-swiper-card">
                    <Image
                      width={250}
                      height={250}
                      src={store?.image}
                      alt={store?.alt}
                      className="store-swiper-item-image"
                    />
                    <div>
                      <p className="store-swiper-item-title">
                        <Image
                          className="store-swiper-item-icon"
                          src={storeIcon}
                          alt="store icon"
                          quality={75}
                        />{' '}
                        <strong>{store?.labelIndex}</strong>
                      </p>
                      <p className="store-swiper-item-title">{store?.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FunStores;
