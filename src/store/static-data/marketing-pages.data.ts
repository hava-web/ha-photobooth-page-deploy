import { StaticImageData } from 'next/image';
import logoIcon from 'assets/icons/logo.png';
import budgetIcon from 'assets/icons/budget.png';
import growIcon from 'assets/icons/grow.png';
import growUpIcon from 'assets/icons/grow_up.png';
import handIcon from 'assets/icons/hand.png';
import homeSearchIcon from 'assets/icons/home_search.png';
import moneyIcon from 'assets/icons/money.png';
import presentationIcon from 'assets/icons/presentation.png';
import settingIcon from 'assets/icons/setting_2.png';
import storeIcon from 'assets/icons/store.png';
import squareEmailIcon from 'assets/icons/square_email.png';
import squareFacebookIcon from 'assets/icons/square_facebook.png';
import squareInstagramIcon from 'assets/icons/square_instagram.png';
import squareLocationIcon from 'assets/icons/square_location.png';
import squarePhoneIcon from 'assets/icons/square_phone.png';
import squareTiktokIcon from 'assets/icons/square_tiktok.png';

import banner1Image from 'assets/images/banner-images/banner_1.webp';
import banner2Image from 'assets/images/banner-images/banner_2.webp';
import banner10Image from 'assets/images/banner-images/banner_10.webp';
import allStoreImage from 'assets/images/banner-images/all-store-in-vn.webp';
import event2026Image from 'assets/images/banner-images/event-2026.webp';

import boothDeImage from 'assets/images/fun-products/booth-de.webp';
import boothDshImage from 'assets/images/fun-products/booth-dsh.webp';
import boothKiotImage from 'assets/images/fun-products/booth-kiot-go.webp';
import boothMeImage from 'assets/images/fun-products/booth-me.webp';
import boothSfImage from 'assets/images/fun-products/booth-sf.webp';
import boothSsImage from 'assets/images/fun-products/booth-ss.webp';

import congluanImage from 'assets/images/home/bao_cong_luan.webp';
import congluanLogoImage from 'assets/images/home/congluan_logo.png';
import cafebizImage from 'assets/images/home/bao_cafebiz.webp';
import cafebizLogoImage from 'assets/images/home/cafebiz.webp';
import kenh14Image from 'assets/images/home/bao_kenh14.webp';
import kenh14LogoImage from 'assets/images/home/kenh14_logo.png';
import vnexpressImage from 'assets/images/home/bao_vnexpress.webp';
import vnexpressLogoImage from 'assets/images/home/vnexpress_logo.png';
import dianaEventImage from 'assets/images/home/diana_facebook_event.webp';
import lienQuanImage from 'assets/images/home/lien_quan_cover_image.webp';
import lienQuanLogoImage from 'assets/images/home/lien_quan.webp';
import nuiTrucImage from 'assets/images/home/nui_truc2.webp';
import radioImage from 'assets/images/home/radio_4_teen.webp';
import services1Image from 'assets/images/home/services_1.webp';
import services2Image from 'assets/images/home/services_2.webp';
import services3Image from 'assets/images/home/services_3.webp';
import vcfCoverImage from 'assets/images/home/vcf_fun_studio_cover.webp';
import vcfLogoImage from 'assets/images/home/vcf_logo.webp';
import vtvLogoImage from 'assets/images/home/vtv1_logo.png';
import vtv24Image from 'assets/images/home/vtv24.webp';
import nhuongQuyen1Image from 'assets/images/home/nhuong_quyen_1.webp';
import nhuongQuyen2Image from 'assets/images/home/nhuong_quyen_2.webp';
import nhuongQuyen3Image from 'assets/images/home/nhuong_quyen_3.webp';

import event1Image from 'assets/images/events/event_1.webp';
import event2Image from 'assets/images/events/event_2.webp';
import event3Image from 'assets/images/events/event_3.webp';
import event4Image from 'assets/images/events/event_4.webp';
import event5Image from 'assets/images/events/event_5.webp';
import event6Image from 'assets/images/events/event_6.webp';
import event7Image from 'assets/images/events/event_7.webp';
import event8Image from 'assets/images/events/event_8.webp';

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
export type FooterContactRow = {
  icon: MarketingImage;
  text: string;
  href?: string;
};

export const MARKETING_LOGO = logoIcon;

export const MARKETING_NAV_LINKS = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/nhuong-quyen', label: 'Nhượng Quyền' },
  { href: '/dich-vu', label: 'Dịch Vụ' },
  { href: '/cua-hang', label: 'Cửa Hàng' },
  { href: '/tin-tuc', label: 'Tin Tức' },
  { href: '/gallery', label: 'Gallery' },
];

