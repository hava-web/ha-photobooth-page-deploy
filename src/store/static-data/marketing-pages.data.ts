import { StaticImageData } from 'next/image';
import type { AssetIconName } from 'assets/icons/AssetIcons';
import growIcon from 'assets/icons/grow.png';
import handIcon from 'assets/icons/hand.png';

import headerLogoImage from 'assets/images/brand/header-logo.png';
import footerLogoImage from 'assets/images/brand/footer-logo.png';

import banner1Image from 'assets/images/banner-images/banner_1.webp';
import banner10Image from 'assets/images/banner-images/banner_10.webp';

import congluanImage from 'assets/images/home/bao_cong_luan.webp';
import congluanLogoImage from 'assets/images/home/congluan_logo.png';
import cafebizImage from 'assets/images/home/bao_cafebiz.webp';
import cafebizLogoImage from 'assets/images/home/cafebiz.webp';
import kenh14Image from 'assets/images/home/bao_kenh14.webp';
import kenh14LogoImage from 'assets/images/home/kenh14_logo.png';
import vnexpressImage from 'assets/images/home/bao_vnexpress.webp';
import vnexpressLogoImage from 'assets/images/home/vnexpress_logo.png';
import homeAboutCinemaImage from 'assets/images/home/home-about-cinema.jpg';
import homeAboutBoothRoomImage from 'assets/images/home/home-about-booth-room.jpg';
import radioImage from 'assets/images/home/radio_4_teen.webp';
import vtvLogoImage from 'assets/images/home/vtv1_logo.png';
import vtv24Image from 'assets/images/home/vtv24.webp';

import franchiseStartSubwayImage from 'assets/images/franchise/franchise-start-subway.jpg';
import franchiseStartChristmasImage from 'assets/images/franchise/franchise-start-christmas.jpg';
import franchiseStartTrainImage from 'assets/images/franchise/franchise-start-train.jpg';
import franchiseDifferenceTrainRoomImage from 'assets/images/franchise/franchise-difference-train-room.jpg';
import franchiseDifferenceCinemaImage from 'assets/images/franchise/franchise-difference-cinema.jpg';
import franchiseDifferenceDinerImage from 'assets/images/franchise/franchise-difference-diner.jpg';
import franchiseDifferenceRedBoothImage from 'assets/images/franchise/franchise-difference-red-booth.jpg';

