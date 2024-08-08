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

import bannerAllStoreInVN from 'assets/images/banner-images/all-store-in-vn.webp';
import bannerAllStoreInVNMobile from 'assets/images/banner-images/all-store-in-vn-mobile.webp';
import bannerAllFeatureImage from 'assets/images/banner-images/banner_all_feature.webp';
import bannerAllFeatureImageMobile from 'assets/images/banner-images/banner_all_feature-mobile.webp';
import bannerKoreanStyleImage from 'assets/images/banner-images/banner_1.webp';
import bannerTrendy2023Image from 'assets/images/banner-images/banner_2.jpg';
import bannerEasyToUseImage from 'assets/images/banner-images/banner_3.webp';
import banner4Image from 'assets/images/banner-images/banner_4.webp';
import banner5Image from 'assets/images/banner-images/banner_5.webp';
import banner6Image from 'assets/images/banner-images/banner_6.webp';
import banner7Image from 'assets/images/banner-images/banner_7.webp';

import funDhspImage from 'assets/images/stores/fun_dhsp.jpg';
import funComplex01Image from 'assets/images/stores/fun_complex01.webp';
import funNuiTrucImage from 'assets/images/stores/fun_nui_truc.webp';
import funNgheAnImage from 'assets/images/stores/fun_nghe_an.webp';
import funVietTriImage from 'assets/images/stores/fun_viet_tri.webp';
import funVinhPhucImage from 'assets/images/stores/fun_vinh_phuc.webp';
import funNgheAn2Image from 'assets/images/stores/fun_nghe_an_2.webp';
import funHaiDuongImage from 'assets/images/stores/fun_hai_duong.webp';

import dianaLogoImage from 'assets/diana/images/logo.png';
import congluanImage from 'assets/images/home/bao_cong_luan.webp';
import dianaFacebookEventImage from 'assets/images/home/diana_facebook_event.webp';
import radio4TeenImage from 'assets/images/home/radio_4_teen.webp';
import congluanLogoImage from 'assets/images/home/congluan_logo.png';
import vtv1LogoImage from 'assets/images/home/vtv1_logo.png';

import buiLanPhuongImage from 'assets/images/customers/bui_lan_phuong.webp';
import hoaiAnhLeImage from 'assets/images/customers/hoai_anh_le.webp';
import duyLeImage from 'assets/images/customers/duy_le.webp';
import hongNhungImage from 'assets/images/customers/hong_nhung.webp';
import hoangThuPhuongImage from 'assets/images/customers/hoang_thu_phuong.webp';
import yenNhiImage from 'assets/images/customers/yen_nhi.webp';
import nguyenThuImage from 'assets/images/customers/nguyen_thu.webp';
import nguyenThuTrangImage from 'assets/images/customers/nguyen_thu_trang.webp';
import phuongLinhImage from 'assets/images/customers/phuong_linh.webp';
import minhKhueImage from 'assets/images/customers/minh_khue.webp';
import khanhLyImage from 'assets/images/customers/khanh_ly.webp';

export const headerNavBarLinks = [
  {
    value: HOME_PAGE_SECTIONS.INTRODUCTION,
    label: 'giới thiệu\n funstudio',
  },
  { value: HOME_PAGE_SECTIONS.ENSURE_OPPORTUNITY, label: 'mô hình\n bền vững' },
  { value: HOME_PAGE_SECTIONS.SERVICES, label: 'dịch vụ\n miễn phí' },
  {
    value: HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US,
    label: 'khách hàng\n nói về chúng tôi',
  },
  // {
  //   value: HOME_PAGE_SECTIONS.COOPERATION_PROCESS,
  //   label: 'quy trình\n hợp tác',
  // },
  {
    value: HOME_PAGE_SECTIONS.FUN_STORES,
    label: 'danh sách\n cửa hàng',
  },
];