export const MARKETING_CONTACT = {
  phoneLabel: 'Hotline: 012345678',
  phoneHref: 'tel:012345678',
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
  { icon: squareLocationIcon, text: MARKETING_CONTACT.address },
  {
    icon: squarePhoneIcon,
    text: MARKETING_CONTACT.phone,
    href: `tel:${SALE_PHONE_NUMBER}`,
  },
  {
    icon: squareEmailIcon,
    text: MARKETING_CONTACT.email,
    href: 'mailto:Sales@funstudio.com.vn,marketing@funstudio.vn',
  },
  {
    icon: squareFacebookIcon,
    text: MARKETING_CONTACT.facebook,
    href:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      'https://www.facebook.com/funatfunstudio',
  },
  {
    icon: squareInstagramIcon,
    text: MARKETING_CONTACT.instagram,
    href:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      'https://www.instagram.com/funstudio____',
  },
  {
    icon: squareTiktokIcon,
    text: MARKETING_CONTACT.tiktok,
    href:
      process.env.NEXT_PUBLIC_TIKTOK_URL ||
      'https://www.tiktok.com/@funstudio_',
  },
  {
    icon: squareTiktokIcon,
    text: MARKETING_CONTACT.youtube,
    href: 'https://www.youtube.com/@funstudio_68',
  },
];

export const HOME_HERO_SLIDES = [
  {
    image: '/images/generated/home-hero.jpg',
    title: 'Chi phí vận hành thấp, tự động hóa cao, sử dụng ít nhân sự',
  },
  {
    image: banner10Image,
    title: 'Thu hồi vốn nhanh chóng 6-8 tháng',
  },
  {
    image: banner1Image,
    title: 'Mô hình chụp ảnh tự động, phong cách Hàn Quốc',
  },
];

export const HOME_VIDEO = {
  image: '/images/generated/home-video-preview.jpg',
  title: 'Tìm hiểu về mô hình photobooth phong cách Hàn Quốc',
};

export const ABOUT_COPY = [
  'Thành lập từ năm 2023, Fun Studio là thương hiệu photobooth tự chụp phong cách Hàn Quốc với sứ mệnh mang đến trải nghiệm chụp ảnh hiện đại, sáng tạo và dễ tiếp cận cho khách hàng Việt Nam.',
  'Sở hữu hệ thống photobooth được phát triển hoàn toàn bởi người Việt, chúng tôi không ngừng nâng cấp công nghệ, sản phẩm và dịch vụ để đáp ứng nhu cầu ngày càng đa dạng của thị trường.',
  'Với hơn 80 cửa hàng trên toàn quốc, Fun Studio tiên phong đưa mô hình photobooth trở thành một phần trong đời sống giới trẻ khi liên tục ra mắt những concept sáng tạo nhằm nâng tầm trải nghiệm người dùng.',
  'Bên cạnh đó, chúng tôi cũng là đối tác đáng tin cậy của các thương hiệu lớn trong việc triển khai giải pháp photobooth cho sự kiện và chiến dịch truyền thông.',
];

export const ABOUT_IMAGES = [nuiTrucImage, services2Image];

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
  { name: 'Diana' },
  { name: 'FPT' },
  { name: 'NTT e-MOI' },
  { name: 'Xiaomi' },
  { name: 'MSB' },
  { name: 'MB' },
  { name: 'World Bank' },
  { name: 'EY' },
  { name: 'Almaz' },
  { name: 'IDP' },
  { name: 'BUV' },
  { name: 'HUST' },
  { name: 'SmartOSC' },
  { name: 'Bemori' },
  { name: 'Agribank' },
  { name: 'Liên Quân', image: lienQuanLogoImage },
  { name: 'Casper' },
  { name: 'Nike' },
  { name: 'VTV1', image: vtvLogoImage },
  { name: 'CafeBiz', image: cafebizLogoImage },
  { name: 'Kênh14', image: kenh14LogoImage },
  { name: 'VnExpress', image: vnexpressLogoImage },
  { name: 'VCF', image: vcfLogoImage },
  { name: 'Công Luận', image: congluanLogoImage },
];

export const FRANCHISE_TOP_IMAGES = [
  nhuongQuyen1Image,
  nhuongQuyen2Image,
  nhuongQuyen3Image,
];

export const DIFFERENCE_IMAGES = [
  services1Image,
  services2Image,
  '/images/generated/home-hero.jpg',
  services3Image,
];