import serviceWeddingBoothImage from 'assets/images/service/service-wedding-booth.jpg';
import serviceMachineSuperStarImage from 'assets/images/service/service-machine-super-star.jpg';
import serviceMachineDoubleEffectiveImage from 'assets/images/service/service-machine-double-effective.jpg';
import serviceMachineMultipleEffectiveImage from 'assets/images/service/service-machine-multiple-effective.jpg';
import serviceMachineSuperFlexImage from 'assets/images/service/service-machine-super-flex.jpg';
import serviceMachineSuperHighImage from 'assets/images/service/service-machine-super-high.jpg';
import serviceMachineSuperCompactImage from 'assets/images/service/service-machine-super-compact.jpg';
import serviceMachineStyleinmoveImage from 'assets/images/service/service-machine-styleinmove.jpg';
import serviceMachineRedVelvetImage from 'assets/images/service/service-machine-red-velvet.jpg';
import serviceInstorePhotoTrayImage from 'assets/images/service/service-instore-photo-tray.jpg';
import serviceInstoreGingerbreadImage from 'assets/images/service/service-instore-gingerbread.jpg';
import serviceInstoreTrainPhotoImage from 'assets/images/service/service-instore-train-photo.jpg';
import serviceInstoreCurtainStoreImage from 'assets/images/service/service-instore-curtain-store.jpg';
import serviceInstoreKioskHallImage from 'assets/images/service/service-instore-kiosk-hall.jpg';
import serviceInstorePhotoboothEntryImage from 'assets/images/service/service-instore-photobooth-entry.jpg';
import serviceKioskBlackImage from 'assets/images/service/service-kiosk-black.jpg';
import serviceKioskLedImage from 'assets/images/service/service-kiosk-led.jpg';
import serviceKioskPurpleImage from 'assets/images/service/service-kiosk-purple.jpg';
import serviceConceptTrainRoomImage from 'assets/images/service/service-concept-train-room.jpg';
import serviceConceptGroupHatsImage from 'assets/images/service/service-concept-group-hats.jpg';
import serviceConceptPartyImage from 'assets/images/service/service-concept-party.jpg';
import serviceProductSubwayGirlImage from 'assets/images/service/service-product-subway-girl.jpg';
import serviceProductHandPhotosImage from 'assets/images/service/service-product-hand-photos.jpg';
import serviceProductPhotoCardsImage from 'assets/images/service/service-product-photo-cards.jpg';
import serviceProductBoardGirlImage from 'assets/images/service/service-product-board-girl.jpg';
import serviceProductBluePrintsGirlImage from 'assets/images/service/service-product-blue-prints-girl.jpg';
import serviceProductStoreStripsGirlImage from 'assets/images/service/service-product-store-strips-girl.jpg';
import serviceRentalWeddingGroupImage from 'assets/images/service/service-rental-wedding-group.jpg';
import serviceRentalWeddingPrintsImage from 'assets/images/service/service-rental-wedding-prints.jpg';
import serviceRentalIdpEventImage from 'assets/images/service/service-rental-idp-event.jpg';
import serviceRentalDianaEventImage from 'assets/images/service/service-rental-diana-event.jpg';
import serviceRentalIdolGroupImage from 'assets/images/service/service-rental-idol-group.jpg';
import serviceRentalIdolTwoGirlsImage from 'assets/images/service/service-rental-idol-two-girls.jpg';
import serviceRentalIdolBlueEventImage from 'assets/images/service/service-rental-idol-blue-event.jpg';

import customerLogo01Image from 'assets/images/customer-logo/customer-logo-01.webp';
import customerLogo02Image from 'assets/images/customer-logo/customer-logo-02.webp';
import customerLogo03Image from 'assets/images/customer-logo/customer-logo-03.webp';
import customerLogo04Image from 'assets/images/customer-logo/customer-logo-04.webp';
import customerLogo05Image from 'assets/images/customer-logo/customer-logo-05.webp';
import customerLogo06Image from 'assets/images/customer-logo/customer-logo-06.webp';
import customerLogo07Image from 'assets/images/customer-logo/customer-logo-07.webp';
import customerLogo08Image from 'assets/images/customer-logo/customer-logo-08.webp';
import customerLogo09Image from 'assets/images/customer-logo/customer-logo-09.webp';
import customerLogo10Image from 'assets/images/customer-logo/customer-logo-10.webp';
import customerLogo11Image from 'assets/images/customer-logo/customer-logo-11.webp';
import customerLogo12Image from 'assets/images/customer-logo/customer-logo-12.webp';
import customerLogo13Image from 'assets/images/customer-logo/customer-logo-13.webp';
import customerLogo14Image from 'assets/images/customer-logo/customer-logo-14.webp';
import customerLogo15Image from 'assets/images/customer-logo/customer-logo-15.webp';
import customerLogo16Image from 'assets/images/customer-logo/customer-logo-16.webp';
import customerLogo17Image from 'assets/images/customer-logo/customer-logo-17.webp';
import customerLogo18Image from 'assets/images/customer-logo/customer-logo-18.webp';
import customerLogo19Image from 'assets/images/customer-logo/customer-logo-19.webp';
import customerLogo20Image from 'assets/images/customer-logo/customer-logo-20.webp';
import customerLogo21Image from 'assets/images/customer-logo/customer-logo-21.webp';
import customerLogo22Image from 'assets/images/customer-logo/customer-logo-22.webp';
import customerLogo23Image from 'assets/images/customer-logo/customer-logo-23.webp';
import customerLogo24Image from 'assets/images/customer-logo/customer-logo-24.webp';
import customerLogo25Image from 'assets/images/customer-logo/customer-logo-25.webp';
import customerLogo26Image from 'assets/images/customer-logo/customer-logo-26.webp';
import customerLogo27Image from 'assets/images/customer-logo/customer-logo-27.webp';
import customerLogo28Image from 'assets/images/customer-logo/customer-logo-28.webp';
import customerLogo29Image from 'assets/images/customer-logo/customer-logo-29.webp';
import customerLogo30Image from 'assets/images/customer-logo/customer-logo-30.webp';
import customerLogo31Image from 'assets/images/customer-logo/customer-logo-31.webp';
import customerLogo32Image from 'assets/images/customer-logo/customer-logo-32.webp';
import customerLogo33Image from 'assets/images/customer-logo/customer-logo-33.webp';
import customerLogo34Image from 'assets/images/customer-logo/customer-logo-34.webp';
import customerLogo35Image from 'assets/images/customer-logo/customer-logo-35.webp';

