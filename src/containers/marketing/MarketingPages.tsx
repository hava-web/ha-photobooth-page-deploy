import React, { useState } from 'react';
import cx from 'classnames';
import Image from 'components/image/Image';
import {
  ABOUT_COPY,
  ABOUT_IMAGES,
  BUSINESS_FIT_CARDS,
  CUSTOMER_LOGOS,
  DEVELOPMENT_TIMELINE,
  DIFFERENCE_IMAGES,
  FREE_SERVICE_CARDS,
  FRANCHISE_REASONS,
  FRANCHISE_TOP_IMAGES,
  GALLERY_FALLBACK_IMAGE,
  GALLERY_ITEMS,
  HOME_HERO_SLIDES,
  HOME_VIDEO,
  MARKETING_CONTACT,
  NEWS_CARDS,
  PRODUCT_MACHINES,
  RENTAL_SECTIONS,
  SERVICE_IN_STORE_IMAGES,
  SERVICE_KIOSK_IMAGES,
  SERVICE_MODELS,
  SERVICE_OTHER_PRODUCTS,
  SERVICE_RENTAL_IDOL_IMAGES,
} from 'store/static-data/marketing-pages.data';
import Carousel from './components/Carousel';
import FooterSpacer from './components/FooterSpacer';
import HeroBannerCarousel from './components/HeroBannerCarousel';
import HomeVideoCard from './components/HomeVideoCard';
import InfoCard from './components/InfoCard';
import InlineArrow from './components/InlineArrow';
import Media from './components/Media';
import SectionTitle from './components/SectionTitle';
import SliderControls from './components/SliderControls';
import {
  FORM_INPUT_CLASS,
  REGISTER_FORM_BUDGET_OPTIONS,
  REGISTER_FORM_DEMAND_OPTIONS,
  REGISTER_FORM_LOCATION_OPTIONS,
  REGISTER_FORM_TIMING_OPTIONS,
  RegisterFieldGroup,
  RegisterOption,
} from './components/register/RegisterFields';
import {
  ServiceImageGrid,
  ServiceMachineCard,
  ServiceModelCard,
  ServiceOtherProductCard,
  ServicePillHeading,
  ServiceSalesCircle,
  ServiceSectionHeading,
} from './components/service/ServiceSections';
import {
  STORE_REGIONS,
  StoreCoverageMap,
  StoreRegionCarousel,
} from './components/store/StoreSections';
import {
  CONTAINER_CLASS,
  GALLERY_PAGE_SIZE,
  LEFT_FLOAT_ARROW_CLASS,
  PAGE_CLASS,
  PRODUCT_MACHINE_PAGE_COUNT,
  PRODUCT_MACHINE_PAGE_SIZE,
  RIGHT_FLOAT_ARROW_CLASS,
  SECTION_CLASS,
  VIDEO_LEFT_ARROW_CLASS,
  VIDEO_RIGHT_ARROW_CLASS,
} from './constants';
import { HOME_VIDEO_SLIDES } from './data/homeVideoSlides';
import { CONCEPT_CARDS } from './data/serviceConceptCards';
import { useCarouselIndex } from './hooks/useCarouselIndex';
import { useResponsiveVisibleCount } from './hooks/useResponsiveVisibleCount';
import {
  getPageCount,
  getPagedItems,
  getRotatedPageItems,
} from './utils/carousel';
import { getImageKey } from './utils/images';

