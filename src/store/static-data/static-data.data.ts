import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import squareFacebookIcon from 'assets/icons/square_facebook.png';
import squareLocationIcon from 'assets/icons/square_location.png';
import squarePhoneIcon from 'assets/icons/square_phone.png';
import squareInstagramIcon from 'assets/icons/square_instagram.png';
import squareEmailIcon from 'assets/icons/square_email.png';
import squareTiktokIcon from 'assets/icons/square_tiktok.png';

import homeSearchIcon from 'assets/icons/home_search.png';
import growIcon from 'assets/icons/grow.png';
import presentationIcon from 'assets/icons/presentation.png';
import setting2Icon from 'assets/icons/setting_2.png';

import budgetIcon from 'assets/icons/budget.png';
import growUpIcon from 'assets/icons/grow_up.png';
import handIcon from 'assets/icons/hand.png';
import moneyIcon from 'assets/icons/money.png';

import banner1Image from 'assets/images/banner-images/banner_1.jpg';
import banner2Image from 'assets/images/banner-images/banner_2.jpg';
import banner3Image from 'assets/images/banner-images/banner_3.jpg';
import banner4Image from 'assets/images/banner-images/banner_4.jpg';
import banner5Image from 'assets/images/banner-images/banner_5.jpg';
import banner6Image from 'assets/images/banner-images/banner_6.jpg';
import banner7Image from 'assets/images/banner-images/banner_7.jpg';

import congluanImage from 'assets/images/home/bao_cong_luan.jpg';
import radio4TeenImage from 'assets/images/home/radio_4_teen.jpg';

import buiLanPhuongImage from 'assets/images/customers/bui_lan_phuong.jpg';
import hoaiAnhLeImage from 'assets/images/customers/hoai_anh_le.jpg';
import duyLeImage from 'assets/images/customers/duy_le.jpg';
import hongNhungImage from 'assets/images/customers/hong_nhung.jpg';

import hoangThuPhuongImage from 'assets/images/customers/hoang_thu_phuong.jpg';
import yenNhiImage from 'assets/images/customers/yen_nhi.jpg';
import nguyenThuImage from 'assets/images/customers/nguyen_thu.jpg';

export const headerNavBarLinks = [
  {
    value: HOME_PAGE_SECTIONS.INTRODUCTION,
    label: 'giới thiệu funstudio',
  },
  { value: HOME_PAGE_SECTIONS.ENSURE_OPPORTUNITY, abel: 'mô hình bền vững' },
  { value: HOME_PAGE_SECTIONS.SERVICES, label: 'dịch vụ' },
  {
    value: HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US,
    label: 'khách hàng nói về chúng tôi',
  },
  { value: HOME_PAGE_SECTIONS.COOPERATION_PROCESS, label: 'quy trình hợp tác' },
  {
    value: HOME_PAGE_SECTIONS.FUN_STORES,
    label: 'danh sách cửa hàng',
  },
];

export const funStores = [
  {
    label: 'Complex 01 ngõ 167 Tây Sơn, Đống Đa, Hà Nội',
    labelIndex: 'Fun Studio 1',
    value: 1,
    alt: 'Complex',
    href: '#',
  },
  {
    label: '207 Tân Lập, Hùng Vương, Phú Thọ',
    labelIndex: 'Fun Studio 4',
    value: 2,
    alt: 'Complex',
    href: '#',
  },
  {
    label: 'Kiot 4 Đại học Sư Phạm Hà Nội, Xuân Thủy, Cầu Giấy, Hà Nội',
    labelIndex: 'Fun Studio 2',
    value: 3,
    alt: 'Complex',
    href: '#',
  },
  {
    label: '20 Chu Văn An, Vĩnh Yên, Vĩnh Phúc',
    labelIndex: 'Fun Studio 5',
    value: 4,
    alt: 'Complex',
    href: '#',
  },
  {
    label: '57 Núi Trúc, Ba Đình, Hà Nội',
    labelIndex: 'Fun Studio 3',
    value: 5,
    alt: 'Complex',
    href: '#',
  },
];

export const funBanners = [
  {
    label: 'Mô hình chụp ảnh tự động,\n phong cách Hàn Quốc',
    value: 1,
    image: banner1Image,
    alt: 'korea styles',
  },
  {
    label: 'Làn sóng chụp ảnh gây bão với giới trẻ đầu năm 2023',
    value: 2,
    image: banner2Image,
    alt: 'easy to use',
  },
  {
    label: 'Mô hình ưu Việt,\n dễ dàng sử dụng',
    value: 3,
    image: banner3Image,
    alt: 'low risk high profit',
  },
  {
    label: 'Chi phí đầu tư ban đầu thấp,\n lợi nhuận cao',
    value: 4,
    image: banner4Image,
    alt: 'genz trending',
  },
  {
    label: 'Thu hồi vốn nhanh chóng 6 - 8 tháng',
    value: 5,
    image: banner5Image,
    alt: 'get budget',
  },
  {
    label: 'Chi phí vận hành thấp,\n tự động hóa cao,\n sử dụng ít nhân sự',
    value: 6,
    image: banner6Image,
    alt: 'low operation cost',
  },
  {
    label: 'Thời gian triển khai nhanh chóng với chi phí tối ưu',
    value: 7,
    image: banner7Image,
    alt: 'quick building',
  },
];

