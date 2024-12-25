import React, { useCallback, useState } from 'react';
import menuIcon from 'assets/icons/icon-menu.png';
import logoIcon from 'assets/icons/logo.png';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import { useTranslation } from 'hooks/useTranslation';
import { map } from 'lodash';
import NextLink from 'next/link';
import { Link } from 'react-scroll/modules';
import { headerNavBarLinks } from 'store/static-data/static-data.data';
import MobileSidebarHeader from './MobileSidebarHeader';

export interface INavbarProps {}
export interface AppHeaderProps {
  isHome: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isHome }) => {
  const { T } = useTranslation();
  const [isShowMobileNavbar, setIsShowMobileNavbar] = useState(false);

  const handleToggleShowMobileNavbar = useCallback(() => {
    setIsShowMobileNavbar((o) => !o);
  }, []);

  const handleCloseShowMobileNavbar = useCallback(() => {
    setIsShowMobileNavbar(false);
  }, []);

  return (
    <header className="header">
      <div className="header-section">
        <Container className="header-container">
          <NextLink href="/">
            <Image src={logoIcon} width={100} alt="fun header logo" />
          </NextLink>
          <div className="header-navbar">
            {isHome &&
              map(headerNavBarLinks, (item) => (
                <Link
                  key={item?.value}
                  href={`#${item?.value}`}
                  to={item?.value}
                  className="header-navbar-link"
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-54}
                  duration={500}
                >
                  {item?.label}
                </Link>
              ))}
          </div>
          <a className="btn-hotline" href="tel:0975338244">
            hotline
          </a>
          {isHome && (
            <>
              <button
                type="button"
                className="btn-show-sidebar"
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
      <div className="header-placeholder" />
    </header>
  );
};

export default AppHeader;