import funNguyenTuanImage from 'assets/images/stores/fun_nguyen_tuan.webp';
import funHaiDuongImage from 'assets/images/stores/fun_hai_duong.webp';
import funVietTriImage from 'assets/images/stores/fun_viet_tri.webp';
import funHueImage from 'assets/images/stores/fun_hue.webp';
import funCamLeImage from 'assets/images/stores/fun_cam_le_da_nang.webp';
import funThuDucImage from 'assets/images/stores/fun_thu_duc_hcm.webp';
import funBienHoaImage from 'assets/images/stores/bien_hoa_dong_nai.webp';
import funCanGiuocImage from 'assets/images/stores/fun_can_giuoc_long_an.webp';
import { SALE_PHONE_NUMBER } from 'constants/common.const';

export type MarketingImage = StaticImageData | string;
export type FooterIconName =
  | 'AddressIcon'
  | 'PhoneIcon'
  | 'EmailIcon'
  | 'FacebookIcon'
  | 'InstagramIcon'
  | 'TiktokIcon'
  | 'YoutubeIcon';
export type FooterContactRow = {
  icon: FooterIconName;
  text: string;
  href?: string;
};

export const MARKETING_HEADER_LOGO = headerLogoImage;
export const MARKETING_FOOTER_LOGO = footerLogoImage;
export const MARKETING_LOGO = MARKETING_HEADER_LOGO;

export const MARKETING_NAV_LINKS = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/nhuong-quyen', label: 'Nhượng Quyền' },
  { href: '/dich-vu', label: 'Dịch Vụ' },
  { href: '/cua-hang', label: 'Cửa Hàng' },
  { href: '/tin-tuc', label: 'Tin Tức' },
  { href: '/gallery', label: 'Gallery' },
];

export const MARKETING_CONTACT = {
  phoneLabel: 'Hotline: 0975 338 244',
  phoneHref: `tel:${SALE_PHONE_NUMBER}`,
  ctaLabel: 'Đăng ký nhượng quyền',
  ctaHref: '/dang-ky-nhuong-quyen',
  company: 'Công ty TNHH Công nghệ Kết Nối Ý Nghĩa',
  address: 'Số 75 ngõ 381 Nguyễn Khang, P. Cầu Giấy, Hà Nội',
  phone: '0975 338 244',
  email: 'Sales@funstudio.com.vn/ marketing@funstudio.vn',
  facebook:
    'Fun Studio Thương Mại: https://www.facebook.com/funatfunstudio  |  Fun Studio Nhượng Quyền: https://www.facebook.com/funstudionq',
  instagram: 'funstudio____',
  tiktok: 'funstudio_',
  youtube: 'funstudio_68',
};

