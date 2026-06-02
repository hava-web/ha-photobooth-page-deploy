import type React from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  MARKETING_CONTACT,
  MARKETING_NAV_LINKS,
} from 'store/static-data/marketing-pages.data';

type MarketingNavLinksProps = {
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

const DESKTOP_NAV_LINK_CLASS =
  "relative inline-flex min-h-10 items-center whitespace-nowrap text-center text-xl font-normal leading-6 text-brand-text no-underline after:absolute after:-bottom-2 after:h-2 after:rounded-full after:bg-brand-pink after:content-[''] after:transition-all after:duration-200 hover:after:left-0 hover:after:right-0";

const MOBILE_NAV_LINK_CLASS =
  'relative inline-flex min-h-13 items-center justify-start whitespace-nowrap border-b border-brand-mobile-line text-center text-lg font-normal leading-tight text-brand-text no-underline';

const isActiveRoute = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);

export const MarketingNavLinks: React.FC<MarketingNavLinksProps> = ({
  variant,
  onNavigate,
}) => {
  const router = useRouter();

  return (
    <>
      {MARKETING_NAV_LINKS.map((item) => {
        const isActive = isActiveRoute(router.pathname, item.href);

        return (
          <NextLink
            key={item.href}
            href={item.href}
            className={cx(
              variant === 'desktop'
                ? DESKTOP_NAV_LINK_CLASS
                : MOBILE_NAV_LINK_CLASS,
              variant === 'desktop' &&
                (isActive
                  ? 'after:left-0 after:right-0'
                  : 'after:left-1/2 after:right-1/2'),
            )}
            onClick={onNavigate}
          >
            {item.label}
          </NextLink>
        );
      })}
    </>
  );
};

type MarketingCtaLinkProps = {
  onClick?: () => void;
};

export const MarketingCtaLink: React.FC<MarketingCtaLinkProps> = ({
  onClick,
}) => (
  <NextLink
    className="inline-flex h-12 w-[21.875rem] items-center justify-center whitespace-nowrap rounded-full bg-brand-pink px-7 text-marketing-control font-extrabold uppercase text-white no-underline tablet:w-full tablet:text-base"
    href={MARKETING_CONTACT.ctaHref}
    onClick={onClick}
  >
    {MARKETING_CONTACT.ctaLabel}
  </NextLink>
);

export const MarketingPhoneLink: React.FC = () => (
  <a
    className="whitespace-nowrap text-xl leading-6 text-brand-text no-underline"
    href={MARKETING_CONTACT.phoneHref}
  >
    {MARKETING_CONTACT.phoneLabel}
  </a>
);