export const funStores = [
  {
    label:
      'Tầng 2, Complex 01, Số 29, ngách 31, ngõ 167, Tây Sơn, Đống Đa, Hà Nội.',
    labelIndex: 'Fun Studio Complex 01',
    value: 1,
    alt: 'Fun Studio Complex 01',
    image: funComplex01Image,
    href: '#',
  },
  {
    label:
      'Ki-ốt số 4, Đại học Sư Phạm Hà Nội, 136 Xuân Thuỷ, Cầu Giấy, Hà Nội.',
    labelIndex: 'Fun Studio ĐHSP',
    value: 2,
    alt: 'Fun Studio ĐHSP',
    image: funDhspImage,
    href: '#',
  },
  {
    label: '57 Núi Trúc, Ba Đình, Hà Nội',
    labelIndex: 'Fun Studio Núi Trúc',
    value: 3,
    alt: 'Fun Studio Núi Trúc',
    image: funNuiTrucImage,
    href: '#',
  },
  {
    label: '20 Chu Văn An, Tp. Vĩnh Yên, tỉnh Vĩnh Phúc',
    labelIndex: 'Fun Studio Vĩnh Phúc',
    value: 4,
    alt: 'Fun Studio Vĩnh Phúc',
    image: funVinhPhucImage,
    href: '#',
  },
  {
    label: '51 Quang Trung, Nông Trang, Việt Trì, Phú Thọ',
    labelIndex: 'Fun Studio Việt Trì',
    value: 5,
    alt: 'Fun Studio Việt Trì',
    image: funVietTriImage,
    href: '#',
  },
  {
    label: 'Số 29 ngõ 27 đường Bạch Liêu, phường Trường Thi, TP. Vinh, Nghệ An',
    labelIndex: 'Fun Studio Vinh',
    value: 6,
    alt: 'Fun Studio Vinh',
    image: funNgheAnImage,
    href: '#',
  },
  {
    label: '68 Hải Thượng Lãn Ông, Phường Hà Huy Tập, Vinh',
    labelIndex: 'Fun Studio Vinh',
    value: 7,
    alt: 'Fun Studio Vinh',
    image: funNgheAn2Image,
    href: '#',
  },
  {
    label: '67 Tuệ Tĩnh, Phường Nguyễn Trãi, Hải Dương',
    labelIndex: 'Fun Studio Hải Dương',
    value: 8,
    alt: 'Fun Studio Hải Dương',
    image: funHaiDuongImage,
    href: '#',
  },
];

export const funBanners = [
  {
    label: '',
    value: 1,
    image: bannerAllStoreInVN,
    mobileImage: bannerAllStoreInVNMobile,
    alt: 'Hệ thống cửa hàng Fun Studio trên cả nước',
  },
  {
    label: 'Trọn gói đầu tư, tư vấn, triển khai, vận hành',
    value: 2,
    image: bannerAllFeatureImage,
    mobileImage: bannerAllFeatureImageMobile,
    alt: 'easy to use',
  },
  {
    label: 'Làn sóng chụp ảnh gây bão với giới trẻ đầu năm 2023',
    value: 3,
    image: bannerTrendy2023Image,
    alt: 'easy to use',
  },
  {
    label: 'Mô hình chụp ảnh tự động,\n phong cách Hàn Quốc',
    value: 4,
    image: bannerKoreanStyleImage,
    alt: 'korea styles',
  },
  {
    label: 'Mô hình ưu Việt,\n dễ dàng sử dụng',
    value: 5,
    image: bannerEasyToUseImage,
    alt: 'low risk high profit',
  },
  {
    label: 'Chi phí đầu tư ban đầu thấp,\n lợi nhuận cao',
    value: 6,
    image: banner4Image,
    alt: 'genz trending',
  },
  {
    label: 'Thu hồi vốn nhanh chóng 6 - 8 tháng',
    value: 7,
    image: banner5Image,
    alt: 'get budget',
  },
  {
    label: 'Chi phí vận hành thấp,\n tự động hóa cao,\n sử dụng ít nhân sự',
    value: 8,
    image: banner6Image,
    alt: 'low operation cost',
  },
  {
    label: 'Thời gian triển khai nhanh chóng với chi phí tối ưu',
    value: 9,
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
    label: 'tư vấn và tìm kiếm mặt bằng kinh doanh.',
    value: 1,
    image: homeSearchIcon,
    alt: 'home search icon',
  },
  {
    label:
      'update các tính năng mới, những chiến dịch quảng cáo, marketing mang lại hiệu quả cho tất cả các cửa hàng chi nhánh.',
    value: 2,
    image: growIcon,
    alt: 'grow icon',
  },
  {
    label:
      'xây dựng quy trình chặt chẽ và mô hình tiêu chuẩn, thêm nhiều cơ hội tăng trưởng tài chính vững chắc, lâu dài cho đối tác.',
    value: 3,
    image: presentationIcon,
    alt: 'presentation icon',
  },
  {
    label:
      'lắp đặt, thi công và tư vấn định hướng đúng để xây dựng một hệ thống cửa hàng trực thuộc thành công.',
    value: 4,
    image: setting2Icon,
    alt: 'setting icon',
  },
];