export const FOOTER_CONTACT_ROWS: FooterContactRow[] = [
  { icon: 'AddressIcon', text: MARKETING_CONTACT.address },
  {
    icon: 'PhoneIcon',
    text: MARKETING_CONTACT.phone,
    href: `tel:${SALE_PHONE_NUMBER}`,
  },
  {
    icon: 'EmailIcon',
    text: MARKETING_CONTACT.email,
    href: 'mailto:Sales@funstudio.com.vn,marketing@funstudio.vn',
  },
  {
    icon: 'FacebookIcon',
    text: MARKETING_CONTACT.facebook,
    href:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      'https://www.facebook.com/funatfunstudio',
  },
  {
    icon: 'InstagramIcon',
    text: MARKETING_CONTACT.instagram,
    href:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      'https://www.instagram.com/funstudio____',
  },
  {
    icon: 'TiktokIcon',
    text: MARKETING_CONTACT.tiktok,
    href:
      process.env.NEXT_PUBLIC_TIKTOK_URL ||
      'https://www.tiktok.com/@funstudio_',
  },
  {
    icon: 'YoutubeIcon',
    text: MARKETING_CONTACT.youtube,
    href: 'https://www.youtube.com/@funstudio_68',
  },
];

export const HOME_HERO_SLIDES = [
  {
    image: '/images/generated/home-hero.jpg',
    title: 'Chi phí vận hành thấp,\ntự động hóa cao, sử dụng ít nhân sự',
  },
  {
    image: banner10Image,
    title: 'Thu hồi vốn nhanh chóng\n6-8 tháng',
  },
  {
    image: banner1Image,
    title: 'Mô hình chụp ảnh tự động,\nphong cách Hàn Quốc',
  },
];

export const HOME_VIDEO = {
  image: '/images/generated/home-video-preview.jpg',
  title: 'Tìm hiểu về mô hình photobooth\nphong cách Hàn Quốc',
};

export const ABOUT_COPY = [
  'Thành lập từ năm 2023, Fun Studio là thương hiệu photobooth tự chụp phong cách Hàn Quốc với sứ mệnh mang đến trải nghiệm chụp ảnh hiện đại, sáng tạo và dễ tiếp cận cho khách hàng Việt Nam.',
  'Sở hữu hệ thống photobooth được phát triển hoàn toàn bởi người Việt, chúng tôi không ngừng nâng cấp công nghệ, sản phẩm và dịch vụ để đáp ứng nhu cầu ngày càng đa dạng của thị trường.',
  'Với hơn 80 cửa hàng trên toàn quốc, Fun Studio tiên phong đưa mô hình photobooth trở thành một phần trong đời sống giới trẻ khi liên tục ra mắt những concept sáng tạo nhằm nâng tầm trải nghiệm người dùng.',
  'Bên cạnh đó, chúng tôi cũng là đối tác đáng tin cậy của các thương hiệu lớn như Diana, MB Bank, FPT, Esoft..., trong việc triển khai giải pháp photobooth cho các sự kiện và chiến dịch truyền thông.',
  'Với đội ngũ trẻ trung, năng động và sáng tạo, Fun Studio đặt mục tiêu giữ vững vị trí dẫn đầu tại Việt Nam và khu vực, luôn đồng hành cùng khách hàng và đối tác trên hành trình phát triển bền vững.',
];

export const ABOUT_IMAGES = [homeAboutCinemaImage, homeAboutBoothRoomImage];

export const DEVELOPMENT_TIMELINE = [
  ['07.2023', 'Khai trương cửa hàng đầu tiên tại Hà Nội'],
  ['12.2023', 'Khai trương cửa hàng nhượng quyền đầu tiên'],
  ['05.2024', 'Mở rộng ra thị trường miền Trung'],
  ['08.2024', 'Mở rộng ra thị trường miền Nam'],
  ['11.2024', 'Ra mắt thương hiệu Deluxe by Fun'],
  ['05.2025', 'Đạt cột mốc 50 cửa hàng trên toàn quốc'],
  ['08.2025', 'Mở cửa hàng thứ 61'],
  ['2026', 'Mở cửa hàng thứ 80'],
];

