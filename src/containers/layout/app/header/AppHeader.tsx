import React, { FC } from 'react';
import { map } from 'lodash';
import Image from 'components/image/Image';
import NextLink from 'next/link';
import { Link } from 'react-scroll/modules';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import logoIcon from 'assets/icons/logo.png';
import Container from 'components/grid/Container';

import classes from './app-header.module.css';

export interface INavbarProps {}

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
  {
    value: HOME_PAGE_SECTIONS.COOPERATION_PROCESS,
    label: 'quy trình\n hợp tác',
  },
  {
    value: HOME_PAGE_SECTIONS.FUN_STORES,
    label: 'danh sách\n cửa hàng',
  },
];

const AppHeader: FC = () => (
  <header className={classes.header}>
    <div className="font-Montserrat w-screen bg-white fixed z-z-index-header shadow-navbar">
      <Container className="uppercase flex w-full items-center py-1">
        <div>
          <NextLink href="/">
            <Image src={logoIcon} width={100} alt="fun header logo" />
          </NextLink>
        </div>
        <div className="flex flex-1 mx-[10rem] items-center">
          {map(headerNavBarLinks, (item) => (
            <Link
              key={item?.value}
              href={`#${item?.value}`}
              to={item?.value}
              className="font-[600] mr-1 flex-1 text-center whitespace-pre-line cursor-pointer text-lp-small text-lp-lighter-primary-color"
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
        <div>
          <a
            className="font-[700] text-lp-small p-[0.4rem] px-[1rem] rounded-[2rem] bg-second-primary-color text-white"
            href="tel:0975338244"
          >
            hotline
          </a>
        </div>
      </Container>
    </div>
    <div className={classes?.['header-placeholder']} />
  </header>
);

export default AppHeader;