export const FRANCHISE_REASONS = [
  {
    icon: budgetIcon,
    text: 'Mô hình đầu tư linh hoạt, chi phí hợp lý, phù hợp cho cả nhà đầu tư mới và người trẻ muốn khởi nghiệp.',
  },
  {
    icon: moneyIcon,
    text: 'Hoàn vốn nhanh 6-8 tháng nhờ lượng khách ổn định, tệp khách hàng trung thành và tỷ lệ quay lại cao.',
  },
  {
    icon: settingIcon,
    text: 'Hệ thống quản lý doanh thu đơn giản và thông minh, giúp theo dõi hoạt động kinh doanh dễ dàng.',
  },
  {
    icon: growUpIcon,
    text: 'Sản phẩm được cập nhật liên tục, tính năng mới đa dạng và luôn bắt kịp xu hướng photobooth.',
  },
];

export const FREE_SERVICE_CARDS = [
  {
    title: 'Đầu tư',
    text: 'Chỉ với một khoản đầu tư ban đầu, đối tác đã có thể sở hữu mô hình photobooth hiện đại cùng hệ sinh thái vận hành đồng bộ từ Fun Studio.',
  },
  {
    title: 'Hỗ trợ',
    text: 'Hỗ trợ setup cửa hàng, cài đặt phần mềm, hướng dẫn quản lý ban đầu và gợi ý truyền thông khai trương.',
  },
  {
    title: 'Đồng hành',
    text: 'Đồng hành vận hành, truyền thông, cập nhật sản phẩm, concept mới và tư vấn tối ưu dài hạn.',
  },
  {
    title: 'Đảm bảo',
    text: 'Đảm bảo phần mềm ổn định, chất lượng máy móc, quy trình vận hành đồng bộ và hỗ trợ kỹ thuật khi cần.',
  },
  {
    title: 'Tối ưu',
    text: 'Tối ưu chi phí đầu tư, diện tích vận hành, doanh thu trên từng lượt chụp và trải nghiệm khách hàng.',
  },
  {
    title: '6 miễn phí',
    text: 'Thiết kế cửa hàng, cài đặt phần mềm, đào tạo vận hành, hỗ trợ khai trương, cập nhật layout và hỗ trợ kỹ thuật trọn đời.',
  },
];

export const PRODUCT_MACHINES = [
  {
    image: boothSsImage,
    title: 'Fun Super Star (SS)',
    text: 'Dòng máy tiêu chuẩn, nhỏ gọn, hiện đại, phù hợp cho quán cà phê, studio, cửa hàng hoặc mô hình kinh doanh tự động.',
  },
  {
    image: boothDeImage,
    title: 'Fun Double Effective (DE)',
    text: 'Phiên bản chụp kép với hai không gian vận hành độc lập, giúp phục vụ song song và tối ưu doanh thu.',
  },
  {
    image: boothMeImage,
    title: 'Fun Multiple Effective (ME)',
    text: 'Dòng máy nhiều góc chụp, tạo trải nghiệm mới lạ cho khách hàng và tăng khả năng quay lại.',
  },
  {
    image: boothDshImage,
    title: 'Fun Double Super High (DSH)',
    text: 'Thiết kế góc cao, phù hợp với không gian cần hiệu ứng ảnh nổi bật và khác biệt.',
  },
  {
    image: boothSfImage,
    title: 'Fun Super Fine (SF)',
    text: 'Thiết kế tinh gọn, phù hợp các mặt bằng nhỏ nhưng vẫn giữ trải nghiệm chụp ảnh đầy đủ.',
  },
  {
    image: boothKiotImage,
    title: 'Kiosk Concept',
    text: 'Giải pháp kiosk linh hoạt cho sự kiện, thương mại và các mô hình vận hành ngắn hạn.',
  },
];

export const BUSINESS_FIT_CARDS = [
  {
    icon: homeSearchIcon,
    text: 'Người đang muốn có thêm nguồn thu nhập với mô hình kinh doanh tự động, vận hành tinh gọn.',
  },
  {
    icon: storeIcon,
    text: 'Chủ mặt bằng, quán cà phê, rạp chiếu phim hoặc trung tâm thương mại muốn tăng trải nghiệm khách.',
  },
  {
    icon: presentationIcon,
    text: 'Cá nhân khởi nghiệp tìm kiếm mô hình lợi nhuận tốt với chi phí đầu tư phù hợp.',
  },
];