export const CUSTOMER_LOGOS = [
  { name: 'DOJI', image: customerLogo11Image },
  { name: 'Diana', image: customerLogo01Image },
  { name: 'FPT', image: customerLogo03Image },
  { name: 'NTT e-MOI', image: customerLogo04Image },
  { name: 'Xiaomi', image: customerLogo32Image },
  { name: 'MSB', image: customerLogo12Image },
  { name: 'MB', image: customerLogo23Image },
  { name: 'DNSE', image: customerLogo13Image },
  { name: 'Woori Bank', image: customerLogo30Image },
  { name: 'EY', image: customerLogo26Image },
  { name: 'Almaz', image: customerLogo05Image },
  { name: 'L7 Hotels', image: customerLogo27Image },
  { name: 'IDP', image: customerLogo25Image },
  { name: 'Forevermark', image: customerLogo24Image },
  { name: 'JW Marriott', image: customerLogo07Image },
  { name: 'Cowell', image: customerLogo33Image },
  { name: 'Upbase', image: customerLogo28Image },
  { name: 'QEG Stadium', image: customerLogo35Image },
  { name: 'Facolos', image: customerLogo06Image },
  { name: 'SOTA Tek', image: customerLogo15Image },
  { name: 'BUV', image: customerLogo14Image },
  { name: 'Trường Đại học Ngoại thương', image: customerLogo17Image },
  { name: 'Vinschool', image: customerLogo16Image },
  { name: 'HUST', image: customerLogo18Image },
  { name: 'Đại học Kinh tế Quốc dân', image: customerLogo29Image },
  { name: 'SmartOSC', image: customerLogo09Image },
  { name: 'Bemori', image: customerLogo34Image },
  { name: 'RUTOP', image: customerLogo08Image },
  { name: 'MATHPRESSO', image: customerLogo19Image },
  { name: 'Bệnh viện Phụ sản Hà Nội', image: customerLogo20Image },
  { name: 'Agribank', image: customerLogo21Image },
  { name: 'Liên Quân', image: customerLogo22Image },
  { name: 'Casper', image: customerLogo10Image },
  { name: 'Nike', image: customerLogo02Image },
  { name: 'Piaggio Vietnam Co., Ltd', image: customerLogo31Image },
];

export const FRANCHISE_TOP_IMAGES = [
  franchiseStartSubwayImage,
  franchiseStartChristmasImage,
  franchiseStartTrainImage,
];

export const DIFFERENCE_IMAGES = [
  franchiseDifferenceTrainRoomImage,
  franchiseDifferenceCinemaImage,
  franchiseDifferenceDinerImage,
  franchiseDifferenceRedBoothImage,
];

export const FRANCHISE_REASONS: { icon: AssetIconName; text: string }[] = [
  {
    icon: 'GentlemanIcon',
    text: 'Mô hình đầu tư linh hoạt, chi phí hợp lý, phù hợp cho cả nhà đầu tư mới và người trẻ muốn khởi nghiệp.',
  },
  {
    icon: 'DollarIcon',
    text: 'Hoàn vốn nhanh (6-8 tháng) nhờ lượng khách ổn định, tệp khách hàng trung thành và tỷ lệ quay lại cao.',
  },
  {
    icon: 'SettingIcon',
    text: 'Hệ thống quản lý doanh thu đơn giản và thông minh, giúp theo dõi hoạt động kinh doanh dễ dàng.',
  },
  {
    icon: 'PhotoSheetIcon',
    text: 'Sản phẩm được cập nhật liên tục với tính năng mới đa dạng, giúp thu hút khách hàng mới, giữ chân khách hàng cũ và bắt kịp xu hướng photobooth.',
  },
];

