import type { DefaultSeoProps, NextSeoProps } from 'next-seo';

export const SITE_NAME = 'Fun Studio';
export const SITE_DEFAULT_DESCRIPTION =
  'Fun Studio là thương hiệu photobooth tự chụp phong cách Hàn Quốc với hệ thống cửa hàng, dịch vụ sự kiện và mô hình nhượng quyền trên toàn quốc.';
export const SITE_DEFAULT_TITLE =
  'Fun Studio - Photobooth tự chụp phong cách Hàn Quốc';
export const SITE_KEYWORDS =
  'Fun Studio, photobooth, studio tự chụp, photobooth Hàn Quốc, nhượng quyền photobooth, dịch vụ photobooth';
export const SITE_OG_IMAGE_PATH = '/images/og_fun_studio_image.png';

export type SeoRoute = {
  path: string;
  label: string;
  title: string;
  description: string;
};

export const PUBLIC_SEO_ROUTES: SeoRoute[] = [
  {
    path: '/',
    label: 'Trang chủ',
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
  },
  {
    path: '/nhuong-quyen',
    label: 'Nhượng quyền',
    title: 'Nhượng quyền photobooth Fun Studio',
    description:
      'Tìm hiểu mô hình nhượng quyền photobooth Fun Studio, chi phí vận hành tinh gọn, hệ thống hỗ trợ toàn diện và cơ hội kinh doanh photobooth tại Việt Nam.',
  },
  {
    path: '/dich-vu',
    label: 'Dịch vụ',
    title: 'Dịch vụ photobooth sự kiện, cửa hàng và kiosk',
    description:
      'Fun Studio cung cấp dịch vụ photobooth cho sự kiện, cửa hàng, kiosk tự động, tiệc cưới, doanh nghiệp và các chiến dịch trải nghiệm thương hiệu.',
  },
  {
    path: '/cua-hang',
    label: 'Cửa hàng',
    title: 'Hệ thống cửa hàng photobooth Fun Studio',
    description:
      'Khám phá hệ thống cửa hàng photobooth Fun Studio trên toàn quốc, bao gồm các điểm chụp ảnh tự động tại Hà Nội, TP.HCM và nhiều tỉnh thành.',
  },
  {
    path: '/tin-tuc',
    label: 'Tin tức',
    title: 'Tin tức Fun Studio',
    description:
      'Cập nhật tin tức, hoạt động, sự kiện và các câu chuyện nổi bật về photobooth, đối tác và khách hàng của Fun Studio.',
  },
  {
    path: '/gallery',
    label: 'Gallery',
    title: 'Gallery ảnh photobooth Fun Studio',
    description:
      'Xem gallery album ảnh photobooth, khoảnh khắc sự kiện và các bộ ảnh được ghi lại tại Fun Studio.',
  },
  {
    path: '/dang-ky-nhuong-quyen',
    label: 'Đăng ký nhượng quyền',
    title: 'Đăng ký tư vấn nhượng quyền Fun Studio',
    description:
      'Gửi thông tin đăng ký để được Fun Studio tư vấn mô hình nhượng quyền photobooth, chi phí đầu tư và lộ trình vận hành phù hợp.',
  },
  {
    path: '/cau-hoi-thuong-gap',
    label: 'Câu hỏi thường gặp',
    title: 'Câu hỏi thường gặp về Fun Studio',
    description:
      'Giải đáp các câu hỏi thường gặp về dịch vụ, ứng dụng, cửa hàng, chụp ảnh và các chính sách liên quan của Fun Studio.',
  },
  {
    path: '/chinh-sach-bao-mat',
    label: 'Chính sách bảo mật',
    title: 'Chính sách bảo mật Fun Studio',
    description:
      'Chính sách bảo mật của Fun Studio về việc thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân của người dùng.',
  },
  {
    path: '/dieu-khoan-su-dung',
    label: 'Điều khoản sử dụng',
    title: 'Điều khoản sử dụng Fun Studio',
    description:
      'Điều khoản và điều kiện sử dụng ứng dụng, dịch vụ và tiện ích của Fun Studio dành cho người dùng.',
  },
];

export const NO_INDEX_ROUTES = [
  '/download',
  '/upload-photo',
  '/payment-notice',
];

const DEFAULT_SITE_URL = 'https://photobooth-page-2.vercel.app';

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL).replace(
    /\/+$/,
    '',
  );
}

export function normalizePath(path: string) {
  if (!path || path === '/') {
    return '/';
  }

  return `/${path.replace(/^\/+|\/+$/g, '')}`;
}

export function buildCanonicalUrl(path: string) {
  const normalizedPath = normalizePath(path);

  return normalizedPath === '/'
    ? getSiteUrl()
    : `${getSiteUrl()}${normalizedPath}`;
}

export function buildAbsoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${getSiteUrl()}${path}`;
}

export function getSeoRoute(path: string) {
  const normalizedPath = normalizePath(path);

  return PUBLIC_SEO_ROUTES.find((route) => route.path === normalizedPath);
}

export function getDefaultSeo(): DefaultSeoProps {
  return {
    defaultTitle: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      siteName: SITE_NAME,
      title: SITE_DEFAULT_TITLE,
      description: SITE_DEFAULT_DESCRIPTION,
      url: getSiteUrl(),
      images: [
        {
          url: buildAbsoluteUrl(SITE_OG_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: SITE_DEFAULT_TITLE,
        },
      ],
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: SITE_KEYWORDS,
      },
    ],
    additionalLinkTags: [
      {
        rel: 'shortcut icon',
        href: '/fun_studio_logo.ico',
      },
    ],
  };
}

export function getPageSeo(path: string, overrides: NextSeoProps = {}) {
  const route = getSeoRoute(path);
  const title = overrides.title || route?.title || SITE_DEFAULT_TITLE;
  const description =
    overrides.description || route?.description || SITE_DEFAULT_DESCRIPTION;
  const canonical = overrides.canonical || buildCanonicalUrl(path);
  const { openGraph: openGraphOverrides, ...restOverrides } = overrides;

  return {
    title,
    description,
    canonical,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [
        {
          url: buildAbsoluteUrl(SITE_OG_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraphOverrides,
    },
    ...restOverrides,
  };
}

export function getNoIndexSeo(
  path: string,
  overrides: NextSeoProps = {},
): NextSeoProps {
  return {
    ...getPageSeo(path, overrides),
    noindex: true,
    nofollow: true,
  };
}

export function getBreadcrumbItems(path: string) {
  const normalizedPath = normalizePath(path);
  const route = getSeoRoute(normalizedPath);

  if (normalizedPath === '/' || !route) {
    return [];
  }

  return [
    {
      position: 1,
      name: 'Trang chủ',
      item: buildCanonicalUrl('/'),
    },
    {
      position: 2,
      name: route.label,
      item: buildCanonicalUrl(normalizedPath),
    },
  ];
}
