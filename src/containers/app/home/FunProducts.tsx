import Container from 'components/grid/Container';
import Image from 'components/image/Image';
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
              <div className="p-2.5 flex flex-col gap-2.5">
                <p className="fun-products__name">{item?.label}</p>
                <a
                  className="fun-products__contact"
                  href={process.env.NEXT_PUBLIC_FRANCHISE_FORM_REGISTER_URL}
                  target="_blank"
                  title={T('đăng ký nhượng quyền')}
                  aria-label="đăng ký nhượng quyền"
                  rel="noreferrer"
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