export const FREE_SERVICE_CARDS = [
  {
    title: 'Đầu tư',
    text: 'Chỉ với một khoản đầu tư ban đầu, đối tác đã có thể sở hữu mô hình photobooth hiện đại cùng hệ sinh thái vận hành đồng bộ từ Fun Studio.',
  },
  {
    title: 'Hỗ trợ',
    text: 'Hỗ trợ vận hành: setup cửa hàng, cài đặt phần mềm và hướng dẫn quản lý ban đầu.\n\nHỗ trợ truyền thông: gợi ý chương trình khai trương, giúp cửa hàng nhanh chóng tiếp cận khách hàng.',
  },
  {
    title: 'Đồng hành',
    text: 'Đồng hành vận hành: hỗ trợ quy trình, phần mềm, doanh thu và xử lý tình huống.\n\nĐồng hành truyền thông: hỗ trợ nội dung, hình ảnh, layout và kế hoạch khai trương.\n\nĐồng hành phát triển: cập nhật sản phẩm, concept mới và tư vấn tối ưu dài hạn.',
  },
  {
    title: 'Đảm bảo',
    text: 'Đảm bảo phần mềm ổn định.\n\nĐảm bảo chất lượng máy móc.\n\nĐảm bảo quy trình vận hành đồng bộ.\n\nĐảm bảo hỗ trợ kỹ thuật khi cần.',
  },
  {
    title: 'Tối ưu',
    text: 'Tối ưu chi phí đầu tư.\n\nTối ưu diện tích vận hành.\n\nTối ưu doanh thu trên từng lượt chụp.\n\nTối ưu trải nghiệm khách hàng.\n\nTối ưu hiệu quả kinh doanh dài hạn.',
  },
  {
    title: '6 miễn phí',
    text: 'Thiết kế cửa hàng & nhận diện thương hiệu.\n\nCài đặt và hướng dẫn vận hành phần mềm.\n\nĐào tạo, chuyển giao quy trình vận hành.\n\nHỗ trợ truyền thông khai trương.\n\nCập nhật layout & sản phẩm mới hằng tháng.\n\nHỗ trợ kỹ thuật trọn đời.',
  },
];

export const PRODUCT_MACHINES = [
  {
    image: serviceWeddingBoothImage,
    title: 'Fun Extra Premium (EP)',
    text: 'Dòng máy cao cấp cho sự kiện, trung tâm thương mại và những điểm bán cần trải nghiệm nổi bật.',
  },
  {
    image: serviceMachineSuperStarImage,
    title: 'Fun Super Star (SS)',
    text: 'Dòng máy tiêu chuẩn, nhỏ gọn, hiện đại, phù hợp cho quán cà phê, studio, cửa hàng hoặc mô hình kinh doanh tự động.',
  },
  {
    image: serviceMachineDoubleEffectiveImage,
    title: 'Fun Double Effective (DE)',
    text: 'Phiên bản chụp kép với hai không gian vận hành độc lập, giúp phục vụ song song và tối ưu doanh thu.',
  },
  {
    image: serviceMachineMultipleEffectiveImage,
    title: 'Fun Multiple Effective (ME)',
    text: 'Dòng máy nhiều góc chụp, tạo trải nghiệm mới lạ cho khách hàng và tăng khả năng quay lại.',
  },
  {
    image: serviceMachineSuperFlexImage,
    title: 'Fun Super Flex (SF)',
    text: 'Thiết kế tinh gọn, phù hợp các mặt bằng nhỏ nhưng vẫn giữ trải nghiệm chụp ảnh đầy đủ.',
  },
  {
    image: serviceMachineSuperHighImage,
    title: 'Fun Super High (SH)',
    text: 'Thiết kế góc cao, phù hợp với không gian cần hiệu ứng ảnh nổi bật và khác biệt.',
  },
  {
    image: serviceMachineSuperCompactImage,
    title: 'Super Compact',
    text: 'Giải pháp kiosk linh hoạt cho sự kiện, thương mại và các mô hình vận hành ngắn hạn.',
  },
  {
    image: serviceMachineStyleinmoveImage,
    title: 'StyleInMove',
    text: 'Không gian chụp ảnh linh hoạt cho cửa hàng, sự kiện và điểm trải nghiệm thương hiệu.',
  },
  {
    image: serviceMachineRedVelvetImage,
    title: 'Red Velvet',
    text: 'Concept nổi bật với màu sắc đặc trưng, phù hợp các chiến dịch cần hiệu ứng thị giác mạnh.',
  },
];

export const BUSINESS_FIT_CARDS: { icon: AssetIconName; text: string }[] = [
  {
    icon: 'GentlemanIcon',
    text: 'Người đang muốn có thêm nguồn thu nhập với mô hình kinh doanh tự động, vận hành tinh gọn.',
  },
  {
    icon: 'WhiteStoreIcon',
    text: 'Có sẵn mặt bằng, không gian để kết hợp Photobooth thu hút khách và gia tăng lợi nhuận.',
  },
  {
    icon: 'DollarIcon',
    text: 'Cá nhân khởi nghiệp tìm kiếm mô hình lợi nhuận cao, với chi phí đầu tư phù hợp với ngân sách nhỏ.',
  },
];

