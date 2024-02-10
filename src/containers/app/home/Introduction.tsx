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
    <section id={HOME_PAGE_SECTIONS.INTRODUCTION} className="introduction">
      <Container className="introduction-container">
        <h2 className="section-title">
          {T(
            'fun studio là thương hiệu chụp ảnh tự động\n theo phong cách hàn quốc',
          )}
        </h2>
        <Grid className="introduction-grid">
          <GridItem className="introduction-grid-item">
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
            <div className="corner-top-left" />
            <div className="corner-bottom-right" />
          </GridItem>
          <GridItem className="introduction-grid-item">
            <Image
              className="introduction-image-bigger"
              src={nuiTruc2Image}
              alt="introduce 1"
              quality={75}
            />
            <Image
              className="introduction-image-smaller"
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
