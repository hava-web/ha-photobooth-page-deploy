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
              Bắt nhịp xu thế, Fun Studio nhanh chóng mang mô hình này về Việt
              Nam với những giải pháp ưu việt, giản tiện hơn, dễ dàng quản lý và
              vận hành với chi phí rất thấp.
            </p>
            <br />
            <p>
              Mô hình kinh doanh này nhắm đến khách hàng là những bạn trẻ sáng
              tạo, thời thượng thông qua những trải nghiệm đáng nhớ. Điểm hấp
              dẫn của dịch vụ này chính là chất lượng hình siêu đẹp, các trang
              phục, phụ kiện và frame độc đáo, phù hợp với túi tiền của học
              sinh, sinh viên.
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