export const SERVICE_MODELS = [
  {
    image: serviceInstoreCurtainStoreImage,
    title: 'Cửa hàng',
    text: 'PhotoBooth tạo điểm nhấn trong cửa hàng giúp khách hàng ghi lại kỷ niệm sau khi mua sắm.',
  },
  {
    image: serviceInstoreGingerbreadImage,
    title: 'Quán cà phê',
    text: 'Quán cà phê có thể tăng tương tác với khách hàng bằng PhotoBooth, mang đến trải nghiệm thú vị khi chụp ảnh thư giãn.',
  },
];

export const SERVICE_IN_STORE_IMAGES = [
  serviceInstorePhotoTrayImage,
  serviceInstoreGingerbreadImage,
  serviceInstoreTrainPhotoImage,
  serviceInstoreCurtainStoreImage,
  serviceInstoreKioskHallImage,
  serviceInstorePhotoboothEntryImage,
];

export const SERVICE_KIOSK_IMAGES = [
  serviceKioskBlackImage,
  serviceKioskLedImage,
  serviceKioskPurpleImage,
];

export const SERVICE_OTHER_PRODUCTS = [
  { image: serviceProductSubwayGirlImage, title: 'Ảnh 2x6' },
  { image: serviceProductHandPhotosImage, title: 'Ảnh 4x6' },
  { image: serviceProductPhotoCardsImage, title: 'Card bo góc' },
  { image: serviceProductBoardGirlImage, title: 'Ảnh 30x20cm' },
  { image: serviceProductBluePrintsGirlImage, title: 'Ảnh 20x10cm' },
  {
    image: serviceProductStoreStripsGirlImage,
    title: 'Ảnh siêu to 15 x 50cm',
  },
  { image: serviceProductBoardGirlImage, title: 'Ảnh khổng lồ 20 x 80cm' },
];

export const SERVICE_RENTAL_IDOL_IMAGES = [
  serviceRentalIdolGroupImage,
  serviceRentalIdolTwoGirlsImage,
  serviceRentalIdolBlueEventImage,
];

export const RENTAL_SECTIONS = [
  {
    title: 'Thuê máy phục vụ tiệc cưới',
    intro:
      'Đám cưới không chỉ là ngày trọng đại của cô dâu chú rể, mà còn là nơi chứa đầy những nụ cười, lời chúc và kỷ niệm khó quên. Với dịch vụ thuê Photobooth nhà Fun Studio, mỗi vị khách đều có thể mang về một bức ảnh in liền tay - món quà kỷ niệm tinh tế và ý nghĩa nhất trong ngày vui.',
    images: [
      serviceWeddingBoothImage,
      serviceRentalWeddingGroupImage,
      serviceRentalWeddingPrintsImage,
    ],
    cards: [
      {
        image: serviceRentalIdpEventImage,
        title: 'Độc đáo',
        text: 'Mang tới góc chụp vui vẻ cho khách mời và tạo album kỷ niệm ngay trong sự kiện.',
      },
      {
        image: serviceRentalDianaEventImage,
        title: 'Khoảnh khắc mới',
        text: 'Khách mời có thể nhận ảnh lấy liền, chia sẻ nhanh và lưu giữ dấu ấn tiệc cưới.',
      },
    ],
  },
  {
    title: 'Dịch vụ thuê máy sự kiện doanh nghiệp',
    intro:
      'Photobooth giúp sự kiện thương hiệu trở nên sinh động hơn, tạo điểm check-in và tăng tương tác với khách tham dự.',
    images: [
      serviceRentalIdolGroupImage,
      serviceRentalIdolTwoGirlsImage,
      serviceRentalIdolBlueEventImage,
    ],
    cards: [
      {
        image: serviceRentalIdpEventImage,
        title: 'Phục vụ sự kiện, tiệc / teambuilding công ty',
        text: 'Sự kiện idol không chỉ là nơi gặp gỡ, giao lưu mà còn là dịp để mỗi fan lưu giữ cảm xúc đặc biệt bên cạnh cộng đồng của mình. Với dịch vụ thuê Photobooth nhà Fun Studio, bạn có thể biến không gian sự kiện trở nên rực rỡ - sôi động - đậm chất fandom, nơi mọi khoảnh khắc đều được lưu lại thật trọn vẹn.',
      },
      {
        image: serviceRentalDianaEventImage,
        title: 'Phục vụ sự kiện brading/ ra mắt sản phẩm',
        text: 'Trong mỗi sự kiện ra mắt sản phẩm hay chiến dịch branding, ấn tượng đầu tiên với khách hàng chính là chìa khóa tạo nên thành công. Với dịch vụ thuê Photobooth nhà Fun Studio, doanh nghiệp có thể mang đến trải nghiệm tương tác thú vị, đồng thời khuếch đại hình ảnh thương hiệu một cách tinh tế và tự nhiên nhất.',
      },
    ],
  },
];

