import React, { FC } from 'react';
import { map } from 'lodash';
import Container from 'components/grid/Container';
import Image from 'components/image/Image';
import {
  FOOTER_CONTACT_ROWS,
  MARKETING_CONTACT,
  MARKETING_LOGO,
} from 'store/static-data/marketing-pages.data';

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const Footer: FC = () => (
  <footer className="w-full border-t border-[#d9d9d9] bg-white font-Montserrat text-[#f7b5b9]">
    <Container className="grid max-w-[1400px] grid-cols-[220px_1fr] gap-[70px] px-[24px] pb-[88px] pt-[72px] [@media(max-width:768px)]:grid-cols-1 [@media(max-width:768px)]:gap-[32px] [@media(max-width:768px)]:py-[48px]">
      <div className="flex items-end justify-center border-r border-[#f4c5ca] [@media(max-width:768px)]:justify-start [@media(max-width:768px)]:border-r-0">
        <Image
          src={MARKETING_LOGO}
          width={150}
          alt="Fun Studio"
          className="h-auto w-[150px]"
        />
      </div>
      <div>
        <h2 className="relative mb-[34px] mt-0 text-[22px] font-extrabold uppercase leading-[1.35] text-[#f7b5b9] after:absolute after:bottom-[-12px] after:left-0 after:h-[4px] after:w-[64px] after:rounded-full after:bg-[#f7b5b9] after:content-['']">
          {MARKETING_CONTACT.company}
        </h2>
        <div className="grid gap-[14px]">
          {map(FOOTER_CONTACT_ROWS, (item) => (
            <p
              key={item.text}
              className="m-0 grid grid-cols-[26px_1fr] items-start gap-[14px] text-[18px] font-normal leading-[1.45] text-[#f7b5b9] [@media(max-width:768px)]:text-[15px]"
            >
              <Image
                src={item.icon}
                width={22}
                height={22}
                alt=""
                className="h-[22px] w-[22px] object-contain"
              />
              {item.href ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-[#ec8e96]"
                  {...(isExternalHref(item.href)
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
