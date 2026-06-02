import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import Image from 'components/image/Image';
import type { NewsCardModel } from 'models/news/news.model';
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
import MarketingIconButton from './components/MarketingIconButton';
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
  const heroSlideCount = HOME_HERO_SLIDES.length;
  const {
    current: heroCurrent,
    position: heroPosition,
    setSlide: setHeroSlide,
  } = useCarouselIndex(heroSlideCount);
  const videoCarousel = useCarouselIndex(HOME_VIDEO_SLIDES.length);

  useEffect(() => {
    if (heroSlideCount <= 1) {
      return undefined;
    }

    const autoSlideTimer = window.setInterval(() => {
      setHeroSlide(heroCurrent + 1);
    }, 5000);

    return () => window.clearInterval(autoSlideTimer);
  }, [heroCurrent, heroSlideCount, setHeroSlide]);

  return (
    <main className={PAGE_CLASS}>
      <section className="relative pb-8 pt-12 phone:pb-5 phone:pt-6">
        <HeroBannerCarousel
          slides={HOME_HERO_SLIDES}
          position={heroPosition}
          current={heroCurrent}
          onChange={setHeroSlide}
        />
      </section>

      <section className="pb-24 pt-8 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <SectionTitle className="mb-14">{HOME_VIDEO.title}</SectionTitle>
          <div className="relative flex min-h-[33.625rem] items-center justify-center phone:min-h-0">
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
              viewportClassName="w-[56.25rem] max-w-[86vw] phone:w-full"
              renderItem={(slide) => (
                <div className="relative">
                  <HomeVideoCard
                    slide={slide}
                    resetKey={videoCarousel.position}
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
            className="mt-9"
            showArrows={false}
            tone="muted"
            count={HOME_VIDEO_SLIDES.length}
            current={videoCarousel.current}
            onChange={videoCarousel.setSlide}
          />
        </div>
      </section>

      <section className="pb-28 pt-16 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <SectionTitle as="h1" className="mb-16">
            {
              'Fun Studio là thương hiệu chụp ảnh tự động\ntheo phong cách Hàn Quốc'
            }
          </SectionTitle>
          <div className="grid grid-cols-[minmax(0,645px)_minmax(0,682px)] items-start justify-center gap-16 tablet:grid-cols-2 tablet:gap-14 phone:grid-cols-1 phone:gap-[4.375rem]">
            <div className="text-justify text-marketing-copy text-brand-text tablet:text-xl phone:text-left phone:text-base">
              {ABOUT_COPY.map((paragraph) => (
                <p key={paragraph} className="mb-7 mt-0 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid gap-12">
              {ABOUT_IMAGES.map((image, index) => (
                <Media
                  key={getImageKey(image, 'about-image')}
                  src={image}
                  alt={`Không gian photobooth Fun Studio ${index + 1}`}
                  className="aspect-[682/413]"
                  sizes="(max-width: 768px) 100vw, 682px"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-7 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <SectionTitle className="mb-14">
            Quá trình hình thành & phát triển
          </SectionTitle>
          <div className="mx-auto grid max-w-marketing grid-cols-8 items-start gap-x-4 tablet:grid-cols-4 tablet:gap-y-[4.375rem] phone:grid-cols-2 phone:gap-y-14">
            {DEVELOPMENT_TIMELINE.map(([date, text]) => (
              <article
                key={date}
                className="relative mt-10 flex h-[17.5rem] min-h-0 items-start justify-center rounded-2xl bg-brand-pink px-4 pb-7 pt-16 text-center text-white phone:mt-10 phone:h-auto phone:min-h-60 phone:px-4 phone:py-5"
              >
                <strong className="absolute -top-9 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-white bg-brand-muted font-UTMImpact text-marketing-timeline-date font-normal text-white phone:-top-10 phone:h-[4.5rem] phone:w-[4.5rem] phone:text-lg">
                  {date}
                </strong>
                <p className="m-0 text-marketing-copy font-extrabold phone:text-brand-card-title">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-pink pb-28 pt-24 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <SectionTitle muted className="mb-14">
            Khách hàng của chúng tôi
          </SectionTitle>
          <div className="grid grid-cols-7 gap-x-4 gap-y-9 tablet:grid-cols-4 phone:grid-cols-2">
            {CUSTOMER_LOGOS.map((client) => (
              <div
                key={client.name}
                className="flex h-36 min-h-0 items-center justify-center overflow-hidden bg-white text-center text-marketing-logo-label font-extrabold text-brand-text"
              >
                {client.image ? (
                  <Image
                    src={client.image}
                    alt={client.name}
                    className="h-full w-full object-cover"
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
    <section className="pb-[5.3125rem] pt-14 phone:py-12">
      <div className={CONTAINER_CLASS}>
        <h1 className="mx-auto mb-12 max-w-marketing-title whitespace-pre-line text-center font-UTMAVo text-marketing-section font-normal uppercase text-brand-pink phone:mb-9 phone:whitespace-normal phone:text-brand-card-title">
          {
            'Photobooth không chỉ là trào lưu\ncòn là cơ hội để bạn bắt đầu câu chuyện thành công'
          }
        </h1>
        <div className="grid grid-cols-3 gap-10 phone:grid-cols-1">
          {FRANCHISE_TOP_IMAGES.map((image, index) => (
            <Media
              key={getImageKey(image, 'franchise-image')}
              src={image}
              alt={`Nhượng quyền photobooth Fun Studio ${index + 1}`}
              sizes="(max-width: 768px) 100vw, 420px"
              className="aspect-franchise-top"
            />
          ))}
        </div>
        <p className="mx-auto mb-[9.375rem] mt-10 max-w-marketing text-left text-[1.25rem] leading-relaxed text-brand-text phone:text-base">
          Photobooth không còn là xu hướng nhất thời, mà đã trở thành một mô
          hình kinh doanh hấp dẫn và sinh lời bền vững. Với Fun Studio – chuỗi
          photobooth nhượng quyền lớn nhất Việt Nam, Fun Studio sẽ đồng hành
          cùng bạn trên hành trình khởi tạo một không gian chụp ảnh được giới
          trẻ yêu thích, đồng thời giúp bạn xây dựng hoạt động kinh doanh riêng
          với hệ thống vận hành chuyên nghiệp và hỗ trợ toàn diện từ A-Z.
        </p>

        <div className="mt-16 grid grid-cols-story-panel items-start gap-7 phone:grid-cols-1 phone:gap-[4.375rem]">
          <article className="min-h-difference-panel border border-brand-muted px-14 py-14 phone:min-h-0 phone:px-6 phone:py-8">
            <h2 className="mb-14 mt-0 whitespace-pre-line text-marketing-section-sm font-extrabold uppercase text-brand-pink phone:whitespace-normal">
              {'Điều gì khiến Fun Studio\ntrở nên khác biệt'}
            </h2>
            <p className="mb-10 mt-0 text-[1.25rem] leading-normal phone:text-base">
              Tự phát triển phần mềm chụp ảnh và quản lý vận hành độc quyền,
              giúp tối ưu trải nghiệm và giảm chi phí bảo trì.
            </p>
            <p className="mb-10 mt-0 text-[1.25rem] leading-normal phone:text-base">
              Đội ngũ sáng tạo liên tục, phát triển concept độc quyền từ hiện
              đại đến Vintage, đánh trúng xu hướng giới trẻ như 80’s Diner, The
              Railway Station, Timeless,... đảm bảo mỗi cơ sở có dấu ấn riêng.
            </p>
            <p className="mb-10 mt-0 text-[1.25rem] leading-normal phone:text-base">
              Hệ sinh thái truyền thông mạnh mẽ với hàng trăm nghìn lượt theo
              dõi và nội dung viral trên các nền tảng TikTok, Facebook, Zalo OA.
            </p>
            <p className="mb-10 mt-0 text-[1.25rem] leading-normal phone:text-base">
              Mạng lưới vận hành phủ khắp 16 tỉnh thành, giúp Fun Studio có lợi
              thế lớn về logistics, đào tạo và chia sẻ kinh nghiệm thực tế.
            </p>
            <p className="mb-10 mt-0 text-[1.25rem] leading-normal phone:text-base">
              Tầm nhìn thương hiệu rõ ràng: đưa photobooth trở thành “điểm hẹn
              cảm xúc” - nơi mỗi người đều có thể lưu giữ niềm vui và câu chuyện
              riêng của mình.
            </p>
          </article>
          <div className="grid grid-cols-difference gap-5">
            {DIFFERENCE_IMAGES.map((image, index) => (
              <Media
                key={getImageKey(image, 'difference-image')}
                src={image}
                alt={`Điểm khác biệt photobooth Fun Studio ${index + 1}`}
                className="h-difference-tile phone:h-auto phone:aspect-square"
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-brand-pink pb-[5.625rem] pt-14 phone:py-12">
      <div className={CONTAINER_CLASS}>
        <h2 className="mx-auto mb-12 max-w-marketing-title whitespace-pre-line text-center font-UTMAVo text-marketing-section font-normal uppercase text-white phone:mb-9 phone:whitespace-normal phone:text-brand-card-title">
          {
            'Lý do nên trở thành đối tác của Fun Studio\nchuỗi photobooth nhượng quyền lớn nhất Việt Nam'
          }
        </h2>
        <div className="grid grid-cols-4 gap-9 pt-12 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-x-12 phone:gap-y-36">
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

    <section className="pb-10 pt-14 phone:py-12">
      <div className={CONTAINER_CLASS}>
        <h2 className="mx-auto mb-12 max-w-marketing whitespace-pre-line text-center font-UTMAVo text-marketing-section font-normal uppercase text-brand-pink phone:mb-9 phone:whitespace-normal phone:text-brand-card-title">
          6 dịch vụ miễn phí dành riêng cho đối tác của Fun Studio
        </h2>
        <div className="grid grid-cols-3 gap-x-7 gap-y-[5.625rem] pt-12 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-x-12 phone:gap-y-[5.625rem]">
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
      <section className="pb-20 pt-14 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading as="h1">
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
              <div className="grid grid-cols-3 gap-10 tablet:grid-cols-2 phone:grid-cols-1 phone:gap-y-[4.375rem]">
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

      <section className="pb-20 pt-7 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading className="mb-10">
            New trend: Photobooth in-store
          </ServiceSectionHeading>
          <p className="mx-auto mb-12 max-w-marketing text-[1.25rem] leading-relaxed text-brand-text phone:text-base">
            Mô hình photobooth in-store không chỉ giúp cửa hàng tạo điểm nhấn
            khác biệt mà còn thu hút đúng tệp Gen Z yêu thích check-in, thể hiện
            cá tính và chia sẻ lên mạng xã hội. Mỗi tấm ảnh gắn logo hoặc visual
            thương hiệu đều trở thành một nội dung lan tỏa tự nhiên, trong khi
            các hoạt động như chụp ảnh, tải ảnh, quét QR hay đăng story giúp
            tăng tương tác, thu thập insight khách hàng và tạo thêm doanh thu
            trực tiếp lẫn gián tiếp cho cửa hàng.
          </p>
          <ServiceImageGrid images={SERVICE_IN_STORE_IMAGES} square />

          <ServiceSectionHeading className="mb-10 mt-20">
            Mô hình kiosk tối ưu trải nghiệm & vận hành
          </ServiceSectionHeading>
          <p className="mx-auto mb-12 max-w-marketing text-[1.25rem] leading-relaxed text-brand-text phone:text-base">
            Mô hình photobooth in-store không chỉ giúp cửa hàng tạo điểm nhấn
            khác biệt mà còn thu hút đúng tệp Gen Z yêu thích check-in, thể hiện
            cá tính và chia sẻ lên mạng xã hội. Mỗi tấm ảnh gắn logo hoặc visual
            thương hiệu đều trở thành một nội dung lan tỏa tự nhiên, trong khi
            các hoạt động như chụp ảnh, tải ảnh, quét QR hay đăng story giúp
            tăng tương tác, thu thập insight khách hàng và tạo thêm doanh thu
            trực tiếp lẫn gián tiếp cho cửa hàng.
          </p>
          <ServiceImageGrid images={SERVICE_KIOSK_IMAGES} square />
        </div>
      </section>

      <section className="min-h-service-concept bg-brand-pink pb-20 pt-8 phone:min-h-0 phone:py-12">
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
            viewportClassName="mx-auto max-w-[84.375rem]"
            itemClassName="px-5 phone:px-0"
            renderItem={(concept) => (
              <article className="flex h-[52.875rem] flex-col border border-brand-muted bg-white tablet:h-[50rem] phone:h-[45rem]">
                <Media
                  src={concept.image}
                  alt="Concept phòng chụp"
                  className="h-[24.875rem] shrink-0 tablet:h-[22.5rem] phone:h-[17.5rem]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 405px"
                />
                <div className="flex min-h-0 flex-1 flex-col">
                  <h3 className="mx-6 mb-4 mt-7 text-marketing-card-title-lg font-extrabold uppercase text-brand-pink phone:mx-5 phone:mb-2.5 phone:mt-6 phone:text-xl">
                    {concept.title}
                  </h3>
                  <p className="mx-6 mb-5 mt-0 flex-1 overflow-hidden text-marketing-card-copy text-brand-text tablet:text-lg phone:mx-5 phone:text-base">
                    {concept.text}
                  </p>
                  <NextLink
                    href={MARKETING_CONTACT.ctaHref}
                    className="mt-auto flex min-h-12 items-center justify-center border-t border-brand-muted px-7 text-marketing-card-heading font-extrabold uppercase text-brand-pink no-underline phone:min-h-12 phone:text-base"
                  >
                    Nhận báo giá
                  </NextLink>
                </div>
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

      <section className="pb-20 pt-14 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Các sản phẩm khác</ServiceSectionHeading>
          <div className="mx-auto grid max-w-store-map grid-cols-3 gap-x-32 gap-y-[4.5rem] phone:grid-cols-1 phone:gap-10">
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

      <section className="border-t border-brand-line pb-20 pt-14 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Dịch vụ bán máy</ServiceSectionHeading>
          <ServicePillHeading>
            Kinh doanh photobooth phù hợp với
          </ServicePillHeading>
          <div className="mx-auto mb-20 grid max-w-store-map grid-cols-3 gap-[4.5rem] phone:grid-cols-1">
            {BUSINESS_FIT_CARDS.map((card) => (
              <ServiceSalesCircle
                key={card.text}
                icon={card.icon}
                text={card.text}
              />
            ))}
          </div>
          <ServicePillHeading>Đặt photobooth ở bất kỳ đâu</ServicePillHeading>
          <div className="mx-auto grid max-w-store-map grid-cols-2 gap-12 phone:grid-cols-1">
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

      <section className="border-t border-brand-line pb-20 pt-14 phone:py-12">
        <div className={CONTAINER_CLASS}>
          <ServiceSectionHeading>Dịch vụ thuê máy</ServiceSectionHeading>
          <ServicePillHeading>{RENTAL_SECTIONS[0].title}</ServicePillHeading>
          <p className="mx-auto mb-12 max-w-marketing text-[1.25rem] leading-relaxed text-brand-text phone:text-base">
            {RENTAL_SECTIONS[0].intro}
          </p>
          <ServiceImageGrid
            images={RENTAL_SECTIONS[0].images}
            className="mx-auto mb-20 max-w-store-map"
          />

          <ServicePillHeading>{RENTAL_SECTIONS[1].title}</ServicePillHeading>
          <div className="mx-auto mb-20 grid max-w-store-map grid-cols-2 gap-12 phone:grid-cols-1">
            {RENTAL_SECTIONS[1].cards.map((card) => (
              <ServiceModelCard
                key={card.title}
                image={card.image}
                title={card.title}
                text={card.text}
                bodyClassName="text-[1.25rem]"
              />
            ))}
          </div>

          <ServicePillHeading>Dịch vụ thuê máy sự kiện idol</ServicePillHeading>
          <p className="mx-auto mb-12 max-w-marketing text-[1.25rem] leading-relaxed text-brand-text phone:text-base">
            Đám cưới không chỉ là ngày trọng đại của cô dâu chú rể, mà còn là
            nơi chứa đầy những nụ cười, lời chúc và kỷ niệm khó quên. Với dịch
            vụ thuê Photobooth nhà Fun Studio, mỗi vị khách đều có thể mang về
            một bức ảnh in liền tay - món quà kỷ niệm tinh tế và ý nghĩa nhất
            trong ngày vui.
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
    <section className="pb-[4.5rem] pt-14 phone:py-12">
      <div className={CONTAINER_CLASS}>
        <SectionTitle as="h1" className="mb-9">
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

export type NewsPageProps = {
  newsCards?: NewsCardModel[];
};

export const NewsPage: React.FC<NewsPageProps> = ({ newsCards = [] }) => {
  const newsCarousel = useCarouselIndex(newsCards.length);
  const newsVisibleCount = useResponsiveVisibleCount({
    desktop: 3,
    tablet: 2,
    mobile: 1,
  });

  return (
    <main className={PAGE_CLASS}>
      <h1 className="sr-only">Tin tức Fun Studio</h1>
      <section className="pb-14 pt-14 phone:py-12">
        <div className={CONTAINER_CLASS}>
          {newsCards.length ? (
            <div className="relative mx-auto max-w-news-list">
              <InlineArrow
                direction="previous"
                className={LEFT_FLOAT_ARROW_CLASS}
                onClick={() => newsCarousel.setSlide(newsCarousel.current - 1)}
              />
              <Carousel
                items={newsCards}
                position={newsCarousel.position}
                visibleCount={newsVisibleCount}
                getKey={(card) => card.id}
                onDragSlide={(direction) =>
                  newsCarousel.setSlide(newsCarousel.current + direction)
                }
                viewportClassName="-mx-6 phone:mx-0"
                itemClassName="px-4 phone:px-0"
                renderItem={(card) => (
                  <article className="flex min-h-news-card flex-col border border-brand-text bg-white">
                    <Media
                      src={card.image}
                      alt={card.title}
                      className="aspect-square"
                    />
                    <div className="px-6 pb-6 pt-6">
                      <h2 className="mb-7 mt-0 text-lg font-extrabold uppercase leading-snug text-brand-pink">
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
          ) : (
            <p className="m-0 text-center text-brand-body-lg text-brand-text">
              Chưa có tin tức.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export const GalleryPage: React.FC = () => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const galleryPointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const galleryPageCount = getPageCount(
    GALLERY_ITEMS.length,
    GALLERY_PAGE_SIZE,
  );
  const galleryCarousel = useCarouselIndex(galleryPageCount);
  const galleryPages = Array.from(
    { length: galleryPageCount },
    (_, page) => page,
  );
  const previewItem =
    previewIndex === null ? null : GALLERY_ITEMS[previewIndex];

  const closePreview = () => setPreviewIndex(null);

  const showPreviewPrevious = () => {
    setPreviewIndex((current) =>
      current === null
        ? current
        : (current - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
    );
  };

  const showPreviewNext = () => {
    setPreviewIndex((current) =>
      current === null ? current : (current + 1) % GALLERY_ITEMS.length,
    );
  };

  useEffect(() => {
    if (previewIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }

      if (event.key === 'ArrowLeft') {
        showPreviewPrevious();
      }

      if (event.key === 'ArrowRight') {
        showPreviewNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewIndex]);

  return (
    <main className={PAGE_CLASS}>
      <section className="pb-8 pt-10 phone:py-12">
        <div className="mx-auto w-full max-w-gallery-grid phone:w-marketing-container-mobile">
          <Carousel
            items={galleryPages}
            position={galleryCarousel.position}
            getKey={(page) => String(page)}
            onDragSlide={(direction) =>
              galleryCarousel.setSlide(galleryCarousel.current + direction)
            }
            renderItem={(page) => (
              <div className="grid grid-cols-6 gap-3.5 tablet:grid-cols-4 phone:grid-cols-2">
                {getPagedItems(GALLERY_ITEMS, page, GALLERY_PAGE_SIZE).map(
                  (item, pageItemIndex) => {
                    const itemIndex = page * GALLERY_PAGE_SIZE + pageItemIndex;

                    return (
                      <article
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open gallery image ${itemIndex + 1}`}
                        className="relative cursor-pointer overflow-hidden bg-neutral-900"
                        onPointerDown={(event) => {
                          galleryPointerStartRef.current = {
                            x: event.clientX,
                            y: event.clientY,
                          };
                        }}
                        onClick={(event) => {
                          const start = galleryPointerStartRef.current;
                          const moveDistance = start
                            ? Math.abs(event.clientX - start.x) +
                              Math.abs(event.clientY - start.y)
                            : 0;

                          if (moveDistance <= 8) {
                            setPreviewIndex(itemIndex);
                          }
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setPreviewIndex(itemIndex);
                          }
                        }}
                      >
                        <Media
                          src={item.image || GALLERY_FALLBACK_IMAGE}
                          alt={item.title}
                          className="aspect-square bg-neutral-900"
                        />
                      </article>
                    );
                  },
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
      {!!previewItem && previewIndex !== null && (
        <div
          className="fixed inset-0 z-z-index-popup flex items-center justify-center bg-black/80 px-6 py-6"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label={previewItem.title}
        >
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <MarketingIconButton
              icon="chevron-left"
              aria-label="previous image"
              size="lg"
              variant="overlay"
              className="absolute left-6 top-1/2 h-14 w-14 -translate-y-1/2 bg-brand-pink phone:h-12 phone:w-12"
              onClick={showPreviewPrevious}
            />
            <Image
              src={previewItem.image || GALLERY_FALLBACK_IMAGE}
              alt={previewItem.title}
              fill
              sizes="100vw"
              draggable={false}
              className="select-none object-contain"
            />
            <MarketingIconButton
              icon="chevron-right"
              aria-label="next image"
              size="lg"
              variant="overlay"
              className="absolute right-6 top-1/2 h-14 w-14 -translate-y-1/2 bg-brand-pink phone:h-12 phone:w-12"
              onClick={showPreviewNext}
            />
            <MarketingIconButton
              icon="close"
              aria-label="close preview"
              variant="overlay"
              className="absolute right-6 top-6 h-12 w-12 bg-black/60 phone:h-10 phone:w-10"
              onClick={closePreview}
            />
            <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-6 py-2 text-brand-caption font-bold text-white">
              {previewIndex + 1}/{GALLERY_ITEMS.length}
            </div>
          </div>
        </div>
      )}
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
      <section className="pb-[4.5rem] pt-[2.875rem] phone:pb-[3.25rem] phone:pt-[2.125rem]">
        <div className={CONTAINER_CLASS}>
          <h1 className="mb-11 mt-0 whitespace-pre-line text-center font-UTMAVo text-marketing-section-lg font-normal uppercase text-brand-pink phone:mb-[1.875rem] phone:whitespace-normal phone:text-brand-card-title">
            Form đăng ký tư vấn dịch vụ của Fun Studio
          </h1>
          <form
            noValidate
            className="mx-auto w-register-form rounded-lg border border-brand-control bg-white px-6 pb-[4.375rem] pt-[3.125rem] shadow-brand-hairline phone:px-4 phone:pb-[1.5625rem]"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-[2.8125rem] mt-0 border-b border-brand-control pb-[1.5625rem] text-lg font-extrabold uppercase leading-snug text-brand-pink phone:text-base">
              Form thông tin tư vấn nhượng quyền:
            </h2>
            <div className="grid gap-[1.875rem]">
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
                <p className="mb-[0.3125rem] mt-0 text-base leading-snug text-brand-placeholder phone:text-brand-caption">
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
                <p className="mb-[0.3125rem] mt-0 text-base leading-snug text-brand-placeholder phone:text-brand-caption">
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
                  className={cx(FORM_INPUT_CLASS, 'resize-y py-[2.1875rem]')}
                  placeholder="Ghi chú thêm (nếu có):"
                />
              </div>
            </div>
            <div className="mt-[4.375rem] flex flex-wrap items-center gap-x-[1.125rem] gap-y-[1.875rem] text-brand-caption text-brand-placeholder">
              <button
                type="submit"
                className="inline-flex min-h-[3.625rem] items-center justify-center rounded border border-brand-control-dark bg-brand-muted px-[1.125rem] text-base font-extrabold text-brand-text transition-colors hover:bg-brand-pink hover:text-white"
              >
                Gửi đi
              </button>
              <a
                href={MARKETING_CONTACT.phoneHref}
                className="text-brand-placeholder no-underline"
              >
                Hotline tư vấn: {MARKETING_CONTACT.phone}
              </a>
              <span className="hidden h-[1.125rem] w-px bg-brand-line md:inline-block" />
              <a
                href="mailto:Sales@funstudio.com.vn"
                className="text-brand-placeholder no-underline"
              >
                Sales@funstudio.com.vn
              </a>
            </div>
            {formMessage && (
              <p
                className="mb-0 mt-[2.1875rem] text-brand-caption font-medium text-brand-pink"
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
