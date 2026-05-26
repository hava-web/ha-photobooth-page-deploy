import menuIcon from 'assets/icons/icon-menu.png';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import NextLink from 'next/link';
import React, { useCallback, useState } from 'react';
import { MARKETING_LOGO } from 'store/static-data/marketing-pages.data';
import {
  MarketingCtaLink,
  MarketingNavLinks,
  MarketingPhoneLink,
} from './MarketingHeaderLinks';
import MobileSidebarHeader from './MobileSidebarHeader';

export interface INavbarProps {}
export interface AppHeaderProps {
  showNav?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ showNav = true }) => {
  const { T } = useTranslation();
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
              <MarketingNavLinks variant="desktop" />
            </nav>
          )}
          <div className="col-start-2 row-start-1 flex items-center justify-end gap-4 self-end pb-0.6 tablet:hidden">
            <MarketingPhoneLink />
            <MarketingCtaLink />
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