export const STORE_MAP_IMAGE = '/images/generated/store-map.jpg';

export const STORE_REGIONS = [
  {
    name: 'Miền Bắc',
    provinces: [
      'Hà Nội',
      'Hải Phòng',
      'Phú Thọ',
      'Bắc Ninh',
      'Hưng Yên',
      'Hải Dương',
    ],
    stores: [
      { province: 'Hà Nội', count: 9, image: funNguyenTuanImage },
      { province: 'Hải Phòng', count: 3, image: funHaiDuongImage },
      { province: 'Phú Thọ', count: 2, image: funVietTriImage },
    ],
  },
  {
    name: 'Miền Trung',
    provinces: [
      'Thanh Hóa',
      'Nghệ An',
      'Hà Tĩnh',
      'Huế',
      'Đà Nẵng',
      'Lâm Đồng',
    ],
    stores: [
      { province: 'Đà Nẵng', count: 2, image: funCamLeImage },
      { province: 'Huế', count: 1, image: funHueImage },
      { province: 'Lâm Đồng', count: 2, image: funHueImage },
    ],
  },
  {
    name: 'Miền Nam',
    provinces: [
      'TP Hồ Chí Minh',
      'Đồng Nai',
      'Tây Ninh',
      'An Giang',
      'Cần Thơ',
    ],
    stores: [
      { province: 'TP Hồ Chí Minh', count: 8, image: funThuDucImage },
      { province: 'Đồng Nai', count: 2, image: funBienHoaImage },
      { province: 'Long An', count: 1, image: funCanGiuocImage },
    ],
  },
];

export const GALLERY_FALLBACK_IMAGE = '/images/generated/gallery-card-docs.jpg';

export const GALLERY_ITEMS = Array.from({ length: 108 }, (_, index) => ({
  id: `gallery-${index + 1}`,
  image: GALLERY_FALLBACK_IMAGE,
  title: 'Minh Anh & Thảo Lê Wedding',
  meta: '89 ảnh và 17 video - 9 lượt xem',
}));

export const PRESS_ITEMS = [
  { image: congluanImage, logo: congluanLogoImage, title: 'Công Luận' },
  { image: cafebizImage, logo: cafebizLogoImage, title: 'CafeBiz' },
  { image: kenh14Image, logo: kenh14LogoImage, title: 'Kênh14' },
  { image: vnexpressImage, logo: vnexpressLogoImage, title: 'VnExpress' },
  { image: radioImage, title: 'Radio 4 Teen' },
  { image: vtv24Image, logo: vtvLogoImage, title: 'VTV24' },
];

export const SERVICE_GALLERY_IMAGES = [
  serviceConceptTrainRoomImage,
  serviceConceptGroupHatsImage,
  serviceConceptPartyImage,
];

export const SIMPLE_ICONS = {
  grow: growIcon,
  hand: handIcon,
};
