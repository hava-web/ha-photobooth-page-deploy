import menuIcon from 'assets/icons/icon-menu.png';
import cx from 'classnames';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { map } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  MARKETING_CONTACT,
  MARKETING_LOGO,
  MARKETING_NAV_LINKS,
} from 'store/static-data/marketing-pages.data';
import MobileSidebarHeader from './MobileSidebarHeader';

export interface INavbarProps {}
export interface AppHeaderProps {
  showNav?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ showNav = true }) => {
  const { T } = useTranslation();
  const router = useRouter();
  const [isShowMobileNavbar, setIsShowMobileNavbar] = useState(false);

  const handleToggleShowMobileNavbar = useCallback(() => {
    setIsShowMobileNavbar((o) => !o);
  }, []);

  const handleCloseShowMobileNavbar = useCallback(() => {
    setIsShowMobileNavbar(false);
  }, []);

  return (
    <header className="font-Montserrat text-[#606060]">
      <div className="fixed left-0 top-0 z-z-index-header w-full border-b border-[#d9d9d9] bg-white">
        <Container className="grid h-[var(--height-of-header)] max-w-[1560px] grid-cols-[150px_minmax(0,1fr)] grid-rows-[58px_70px] items-center gap-x-[36px] px-[24px] [@media(max-width:1180px)]:h-[82px] [@media(max-width:1180px)]:grid-cols-[140px_1fr_42px] [@media(max-width:1180px)]:grid-rows-[1fr] [@media(max-width:768px)]:grid-cols-[112px_1fr_42px] [@media(max-width:768px)]:px-[16px]">
          <NextLink
            href="/"
            className="row-span-2 inline-flex items-center [@media(max-width:1180px)]:row-span-1"
            aria-label="Fun Studio"
          >
            <Image
              src={MARKETING_LOGO}
              width={136}
              alt="Fun Studio"
              className="h-auto w-[136px] [@media(max-width:768px)]:w-[108px]"
            />
          </NextLink>
          {showNav && (
            <nav
              className="col-start-2 row-start-2 flex w-full min-w-0 items-center justify-between gap-[42px] [@media(max-width:1180px)]:hidden"
              aria-label="Main navigation"
            >
              {map(MARKETING_NAV_LINKS, (item) => {
                const isActive =
                  item.href === '/'
                    ? router.pathname === '/'
                    : router.pathname.startsWith(item.href);

                return (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    className={cx(
                      "relative inline-flex min-h-[42px] items-center whitespace-nowrap text-center text-[18px] font-normal leading-[1.2] text-[#606060] no-underline after:absolute after:bottom-0 after:h-[8px] after:rounded-full after:bg-[#f7b5b9] after:content-[''] after:transition-all after:duration-200 hover:after:left-0 hover:after:right-0",
                      isActive
                        ? 'after:left-0 after:right-0'
                        : 'after:left-1/2 after:right-1/2',
                    )}
                  >
                    {item.label}
                  </NextLink>
                );
              })}
            </nav>
          )}
          <div className="col-start-2 row-start-1 flex items-center justify-end gap-[24px] self-end pb-[6px] [@media(max-width:1180px)]:hidden">
            <a
              className="whitespace-nowrap text-[16px] text-[#606060] no-underline"
              href={MARKETING_CONTACT.phoneHref}
            >
              {MARKETING_CONTACT.phoneLabel}
            </a>
            <NextLink
              className="inline-flex min-h-[46px] items-center justify-center whitespace-nowrap rounded-full bg-[#f7b5b9] px-[30px] text-[18px] font-extrabold uppercase leading-none text-white no-underline"
              href={MARKETING_CONTACT.ctaHref}
            >
              {MARKETING_CONTACT.ctaLabel}
            </NextLink>
          </div>
          {showNav && (
            <>
              <button
                type="button"
                className="hidden h-[42px] w-[42px] items-center justify-center border-0 bg-transparent [@media(max-width:1180px)]:col-start-3 [@media(max-width:1180px)]:inline-flex [@media(max-width:1180px)]:justify-self-end"
                aria-label="more"
                title={T('more')}
                onClick={handleToggleShowMobileNavbar}
              >
                <Image src={menuIcon} height={25} alt="more" />
              </button>
              <MobileSidebarHeader
                open={isShowMobileNavbar}
                onClose={handleCloseShowMobileNavbar}
              />
            </>
          )}
        </Container>
      </div>
      <div className="h-[var(--height-of-header)] [@media(max-width:1180px)]:h-[82px]" />
    </header>
  );
};

export default AppHeader;
