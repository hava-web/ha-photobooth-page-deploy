import storeIcon from 'assets/icons/store.png';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import Popup from 'components/popup/Popup';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { isEqualVal } from 'helpers/string.helper';
import { useModal } from 'hooks/useModal';
import { useTranslation } from 'hooks/useTranslation';
import { filter, get, map, size } from 'lodash';
import { OptionProps } from 'models/common.model';
import LocationStores from 'pages/home-popup/LocationStores';
import React from 'react';
import {
  ProvinceNames,
  ProvinceOfRegions,
  ProvinceTypes,
  RegionLocationName,
  RegionLocationType,
} from 'store/static-data/static-data.data';
import { useAppSelector } from 'store/store-hooks';

type FunStoresProps = {
  stores: Array<OptionProps & { labelIndex: string; storeLocation: string }>;
};

const FunStores: React.FC<FunStoresProps> = ({ stores = [] }) => {
  const { T } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { modalState } = useAppSelector((s) => s.app);

  const handleShowStores = (provinceType: ProvinceTypes) => () => {
    openModal({
      content: (
        <LocationStores onClose={closeModal} provinceType={provinceType} />
      ),
    });
  };

  return (
    <section id={HOME_PAGE_SECTIONS.FUN_STORES} className="fun-stores">
      <Container className="fun-stores-container no-select">
        <h2 className="section-title">{T('danh sách cửa hàng')}</h2>

        {map(RegionLocationType, (regionType) => {
          const provinceOfRegion = ProvinceOfRegions?.[regionType];

          return (
            <>
              <h3 key={regionType} className="store-region-title">
                {get(RegionLocationName, `[${regionType}]`, '')}
              </h3>
              <div className="list-store-row">
                {map(provinceOfRegion, (province) => {
                  const locationStores = filter(stores, (i) =>
                    isEqualVal(province, i?.storeLocation),
                  );
                  const firstStore = locationStores?.[0];

                  if (!size(locationStores)) return null;

                  return (
                    <div className="flex flex-col items-center">
                      <h3 className="store-location-title">
                        {get(ProvinceNames, `[${province}]`, '')}
                      </h3>
                      <div className="">
                        <Image
                          width={250}
                          height={250}
                          src={firstStore?.image}
                          alt={firstStore?.alt}
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
                            <strong>{size(locationStores)} cửa hàng</strong>
                          </p>
                          <button
                            type="button"
                            className="store-swiper-item-view-more"
                            onClick={handleShowStores(province)}
                          >
                            Xem thêm
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </Container>
      <Popup {...modalState} onClose={closeModal} />
    </section>
  );
};

export default FunStores;
