/* eslint-disable jsx-a11y/click-events-have-key-events */
import storeIcon from 'assets/icons/store.png';
import { isEqualVal } from 'helpers/string.helper';
import { filter, get, map } from 'lodash';
import Image from 'next/image';
import React from 'react';
import {
  funStores,
  ProvinceNames,
  ProvinceTypes,
} from 'store/static-data/static-data.data';

type LocationStoresProps = {
  provinceType: ProvinceTypes;
  onClose: () => void;
};

const LocationStores: React.FC<LocationStoresProps> = ({
  provinceType,
  onClose,
}) => {
  const listStores = filter(funStores, (i) =>
    isEqualVal(provinceType, i?.storeLocation),
  );

  return (
    <div className="location-store-popup-wrapper" onClick={onClose}>
      <div className="location-store-popup-content">
        <div className="location-store-wrapper">
          <h3 className="store-region-title">
            {get(ProvinceNames, `[${provinceType}]`, '')}
          </h3>
          <div className="list-store-row">
            {map(listStores, (store) => (
              <div className="flex flex-col items-center">
                <div className="">
                  <Image
                    width={250}
                    height={250}
                    src={store?.image}
                    alt={store?.alt}
                    className="store-swiper-item-image"
                  />
                  <div>
                    <p className="text-center store-swiper-item-title">
                      <Image
                        className="store-swiper-item-icon"
                        src={storeIcon}
                        alt="store icon"
                        quality={75}
                      />{' '}
                      <strong>{store?.labelIndex}</strong>
                    </p>
                    <p className="text-center store-swiper-item-title">
                      {store?.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStores;