export const MarketingHomePage: React.FC = () => {
  const heroCarousel = useCarouselIndex(HOME_HERO_SLIDES.length);
  const videoCarousel = useCarouselIndex(HOME_VIDEO_SLIDES.length);
  const [playingHomeVideo, setPlayingHomeVideo] = useState<string | null>(null);

  return (
    <main className={PAGE_CLASS}>
      <section className="relative pb-3.4 pt-4.2 phone:pb-2 phone:pt-2.4">
        <HeroBannerCarousel
          slides={HOME_HERO_SLIDES}
          position={heroCarousel.position}
          current={heroCarousel.current}
          onChange={heroCarousel.setSlide}
        />
      </section>

      <section className="pb-7.2 pt-3.4 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <SectionTitle>{HOME_VIDEO.title}</SectionTitle>
          <div className="relative flex min-h-video-section items-center justify-center phone:min-h-0">
            <InlineArrow
              direction="previous"
              className={VIDEO_LEFT_ARROW_CLASS}
              onClick={() => videoCarousel.setSlide(videoCarousel.current - 1)}
            />
            <Carousel
              items={HOME_VIDEO_SLIDES}
              position={videoCarousel.position}
              getKey={(slide) => slide.title}
              onDragSlide={(direction) =>
                videoCarousel.setSlide(videoCarousel.current + direction)
              }
              viewportClassName="w-video-carousel phone:w-full"
              renderItem={(slide, _index, isCurrent) => (
                <div className="relative">
                  <HomeVideoCard
                    slide={slide}
                    isPlaying={playingHomeVideo === slide.video && isCurrent}
                    onPlay={() => setPlayingHomeVideo(slide.video)}
                  />
                </div>
              )}
            />
            <InlineArrow
              direction="next"
              className={VIDEO_RIGHT_ARROW_CLASS}
              onClick={() => videoCarousel.setSlide(videoCarousel.current + 1)}
            />
          </div>
          <SliderControls
            showArrows={false}
            count={HOME_VIDEO_SLIDES.length}
            current={videoCarousel.current}
            onChange={videoCarousel.setSlide}
          />
        </div>
      </section>

      <section className={SECTION_CLASS}>
        <div className={CONTAINER_CLASS}>
          <SectionTitle>
            Fun Studio là thương hiệu chụp ảnh tự động theo phong cách Hàn Quốc
          </SectionTitle>
          <div className="grid grid-cols-2 items-start gap-8 phone:grid-cols-1 phone:gap-7">
            <div className="text-xl leading-relaxed text-brand-text phone:text-base">
              {ABOUT_COPY.map((paragraph) => (
                <p key={paragraph} className="mb-6 mt-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid gap-3.8">
              {ABOUT_IMAGES.map((image) => (
                <Media
                  key={getImageKey(image, 'about-image')}
                  src={image}
                  alt="Fun Studio"
                  className="aspect-about-image"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-7.2 pt-9 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <SectionTitle>Quá trình hình thành & phát triển</SectionTitle>
          <div className="mx-auto grid max-w-marketing grid-cols-8 items-start gap-2 tablet:grid-cols-4 tablet:gap-y-7 phone:grid-cols-2 phone:gap-y-6">
            {DEVELOPMENT_TIMELINE.map(([date, text]) => (
              <article
                key={date}
                className="relative mt-5.8 flex min-h-28 items-center justify-center rounded-2 bg-brand-pink px-1.6 py-2 text-center text-white phone:mt-4 phone:min-h-24"
              >
                <strong className="absolute -top-5.8 left-1/2 flex h-8.2 w-8.2 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-muted font-UTMImpact text-brand-card-title font-normal leading-none text-white phone:-top-4 phone:h-7.2 phone:w-7.2 phone:text-lg">
                  {date}
                </strong>
                <p className="m-0 text-brand-card-title font-extrabold leading-tight">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-pink pb-20 pt-7.2 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <SectionTitle muted>Khách hàng của chúng tôi</SectionTitle>
          <div className="grid grid-cols-7 gap-x-1.8 gap-y-3.8 tablet:grid-cols-4 phone:grid-cols-2">
            {CUSTOMER_LOGOS.map((client) => (
              <div
                key={client.name}
                className="flex min-h-customer-logo items-center justify-center bg-white p-2 text-center text-lg font-extrabold text-brand-text"
              >
                {client.image ? (
                  <Image
                    src={client.image}
                    alt={client.name}
                    className="max-h-customer-logo max-w-customer-logo object-contain"
                  />
                ) : (
                  <span>{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export const FranchisePage: React.FC = () => (
  <main className={PAGE_CLASS}>
    <section className="pb-8.5 pt-6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-5 max-w-marketing-title text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight text-brand-pink phone:mb-3.6 phone:text-brand-card-title">
          Photobooth không chỉ là trào lưu còn là cơ hội để bạn bắt đầu câu
          chuyện thành công
        </h1>
        <div className="grid grid-cols-3 gap-4 phone:grid-cols-1">
          {FRANCHISE_TOP_IMAGES.map((image) => (
            <Media
              key={getImageKey(image, 'franchise-image')}
              src={image}
              alt="Nhượng quyền Fun Studio"
              sizes="(max-width: 768px) 100vw, 420px"
              className="aspect-franchise-top"
            />
          ))}
        </div>
        <p className="mx-auto mb-15 mt-4 max-w-marketing text-left text-lg leading-relaxed text-brand-text phone:text-base">
          Photobooth không còn là xu hướng nhất thời, mà đã trở thành một mô
          hình kinh doanh hấp dẫn và sinh lời bền vững. Với Fun Studio, chuỗi
          photobooth nhượng quyền lớn nhất Việt Nam, đối tác được đồng hành từ
          A-Z trong vận hành và phát triển.
        </p>

        <div className="mt-16 grid grid-cols-story-panel items-start gap-3 phone:grid-cols-1 phone:gap-7">
          <article className="min-h-difference-panel border border-brand-muted px-5.6 py-6 phone:min-h-0 phone:px-2.4 phone:py-3.2">
            <h2 className="mb-6 mt-0 text-marketing-section-sm font-extrabold uppercase leading-normal text-brand-pink">
              Điều gì khiến Fun Studio trở nên khác biệt
            </h2>
            <p className="mb-4 mt-0 text-base leading-normal">
              Tự phát triển phần mềm chụp ảnh và quản lý vận hành độc quyền,
              giúp tối ưu trải nghiệm và giảm chi phí bảo trì.
            </p>
            <p className="mb-4 mt-0 text-base leading-normal">
              Đội ngũ sáng tạo liên tục phát triển concept độc quyền, hệ sinh
              thái truyền thông mạnh mẽ và nguồn lực vận hành phủ khắp thị
              trường.
            </p>
            <p className="mb-4 mt-0 text-base leading-normal">
              Hệ sinh thái truyền thông mạnh mẽ với hàng trăm nghìn lượt theo
              dõi và nội dung viral trên các nền tảng TikTok, Facebook, Zalo OA.
            </p>
            <p className="mb-4 mt-0 text-base leading-normal">
              Mạng lưới vận hành phủ khắp 16 tỉnh thành, giúp Fun Studio có lợi
              thế lớn về logistics, đào tạo và chia sẻ kinh nghiệm thực tế.
            </p>
            <p className="mb-4 mt-0 text-base leading-normal">
              Tầm nhìn thương hiệu rõ ràng: đưa photobooth trở thành điểm hẹn
              cảm xúc, nơi mọi người đều có thể lưu giữ niềm vui và câu chuyện
              riêng của mình.
            </p>
          </article>
          <div className="grid grid-cols-difference gap-2">
            {DIFFERENCE_IMAGES.map((image) => (
              <Media
                key={getImageKey(image, 'difference-image')}
                src={image}
                alt="Khác biệt Fun Studio"
                className="h-difference-tile phone:h-auto phone:aspect-square"
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-brand-pink pb-9 pt-6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-5 max-w-marketing-title text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight text-white phone:mb-3.6 phone:text-brand-card-title">
          Lý do nên trở thành đối tác của Fun Studio chuỗi photobooth nhượng
          quyền lớn nhất Việt Nam
        </h1>
        <div className="grid grid-cols-4 gap-3.8 pt-5 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-x-5 phone:gap-y-14">
          {FRANCHISE_REASONS.map((reason, index) => (
            <InfoCard
              key={reason.text}
              icon={reason.icon}
              text={reason.text}
              index={index + 1}
              compact
            />
          ))}
        </div>
      </div>
    </section>

    <section className="pb-10 pt-6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-5 max-w-marketing text-center font-UTMAVo text-marketing-section font-normal uppercase leading-tight text-brand-pink phone:mb-3.6 phone:text-brand-card-title">
          6 dịch vụ miễn phí dành riêng cho đối tác của Fun Studio
        </h1>
        <div className="grid grid-cols-3 gap-x-3 gap-y-7 pt-4 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-x-5 phone:gap-y-14">
          {FREE_SERVICE_CARDS.map((card, index) => (
            <InfoCard
              key={card.title}
              index={index + 1}
              title={card.title}
              text={card.text}
              variant="franchise-service"
            />
          ))}
        </div>
      </div>
    </section>
  </main>
);

export const ServicesPage: React.FC = () => {
  const productCarousel = useCarouselIndex(PRODUCT_MACHINE_PAGE_COUNT);
  const productPages = Array.from(
    { length: PRODUCT_MACHINE_PAGE_COUNT },
    (_, page) => page,
  );
  const conceptCarousel = useCarouselIndex(CONCEPT_CARDS.length);
  const conceptVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>
            Đa dạng dòng máy tối ưu trải nghiệm
          </ServiceSectionHeading>
          <Carousel
            items={productPages}
            position={productCarousel.position}
            getKey={(page) => String(page)}
            onDragSlide={(direction) =>
              productCarousel.setSlide(productCarousel.current + direction)
            }
            renderItem={(page) => (
              <div className="grid grid-cols-3 gap-x-4.8 gap-y-20 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-y-7">
                {getRotatedPageItems(
                  PRODUCT_MACHINES,
                  page,
                  PRODUCT_MACHINE_PAGE_SIZE,
                ).map((machine) => (
                  <ServiceMachineCard
                    key={`${page}-${machine.title}`}
                    image={machine.image}
                    title={machine.title}
                  />
                ))}
              </div>
            )}
          />
          <SliderControls
            count={PRODUCT_MACHINE_PAGE_COUNT}
            current={productCarousel.current}
            onChange={productCarousel.setSlide}
          />
        </div>
      </section>

      <section className="pb-8 pt-3 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading className="mb-4">
            New trend: Photobooth in-store
          </ServiceSectionHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            Mô hình photobooth in-store không chỉ giúp cửa hàng tạo điểm nhấn
            khác biệt mà còn thu hút đúng tệp khách hàng trẻ yêu thích check-in,
            thể hiện cá tính và chia sẻ lên mạng xã hội.
          </p>
          <ServiceImageGrid images={SERVICE_IN_STORE_IMAGES} square />

          <ServiceSectionHeading className="mb-4 mt-8">
            Mô hình kiosk tối ưu trải nghiệm & vận hành
          </ServiceSectionHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            Thiết kế kiosk giúp tối ưu diện tích, vận hành gọn và phù hợp với
            nhiều không gian như trung tâm thương mại, cửa hàng, sự kiện hoặc
            điểm bán lưu động.
          </p>
          <ServiceImageGrid images={SERVICE_KIOSK_IMAGES} square />
        </div>
      </section>

      <section className="min-h-service-concept bg-brand-pink pb-10 pt-8 phone:min-h-0 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading muted>
            Concept phòng chụp
          </ServiceSectionHeading>
          <Carousel
            items={CONCEPT_CARDS}
            position={conceptCarousel.position}
            visibleCount={conceptVisibleCount}
            getKey={(concept) => getImageKey(concept.image, 'concept-image')}
            onDragSlide={(direction) =>
              conceptCarousel.setSlide(conceptCarousel.current + direction)
            }
            viewportClassName="-mx-4.5 phone:mx-0"
            itemClassName="px-1.8 phone:px-0"
            renderItem={(concept) => (
              <article className="bg-white">
                <Media
                  src={concept.image}
                  alt="Concept phòng chụp"
                  className="aspect-concept"
                />
                <h3 className="mx-3.5 mb-2 mt-3 text-xl font-extrabold uppercase leading-tight text-brand-pink">
                  {concept.title}
                </h3>
                <p className="mx-3.5 mb-5 mt-0 text-base leading-relaxed text-brand-text">
                  Những concept được cập nhật thường xuyên giúp cửa hàng luôn
                  mới mẻ, dễ truyền thông và giữ chân khách hàng quay lại.
                </p>
              </article>
            )}
          />
          <SliderControls
            light
            count={CONCEPT_CARDS.length}
            current={conceptCarousel.current}
            onChange={conceptCarousel.setSlide}
          />
        </div>
      </section>

      <section className="pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Các sản phẩm khác</ServiceSectionHeading>
          <div className="mx-auto grid max-w-store-map grid-cols-3 gap-x-12.4 gap-y-7.2 phone:grid-cols-1 phone:gap-4">
            {SERVICE_OTHER_PRODUCTS.map((product, index) => (
              <div
                key={product.title}
                className={cx(
                  index === 6 && 'col-start-2 phone:col-start-auto',
                )}
              >
                <ServiceOtherProductCard
                  image={product.image}
                  title={product.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Dịch vụ bán máy</ServiceSectionHeading>
          <ServicePillHeading>
            Kinh doanh photobooth phù hợp với
          </ServicePillHeading>
          <div className="mx-auto mb-8 grid max-w-store-map grid-cols-3 gap-7.2 phone:grid-cols-1">
            {BUSINESS_FIT_CARDS.map((card) => (
              <ServiceSalesCircle
                key={card.text}
                icon={card.icon}
                text={card.text}
              />
            ))}
          </div>
          <ServicePillHeading>Đặt photobooth ở bất kỳ đâu</ServicePillHeading>
          <div className="mx-auto grid max-w-store-map grid-cols-2 gap-5 phone:grid-cols-1">
            {SERVICE_MODELS.map((model) => (
              <ServiceModelCard
                key={model.title}
                image={model.image}
                title={model.title}
                text={model.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line pb-8 pt-6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Dịch vụ thuê máy</ServiceSectionHeading>
          <ServicePillHeading>{RENTAL_SECTIONS[0].title}</ServicePillHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            {RENTAL_SECTIONS[0].intro}
          </p>
          <ServiceImageGrid
            images={RENTAL_SECTIONS[0].images}
            className="mx-auto mb-8 max-w-store-map"
          />

          <ServicePillHeading>{RENTAL_SECTIONS[1].title}</ServicePillHeading>
          <div className="mx-auto mb-8 grid max-w-store-map grid-cols-2 gap-5 phone:grid-cols-1">
            {RENTAL_SECTIONS[1].cards.map((card) => (
              <ServiceModelCard
                key={card.title}
                image={card.image}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>

          <ServicePillHeading>Dịch vụ thuê máy sự kiện idol</ServicePillHeading>
          <p className="mx-auto mb-4.8 max-w-marketing text-lg leading-relaxed text-brand-text phone:text-base">
            Photobooth giúp fan meeting, concert và sự kiện thần tượng có thêm
            điểm check-in, lưu giữ khoảnh khắc và lan tỏa nội dung trên mạng xã
            hội.
          </p>
          <ServiceImageGrid
            images={SERVICE_RENTAL_IDOL_IMAGES}
            className="mx-auto max-w-store-map"
          />
        </div>
      </section>
    </main>
  );
};

export const StoresPage: React.FC = () => (
  <main className={PAGE_CLASS}>
    <section className="pb-7.2 pt-5.6 phone:py-4.8">
      <div className={CONTAINER_CLASS}>
        <SectionTitle className="mb-3.6">
          Hệ thống 80 cửa hàng trên toàn quốc
        </SectionTitle>
        <StoreCoverageMap />
      </div>
    </section>

    <section className={SECTION_CLASS}>
      <div className={CONTAINER_CLASS}>
        <SectionTitle>Danh sách cửa hàng</SectionTitle>
        {STORE_REGIONS.map((region) => (
          <StoreRegionCarousel key={region.name} region={region} />
        ))}
      </div>
    </section>
  </main>
);

export const NewsPage: React.FC = () => {
  const newsCarousel = useCarouselIndex(NEWS_CARDS.length);
  const newsVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-6 pt-5.6 phone:py-4.8">
        <div className={CONTAINER_CLASS}>
          <div className="relative mx-auto max-w-news-list">
            <InlineArrow
              direction="previous"
              className={LEFT_FLOAT_ARROW_CLASS}
              onClick={() => newsCarousel.setSlide(newsCarousel.current - 1)}
            />
            <Carousel
              items={NEWS_CARDS}
              position={newsCarousel.position}
              visibleCount={newsVisibleCount}
              getKey={(card) => card.title}
              onDragSlide={(direction) =>
                newsCarousel.setSlide(newsCarousel.current + direction)
              }
              viewportClassName="-mx-2.4 phone:mx-0"
              itemClassName="px-1.8 phone:px-0"
              renderItem={(card) => (
                <article className="flex min-h-news-card flex-col border border-brand-text bg-white">
                  <Media
                    src={card.image}
                    alt={card.title}
                    className="aspect-square"
                  />
                  <div className="px-2.4 pb-2.4 pt-2.4">
                    <h2 className="mb-2.8 mt-0 text-lg font-extrabold uppercase leading-snug text-brand-pink">
                      {card.title}
                    </h2>
                    <p className="m-0 text-brand-body-lg leading-snug text-brand-text phone:text-base">
                      {card.text}
                    </p>
                  </div>
                </article>
              )}
            />
            <InlineArrow
              direction="next"
              className={RIGHT_FLOAT_ARROW_CLASS}
              onClick={() => newsCarousel.setSlide(newsCarousel.current + 1)}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export const GalleryPage: React.FC = () => {
  const galleryPageCount = getPageCount(
    GALLERY_ITEMS.length,
    GALLERY_PAGE_SIZE,
  );
  const galleryCarousel = useCarouselIndex(galleryPageCount);
  const galleryPages = Array.from(
    { length: galleryPageCount },
    (_, page) => page,
  );

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-3.4 pt-4.2 phone:py-4.8">
        <div className="mx-auto w-full max-w-gallery-grid phone:w-marketing-container-mobile">
          <Carousel
            items={galleryPages}
            position={galleryCarousel.position}
            getKey={(page) => String(page)}
            onDragSlide={(direction) =>
              galleryCarousel.setSlide(galleryCarousel.current + direction)
            }
            renderItem={(page) => (
              <div className="grid grid-cols-6 gap-1.4 tablet:grid-cols-4 phone:grid-cols-2">
                {getPagedItems(GALLERY_ITEMS, page, GALLERY_PAGE_SIZE).map(
                  (item) => (
                    <article
                      key={item.id}
                      className="relative overflow-hidden bg-neutral-900"
                    >
                      <Media
                        src={item.image || GALLERY_FALLBACK_IMAGE}
                        alt={item.title}
                        className="aspect-square bg-neutral-900"
                      />
                    </article>
                  ),
                )}
              </div>
            )}
          />
          <SliderControls
            count={galleryPageCount}
            current={galleryCarousel.current}
            onChange={galleryCarousel.setSlide}
          />
        </div>
      </section>
      <FooterSpacer />
    </main>
  );
};

export const FranchiseRegisterPage: React.FC = () => {
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage('Form hiện chưa kết nối gửi dữ liệu.');
  };

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-7.2 pt-4.6 phone:pb-5.2 phone:pt-3.4">
        <div className={CONTAINER_CLASS}>
          <h1 className="mb-11 mt-0 text-center font-UTMAVo text-marketing-section-lg font-normal uppercase leading-tight text-brand-pink phone:mb-3 phone:text-brand-card-title">
            Form đăng ký tư vấn dịch vụ của Fun Studio
          </h1>
          <form
            noValidate
            className="mx-auto w-register-form rounded-lg border border-brand-control bg-white px-2.4 pb-7 pt-5 shadow-brand-hairline phone:px-1.6 phone:pb-2.5"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4.5 mt-0 border-b border-brand-control pb-2.5 text-lg font-extrabold uppercase leading-snug text-brand-pink phone:text-base">
              Form thông tin tư vấn nhượng quyền:
            </h2>
            <div className="grid gap-3">
              <div>
                <label className="sr-only" htmlFor="franchise-register-name">
                  Họ tên
                </label>
                <input
                  aria-label="Ho ten"
                  id="franchise-register-name"
                  name="name"
                  className={FORM_INPUT_CLASS}
                  placeholder="Họ tên: (Vui lòng nhập đầy đủ họ tên của bạn) (*Bắt buộc)"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="franchise-register-phone">
                  Số điện thoại
                </label>
                <input
                  aria-label="So dien thoai"
                  id="franchise-register-phone"
                  name="phone"
                  type="tel"
                  className={FORM_INPUT_CLASS}
                  placeholder="Số điện thoại: (Để Fun Studio có thể liên hệ tư vấn nhanh nhất) (*Bắt buộc)"
                />
              </div>
              <RegisterFieldGroup label="Email: (Nhận tài liệu và thông tin chi tiết về nhượng quyền)">
                <p className="mb-0.5 mt-0 text-base leading-snug text-brand-placeholder phone:text-brand-caption">
                  Bạn muốn nhận tư vấn về dịch vụ nào (*Bắt buộc)
                </p>
                {REGISTER_FORM_DEMAND_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="serviceNeeds">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <RegisterFieldGroup label="Bạn đã có mặt bằng kinh doanh chưa?">
                {REGISTER_FORM_LOCATION_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="locationStatus">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <RegisterFieldGroup label="Địa chỉ: (đường, phường, thành phố) dự kiến mở cửa hàng:">
                <p className="mb-0.5 mt-0 text-base leading-snug text-brand-placeholder phone:text-brand-caption">
                  Thời gian dự kiến nhượng quyền:
                </p>
                {REGISTER_FORM_TIMING_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="openingTimeline">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <RegisterFieldGroup label="Số vốn dự kiến đầu tư:">
                {REGISTER_FORM_BUDGET_OPTIONS.map((option) => (
                  <RegisterOption key={option} name="investmentBudget">
                    {option}
                  </RegisterOption>
                ))}
              </RegisterFieldGroup>
              <div>
                <label className="sr-only" htmlFor="franchise-register-note">
                  Ghi chú thêm
                </label>
                <textarea
                  aria-label="Ghi chu them"
                  id="franchise-register-note"
                  name="note"
                  rows={5}
                  className={cx(FORM_INPUT_CLASS, 'resize-y py-3.5')}
                  placeholder="Ghi chú thêm (nếu có):"
                />
              </div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-1.8 gap-y-3 text-brand-caption text-brand-placeholder">
              <button
                type="submit"
                className="inline-flex min-h-5.8 items-center justify-center rounded border border-brand-control-dark bg-brand-muted px-1.8 text-base font-extrabold text-brand-text transition-colors hover:bg-brand-pink hover:text-white"
              >
                Gửi đi
              </button>
              <a
                href={MARKETING_CONTACT.phoneHref}
                className="text-brand-placeholder no-underline"
              >
                Hotline tư vấn: {MARKETING_CONTACT.phone}
              </a>
              <span className="hidden h-1.8 w-px bg-brand-line md:inline-block" />
              <a
                href="mailto:Sales@funstudio.com.vn"
                className="text-brand-placeholder no-underline"
              >
                Sales@funstudio.com.vn
              </a>
            </div>
            {formMessage && (
              <p
                className="mb-0 mt-3.5 text-brand-caption font-medium text-brand-pink"
                role="status"
              >
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export const MarketingContactStrip: React.FC = () => (
  <section className="hidden">
    <a href={MARKETING_CONTACT.phoneHref}>{MARKETING_CONTACT.phoneLabel}</a>
  </section>
);
