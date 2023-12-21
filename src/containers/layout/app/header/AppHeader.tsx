import React, { FC } from 'react';
import { map } from 'lodash';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from 'react-scroll/modules';
import { HOME_PAGE_SECTIONS } from 'constants/dom-element.const';
import Container from 'components/grid/Container';
import classes from './app-header.module.css';

export interface INavbarProps {}

export const headerNavBarLinks = [
  {
    value: HOME_PAGE_SECTIONS.INTRODUCTION,
    label: 'giới thiệu funstudio',
  },
  { value: HOME_PAGE_SECTIONS.ENSURE_OPPORTUNITY, label: 'mô hình bền vững' },
  { value: HOME_PAGE_SECTIONS.SERVICES, label: 'dịch vụ' },
  {
    value: HOME_PAGE_SECTIONS.CUSTOMER_TALK_ABOUT_US,
    label: 'khách hàng nói về chúng tôi',
  },
  {
    value: HOME_PAGE_SECTIONS.COOPERATION_PROCESS,
    label: 'quy trình hợp tác',
  },
  {
    value: HOME_PAGE_SECTIONS.FUN_STORES,
    label: 'danh sách cửa hàng',
  },
];

const AppHeader: FC = () => (
  <header className={classes.header}>
    <div className="w-screen bg-white fixed z-z-index-header shadow-navbar">
      <Container className="uppercase flex w-full items-center py-1">
        <div>
          <NextLink href="/">
            <Image
              src="/images/fun_studio_logo.png"
              width={54}
              height={54}
              alt="fun header logo"
            />
          </NextLink>
        </div>
        <div className="flex flex-1 mx-6 header-navbar items-center">
          {map(headerNavBarLinks, (item) => (
            <Link
              key={item?.value}
              className="font-[500] mr-1 flex-1 text-center whitespace-pre-line cursor-pointer text-lp-small text-lp-lighter-primary-color"
              activeClass="active"
              to={item?.value}
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
            className="font-[700] text-lp-small px-2 py-1 rounded-2 rounded-1 bg-second-primary-color text-white"
            href="tel:097538244"
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
