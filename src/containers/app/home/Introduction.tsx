import React from 'react';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import { useTranslation } from 'hooks/useTranslation';
import Grid from 'components/grid/Grid';
import GridItem from 'components/grid/GridItem';
import Image from 'components/image/Image';
import nuiTruc2Image from 'assets/images/home/nui_truc2.jpg';
import dhspImage from 'assets/images/home/dhsp.jpg';

const Introduction = () => {
  const { T } = useTranslation();

  return (
    <section
      id={HOME_PAGE_SECTIONS.INTRODUCTION}
      className="flex w-full bg-lp-lighter2-primary-color border-t-[3rem] border-lp-lighter-primary-color"
    >
      <Container className="py-[4rem] pb-[8rem] text-lp-body text-center">
        <h2 className="mb-4 text-lp-section-title-2 text-lp-primary-color uppercase whitespace-pre-wrap">
          {T(
            'fun studio là thương hiệu chụp ảnh tự động\n theo phong cách hàn quốc',
          )}
        </h2>
        <Grid className="mx-auto gap-[4rem] grid-cols-2 grid-rows-1 w-[110rem] text-[#565656]">
          <GridItem className="relative text-justify">
            <p>
              Mô hình tự chụp ảnh lấy liền đã và đang trở thành một trào lưu
              thịnh hành đối với giới trẻ Hàn Quốc.
            </p>
            <br />
            <p>
              Vào đầu năm 2023, Fun Studio đã mang mô hình này về Việt Nam với
              những giải pháp ưu Việt, giản tiện hơn, dễ dàng sử dụng, đặc biệt
              chi phí vận hành rất thấp. Tuy mới thành lập và hoạt động trong
              gần 1 năm, Fun Studio đã liên tiếp mở nhiều cơ sở tại những vị trí
              đắc địa.
            </p>
            <br />
            <p>
              Nhắm đến khách hàng là những đối tượng trẻ và nhiều sáng tạo, Fun
              Studio đang mang tới cho các bạn có niềm yêu thích về chụp ảnh
              theo phong cách Hàn Quốc những trải nghiệm thật vui vẻ và đáng
              nhớ. Tất cả đều được chứa đựng trong từng sản phẩm và các khâu vận
              hành của Fun Studio.
            </p>
            <div className="absolute w-[8rem] h-[8rem] -top-[2rem] -left-[3.5rem] border-white border-t-[1rem] border-l-[1rem]" />
            <div className="absolute w-[8rem] h-[8rem] -right-[3rem] bottom-0 border-white border-b-[1rem] border-r-[1rem]" />
          </GridItem>
          <GridItem className="relative">
            <Image
              className="object-cover absolute left-0 border-image h-[40rem]"
              src={nuiTruc2Image}
              width={400}
              height={400}
              alt="introduce 1"
              quality={75}
            />
            <Image
              className="object-cover absolute right-0 border-image h-[35rem] bottom-0"
              src={dhspImage}
              width={350}
              height={350}
              alt="introduce 2"
              quality={75}
            />
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export default Introduction;
