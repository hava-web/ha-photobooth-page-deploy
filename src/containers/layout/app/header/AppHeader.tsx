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
    <header className="font-UTMAVo text-brand-text">
      <div className="fixed left-0 top-0 z-z-index-header w-full border-b border-brand-line bg-white">
        <Container className="grid h-header max-w-header grid-cols-header grid-rows-header items-center gap-x-3.6 px-2.4 tablet:h-8.2 tablet:grid-cols-header-tablet tablet:grid-rows-single phone:grid-cols-header-phone phone:px-1.6">
          <NextLink
            href="/"
            className="row-span-2 inline-flex items-center tablet:row-span-1"
            aria-label="Fun Studio"
          >
            <Image
              src={MARKETING_LOGO}
              width={136}
              alt="Fun Studio"
              className="h-auto w-13.6 phone:w-11.2"
            />
          </NextLink>
          {showNav && (
            <nav
              className="col-start-2 row-start-2 flex w-full min-w-0 items-center justify-between gap-4.2 tablet:hidden"
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
                      'header-nav-link relative inline-flex min-h-4.2 items-center whitespace-nowrap text-center text-lg font-normal leading-tight text-brand-text no-underline after:absolute after:bottom-0 after:h-0.8 after:rounded-full after:bg-brand-pink after:transition-all after:duration-200 hover:after:left-0 hover:after:right-0',
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
          <div className="col-start-2 row-start-1 flex items-center justify-end gap-4 self-end pb-0.6 tablet:hidden">
            <a
              className="whitespace-nowrap text-base text-brand-text no-underline"
              href={MARKETING_CONTACT.phoneHref}
            >
              {MARKETING_CONTACT.phoneLabel}
            </a>
            <NextLink
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-brand-pink px-3 text-lg font-extrabold uppercase leading-none text-white no-underline"
              href={MARKETING_CONTACT.ctaHref}
            >
              {MARKETING_CONTACT.ctaLabel}
            </NextLink>
          </div>
          {showNav && (
            <>
              <button
                type="button"
                className="hidden h-4.2 w-4.2 items-center justify-center border-0 bg-transparent tablet:col-start-3 tablet:inline-flex tablet:justify-self-end"
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
      <div className="h-header tablet:h-8.2" />
    </header>
  );
};

export default AppHeader;