export const SERVICE_MODELS = [
  {
    image: services1Image,
    title: 'Quán cà phê, cửa hàng',
    text: 'Photo Booth tạo điểm nhấn trải nghiệm, giúp khách hàng tương tác với không gian và tăng khả năng chia sẻ trên mạng xã hội.',
  },
  {
    image: services2Image,
    title: 'Trung tâm thương mại / rạp chiếu phim',
    text: 'Không gian đông khách có thể biến photobooth thành điểm dừng trải nghiệm, ghi lại kỷ niệm sau khi mua sắm hoặc xem phim.',
  },
];

export const RENTAL_SECTIONS = [
  {
    title: 'Thuê máy phục vụ tiệc cưới',
    intro:
      'Đám cưới không chỉ là ngày trọng đại của cô dâu chú rể, mà còn là nơi chứa đầy nụ cười, lời chúc và kỷ niệm khó quên.',
    images: [event1Image, event2Image, event3Image],
    cards: [
      {
        image: services3Image,
        title: 'Độc đáo',
        text: 'Mang tới góc chụp vui vẻ cho khách mời và tạo album kỷ niệm ngay trong sự kiện.',
      },
      {
        image: event4Image,
        title: 'Khoảnh khắc mới',
        text: 'Khách mời có thể nhận ảnh lấy liền, chia sẻ nhanh và lưu giữ dấu ấn tiệc cưới.',
      },
    ],
  },
  {
    title: 'Thuê máy sự kiện doanh nghiệp',
    intro:
      'Photobooth giúp sự kiện thương hiệu trở nên sinh động hơn, tạo điểm check-in và tăng tương tác với khách tham dự.',
    images: [event5Image, event6Image, event7Image],
    cards: [
      {
        image: event2026Image,
        title: 'Event & activation',
        text: 'Thiết kế frame, concept và trải nghiệm chụp ảnh theo nhận diện thương hiệu.',
      },
      {
        image: event8Image,
        title: 'Booth tại hội nghị',
        text: 'Vận hành gọn, setup nhanh và hỗ trợ kỹ thuật trong suốt thời gian sự kiện.',
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

export const NEWS_CARDS = [
  {
    image: '/images/generated/news-1.jpg',
    title: 'Fun Studio tiên phong xu hướng chụp ảnh photobooth',
    text: 'Fun Studio đưa công nghệ robot cabin vào mô hình photobooth tại Việt Nam, mang đến trải nghiệm chụp ảnh mới lạ.',
  },
  {
    image: '/images/generated/news-2.jpg',
    title:
      'Fun Studio giải pháp kinh doanh photobooth chi phí thấp lợi nhuận cao',
    text: 'Mô hình nhượng quyền đơn giản, chi phí đầu tư hợp lý và khả năng thu hồi vốn nhanh chóng.',
  },
  {
    image: '/images/generated/news-3.jpg',
    title:
      'Bật mí điểm hẹn của giới trẻ Hà Thành: cứ đến là rinh về vô vàn ảnh sống ảo',
    text: 'Không gian photobooth sáng tạo, nhiều concept và phụ kiện giúp khách hàng dễ dàng có bộ ảnh độc đáo.',
  },
];

const GALLERY_SOURCE_IMAGES = [dianaEventImage, lienQuanImage, vcfCoverImage];

export const GALLERY_ITEMS = Array.from({ length: 36 }, (_, index) => ({
  id: `gallery-${index + 1}`,
  image: GALLERY_SOURCE_IMAGES[index % GALLERY_SOURCE_IMAGES.length],
  title: index % 2 === 0 ? 'Minh Anh & Thảo Lê Wedding' : 'Fun Studio Event',
  meta: '89 ảnh và 17 video - 9 lượt xem',
}));

export const GALLERY_FALLBACK_IMAGE = '/images/generated/gallery-card.jpg';

export const PRESS_ITEMS = [
  { image: congluanImage, logo: congluanLogoImage, title: 'Công Luận' },
  { image: cafebizImage, logo: cafebizLogoImage, title: 'CafeBiz' },
  { image: kenh14Image, logo: kenh14LogoImage, title: 'Kênh14' },
  { image: vnexpressImage, logo: vnexpressLogoImage, title: 'VnExpress' },
  { image: radioImage, title: 'Radio 4 Teen' },
  { image: vtv24Image, logo: vtvLogoImage, title: 'VTV24' },
];

export const SERVICE_GALLERY_IMAGES = [
  allStoreImage,
  banner2Image,
  event2026Image,
  vcfCoverImage,
  dianaEventImage,
  lienQuanImage,
];

export const SIMPLE_ICONS = {
  grow: growIcon,
  hand: handIcon,
};
