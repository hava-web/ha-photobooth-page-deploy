import React from 'react';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import Image from 'next/image';

const Introduction = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.INTRODUCTION}
      className="flex w-full bg-lp-lighter2-primary-color"
    >
      <Container className="py-[4rem] pb-[8rem] text-lp-body text-center">
        <h2 className="mb-4 text-lp-section-title-2 uppercase text-lp-primary-color whitespace-pre-wrap">
          {T(
            'fun studio là thương hiệu chụp ảnh tự động\n theo phong cách hàn quốc',
          )}
        </h2>
        <Grid className="mx-auto gap-2 grid-cols-2 grid-rows-1 w-[110rem] text-[#565656]">
          <GridItem className="relative">
            <p className="text-left text-lp-h3">
              Mô hình tự chụp ảnh lấy liền đã và đang trở thành một trào lưu
              thịnh hành đối với giới trẻ Hàn Quốc.
            </p>
            <br />
            <p className="text-left text-lp-h3">
              Vào đầu năm 2023, Fun Studio đã mang mô hình này về Việt Nam với
              những giải pháp ưu Việt, giản tiện hơn, dễ dàng sử dụng, đặc biệt
              chi phí vận hành rất thấp. Tuy mới thành lập và hoạt động trong
              gần 1 năm, Fun Studio đã liên tiếp mở nhiều cơ sở tại những vị trí
              đắc địa.
            </p>
            <br />
            <p className="text-left text-lp-h3">
              Nhắm đến khách hàng là những đối tượng trẻ và nhiều sáng tạo, Fun
              Studio đang mang tới cho các bạn có niềm yêu thích về chụp ảnh
              theo phong cách Hàn Quốc những trải nghiệm thật vui vẻ và đáng
              nhớ. Tất cả đều được chứa đựng trong từng sản phẩm và các khâu vận
              hành của Fun Studio.
            </p>
            <div className="absolute w-[8rem] h-[8rem] -top-[2rem] -left-[3rem] border-white border-t-[1rem] border-l-[1rem]" />
            <div className="absolute w-[8rem] h-[8rem] -right-[2rem] -bottom-[3rem] border-white border-b-[1rem] border-r-[1rem]" />
          </GridItem>
          <GridItem className="relative">
            <Image
              className="absolute left-0 border-image h-[40rem]"
              src="/images/banner-images/1.jpg"
              width={400}
              height={400}
              alt="introduce 1"
            />
            <Image
              className="absolute right-0 border-image h-[35rem] bottom-0"
              src="/images/banner-images/1.jpg"
              width={350}
              height={350}
              alt="introduce 2"
            />
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export default Introduction;