export const FOOTER_ITEMS = [
  {
    label: 'fun@funstudio.com.vn',
    value: 1,
    image: squareEmailIcon,
    alt: 'footer email icon',
    href: 'mailto:fun@funstudio.com.vn',
  },
  {
    label: 'Fun Studio',
    value: 2,
    image: squareFacebookIcon,
    alt: 'footer facebook icon',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
  {
    label: 'Số 3, Ngõ 31 Dịch vọng, Cầu Giấy, Hà Nội',
    value: 3,
    image: squareLocationIcon,
    alt: 'footer location icon',
  },
  {
    label: 'funstudio__',
    value: 4,
    image: squareTiktokIcon,
    alt: 'footer tiktok icon',
    href: process.env.NEXT_PUBLIC_TIKTOK_URL,
  },
  {
    label: 'Mr. Duy 0975338244',
    value: 5,
    image: squarePhoneIcon,
    alt: 'footer phone icon',
    href: 'tel:0975338244',
  },
  {
    label: '@funatfunstudio',
    value: 6,
    image: squareInstagramIcon,
    alt: 'footer instagram icon',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  },
];

export const SERVICE_ITEMS = [
  {
    label: 'tư vấn và tìm kiếm mặt bằng kinh doanh',
    value: 1,
    image: homeSearchIcon,
    alt: 'home search icon',
  },
  {
    label:
      'update những sản phẩm mới, những chiến dịch quảng cáo, market-ing mang lại hiệu quả cho tất cả các cửa hàng chi nhánh',
    value: 2,
    image: growIcon,
    alt: 'grow icon',
  },
  {
    label:
      'huấn luyện, đào tạo nhân viên, chúng tôi luôn mong muốn mang đến cho các chủ đầu tư cơ hội tăng trưởng tài chính vững chắc, lâu dài.',
    value: 3,
    image: presentationIcon,
    alt: 'presentation icon',
  },
  {
    label:
      'lắp đặt, thi công và định hướng đúng để xây dựng một hệ thống cửa hàng trực thuộc thành công.',
    value: 4,
    image: setting2Icon,
    alt: 'setting icon',
  },
];

export const OPPORTUNITY_ITEMS = [
  {
    label: 'Bạn có nguồn vốn nhàn rỗi?',
    description:
      'Bạn có nguồn vốn nhàn rỗi nhưng chưa có định hướng kinh doanh gì, không có đội ngũ? Vậy Fun Studio là lựa chọn tối ưu cho bạn để có thể tạo ra thu nhập thụ động, với vốn đầu tư ban đầu thấp và thời gian quay vòng vốn nhanh chóng',
    value: 1,
    image: budgetIcon,
    alt: 'budget icon',
  },
  {
    label: 'Bạn chưa biết nên đầu tư vào lĩnh vực nào?',
    description:
      'Lựa chọn tuyệt vời dành cho bạn chính là Fun Studio - mô hình kinh doanh photo booth tự chụp ảnh phong cách Hàn Quốc đang nhận được rất nhiều sự yêu mến của các bạn trẻ',
    value: 2,
    image: growUpIcon,
    alt: 'hand icon',
  },
  {
    label: 'Bạn muốn có cửa hàng nhưng chưa biết cách quản lý',
    description:
      'Rất nhiều người rất muốn kinh doanh nhưng không có kinh nghiệm, không dám làm vì không có kinh nghiệm, nguồn lực để làm. Nhưng đến với Fun Studio thì bạn hoàn toàn có thể, cửa hàng kinh doanh là của bạn, nhưng toàn bộ hoạt động vận hành, quản lý là do tổng công ty điều hành và hỗ trợ cho bạn.',
    value: 3,
    image: handIcon,
    alt: 'hand icon',
  },
  {
    label: 'Bạn đã kinh doanh nhưng muốn có thêm thu nhập thụ động?',
    description:
      'Dù bạn đã kinh doanh ngành nghề khác, nhưng với 1 lĩnh vực mới như: mô hình tự chụp ảnh phong cách Hàn Quốc thì lời khuyên tốt nhất cho bạn là hãy tìm tới 1 công ty làm tốt vấn đề đó để đầu tư thay vì việc tự mình phải lo từ việc sản xuất, setup cửa hàng, quản lý, vận hành và, truyền thông...',
    value: 4,
    image: moneyIcon,
    alt: 'money icon',
  },
];

export const CUSTOMER_MESSAGES = [
  {
    label: 'Bùi Lan Phương',
    description:
      'Siêu mê sốp nha, ảnh vừa đẹp, phụ kiện quá tuyệt vời, hẹn sốp lần thứ 10.',
    value: 1,
    image: buiLanPhuongImage,
    alt: 'customer messages',
  },
  {
    label: 'Duy Lê',
    description:
      'KPI mỗi tháng chúng mình qua 1 lần. Ước sốp làm quà cho Đại học Thăng Long',
    value: 2,
    image: duyLeImage,
    alt: 'customer messages',
  },
  {
    label: 'Hồng Nhung',
    description:
      'Chị Huyền làm ca sáng ở Tây Sơn rất chu đáo, em vote 10 saooo',
    value: 3,
    image: hongNhungImage,
    alt: 'customer messages',
  },
  {
    label: 'Hoài Anh Lê',
    description:
      'Mấy chị nhân viên siêu cute luôn ý ạ, giá còn rẻ nữa ạ. Em chụp tới lần thứ 9 rùi đó',
    value: 4,
    image: hoaiAnhLeImage,
    alt: 'customer messages',
  },
  {
    label: 'Hoàng Thu Phương',
    description:
      'Ở Fun bắt trend siêu nhanh luôn, làm em tới lần thứ 10 rùi mà chưa chụp được hết frame',
    value: 5,
    image: hoangThuPhuongImage,
    alt: 'customer messages',
  },
  {
    label: 'Yến Nhi',
    description:
      'Chưa thấy ở đâu chụp ảnh rẻ như ở Fun, rẻ nhưng vẫn vô cùng chất lượng, lại còn nhiều trang phục xinh nữa. Em sẽ quay lại dài dàiii',
    value: 6,
    image: yenNhiImage,
    alt: 'customer messages',
  },
  {
    label: 'Nguyễn Thu',
    description:
      'Mê nhất là seri frame trường ở đây vì có cả trường cấp 3 và Đại học em đang học lun, cực mê lun',
    value: 7,
    image: nguyenThuImage,
    alt: 'customer messages',
  },
];

export const NEWS_MESSAGES = [
  {
    label: 'báo công luận',
    value: 1,
    href: 'https://tv.congluan.vn/gioi-tre-ru-nhau-lam-moi-lai-trao-luu-photobooth-post275590.html',
    image: congluanImage,
    alt: 'cong luan news',
  },
  {
    label: 'radio 4 teen',
    value: 2,
    href: 'https://hanoionline.vn/radio-4-teen-03-11-2023-201398.htm',
    image: radio4TeenImage,
    alt: 'radio 4 teens',
  },
  {
    label: 'báo công luận',
    value: 3,
    href: 'https://tv.congluan.vn/gioi-tre-ru-nhau-lam-moi-lai-trao-luu-photobooth-post275590.html',
    image: congluanImage,
    alt: 'cong luan news',
  },
  {
    label: 'radio 4 teen',
    value: 4,
    href: 'https://hanoionline.vn/radio-4-teen-03-11-2023-201398.htm',
    image: radio4TeenImage,
    alt: 'radio 4 teens',
  },
];

export const STRENGTH_ITEMS = [
  {
    label: 'đội ngũ\n dày dặn\n kinh nghiệm',
    description:
      'Đồng hành triển khai và tư vấn bởi Đội ngũ chuyên môn cao dày dặn kinh nghiệm trong việc triển khai chuỗi cửa hàng',
    value: 1,
    alt: 'cong luan news',
  },
  {
    label: 'đội ngũ\n kỹ thuật\n chuyên nghiệp',
    description:
      'Tự phát triển phần mềm bởi đội ngũ chuyên gia kĩ thuật chuyên nghiệp',
    value: 2,
    alt: 'radio 4 teens',
  },
  {
    label: 'bắt trend\n nhanh chóng\n và sáng tạo',
    description:
      'Luôn cập nhật những frame độc quyền, phụ kiện độc đáo và độ bắt trend nhanh chóng.',
    value: 3,
    alt: 'cong luan news',
  },
  {
    label: 'mô hình\n ưu việt',
    description:
      'Mô hình tinh gọn, tiết kiệm chi phí, dễ sử dụng, thời gian triển khai nhanh chóng, thời gian hoàn vốn cấp tốc',
    value: 4,
    alt: 'radio 4 teens',
  },
];