export const OPPORTUNITY_ITEMS = [
  {
    label: 'Bạn có nguồn vốn nhàn rỗi?',
    description:
      'Bạn có nguồn vốn nhàn rỗi nhưng chỉ biết gửi tiết kiệm. Trăn trở có một "công ty" của riêng mình nhưng lại không biết bắt đầu từ đâu. Fun Studio là lựa chọn tối ưu để có thể tạo ra thu nhập thụ động, với vốn đầu tư ban đầu thấp và thời gian quay vòng vốn nhanh chóng.',
    value: 1,
    image: budgetIcon,
    alt: 'budget icon',
  },
  {
    label: 'Bạn chưa biết nên đầu tư vào lĩnh vực nào?',
    description:
      'Lựa chọn tuyệt vời dành cho bạn chính là Fun Studio - mô hình kinh doanh photo booth tự chụp ảnh phong cách Hàn Quốc đang nhận được rất nhiều sự yêu mến của các bạn trẻ và đã phát triển hàng ngàn cửa hàng ở Hàn Quốc và Nhật Bản. Đồng thời cũng đang trên đà phát triển tại thị trường Việt Nam.',
    value: 2,
    image: growUpIcon,
    alt: 'hand icon',
  },
  {
    label: 'Bạn muốn thử sức kinh doanh nhưng thiếu kinh nghiệm quản lý',
    description:
      'Bạn muốn kinh doanh nhưng luôn trong trạng thái chưa sẵn sàng, thiếu nguồn lực hoặc chưa tự tin với kinh nghiệm của mình. Fun Studio chính là giải pháp hiện thực hóa giấc mơ của mình, đồng thời thể hiện năng lực cá nhân cũng như phát triển thêm kinh nghiệm cần thiết khác. Bạn sẽ kinh doanh cùng Fun Studio, giải quyết các bài toán đau đầu về tối ưu chi phí, vận hành và có lãi.',
    value: 3,
    image: handIcon,
    alt: 'hand icon',
  },
  {
    label: 'Bạn đã kinh doanh nhưng muốn có thêm thu nhập thụ động?',
    description:
      'Với sự tham gia và hỗ trợ của công ty Fun Studio, các khâu quản lý và vận hành sẽ được tự động hóa và quy chuẩn hóa.  Fun Studio cũng hỗ trợ nhà đầu tư từ việc sản xuất, setup cửa hàng, đào tạo nhân viên, và truyền thông...',
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
  {
    label: 'Nguyễn Thu Trang',
    description:
      'Em trải nghiệm chụp ảnh bên mình, ưng lắm nhaa, rổ giá okii mà in ảnh ra đẹp cực',
    value: 8,
    image: nguyenThuTrangImage,
    alt: 'customer messages',
  },
  {
    label: 'Phương Linh',
    description:
      'Ban đầu cứ tưởng 50k là giá ưu đãi, ai ngờ là giá niêm yết. Em rât mê studio vì vừa rẻ lại còn đẹp',
    value: 9,
    image: phuongLinhImage,
    alt: 'customer messages',
  },
  {
    label: 'Minh Khuê',
    description:
      'Sốp có mấy chị nhân viên nhiệt tình ghê, phụ kiện cũng xinh lắm aaa, sốp 10 điểm không có nhưng',
    value: 10,
    image: minhKhueImage,
    alt: 'customer messages',
  },
  {
    label: 'Khánh Ly',
    description:
      'Em ít khi chụp ảnh, nhưng studio có phòng riêng tư nên em đỡ ngại hơn, lại còn có thêm phụ kiện xinh iu lắm luôn ấy. Em sẽ kéo bạn bè qua thật nhìuu',
    value: 11,
    image: khanhLyImage,
    alt: 'customer messages',
  },
];

export const NEWS_MESSAGES = [
  {
    label: 'diana',
    value: 1,
    href: 'https://www.facebook.com/share/p/3xpn4v3j3T6Muapx/',
    image: dianaFacebookEventImage,
    logo: dianaLogoImage,
    alt: 'diana news',
  },
  {
    label: 'vtv',
    value: 2,
    href: 'https://tv.congluan.vn/gioi-tre-ru-nhau-lam-moi-lai-trao-luu-photobooth-post275590.html',
    image: congluanImage,
    logo: vtv1LogoImage,
    video: process.env.NEXT_PUBLIC_VTV1_YOUTUBE_URL,
    alt: 'vtv news',
  },
  {
    label: 'báo công luận',
    value: 3,
    href: 'https://tv.congluan.vn/gioi-tre-ru-nhau-lam-moi-lai-trao-luu-photobooth-post275590.html',
    image: congluanImage,
    logo: congluanLogoImage,
    video: process.env.NEXT_PUBLIC_CONG_LUAN_YOUTUBE_URL,
    alt: 'cong luan news',
  },
  {
    label: 'radio 4 teen',
    value: 4,
    href: 'https://hanoionline.vn/radio-4-teen-03-11-2023-201398.htm',
    image: radio4TeenImage,
    video: process.env.NEXT_PUBLIC_RADIO_TEEN_YOUTUBE_URL,
    alt: 'radio 4 teens',
  },
];

export const STRENGTH_ITEMS = [
  {
    label: 'đội ngũ\n sáng lập\n dày dặn\n kinh nghiệm',
    description:
      'Đồng hành triển khai và tư vấn bởi Đội ngũ chuyên môn cao dày dặn kinh nghiệm trong việc triển khai chuỗi cửa hàng',
    value: 1,
    alt: 'đội ngũ dày dặn kinh nghiệm',
  },
  {
    label: 'đội ngũ\n chuyên gia\n trong lĩnh vực\n cntt',
    description:
      'Phần mềm và phần cứng được triển bởi đội ngũ chuyên gia dày dặn kinh nghiệm trong lĩnh vực Công nghệ - Thông tin',
    value: 2,
    alt: 'đội ngũ chuyên gia trong lĩnh vực cntt',
  },
  {
    label: 'bắt trend\n nhanh chóng\n và sáng tạo',
    description:
      'Luôn cập nhật những frame độc quyền, phụ kiện độc đáo và độ bắt trend nhanh chóng.',
    value: 3,
    alt: 'bắt trend nhanh chóng và sáng tạo',
  },
  {
    label: 'mô hình\n ưu việt',
    description:
      'Mô hình tinh gọn, tiết kiệm chi phí, dễ vận hành và quản lý, thời gian triển khai nhanh chóng và thời gian hoàn vốn cấp tốc',
    value: 4,
    alt: 'mô hình ưu việt',
  },
];
