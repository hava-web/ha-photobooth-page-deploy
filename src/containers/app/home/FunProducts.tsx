import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import { SALE_PHONE_NUMBER } from 'constants/common.const';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import { useTranslation } from 'hooks/useTranslation';
import { map } from 'lodash';
import React from 'react';
import { FUN_PRODUCTS } from 'store/static-data/static-data.data';

type FunProductsProps = {};

const FunProducts: React.FC<FunProductsProps> = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.FUN_PRODUCTS}
      className="fun-products-section"
    >
      <Container className="fun-products-container no-select">
        <h2 className="section-title">{T('danh sách sản phẩm')}</h2>
        <div className="fun-products__grid-wrapper grid mx-auto gap-16 w-fit">
          {map(FUN_PRODUCTS, (item) => (
            <div className="fun-products__grid-item">
              <Image
                width={300}
                height={300}
                src={item?.image}
                alt={item?.label}
                className="product-item-image object-cover"
              />
              <div className="p-1 flex flex-col gap-1">
                <p className="fun-products__name">{item?.label}</p>
                <a
                  className="fun-products__contact"
                  title={T('hotline')}
                  aria-label="phone"
                  href={`tel:${SALE_PHONE_NUMBER}`}
                >
                  {T('Liên hệ')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FunProducts;
