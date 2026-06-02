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
  <footer className="w-full border-t border-brand-line bg-white font-UTMAVo text-brand-pink">
    <Container className="grid max-w-marketing grid-cols-footer gap-[4.375rem] px-6 pb-[5.5rem] pt-[4.5rem] phone:grid-cols-1 phone:gap-8 phone:py-12">
      <div className="flex items-end justify-center border-r border-brand-soft-line phone:justify-start phone:border-r-0">
        <Image
          src={MARKETING_LOGO}
          width={150}
          alt="Fun Studio"
          className="h-auto w-[9.375rem]"
        />
      </div>
      <div>
        <h2 className="relative mb-[5.3125rem] mt-0 text-marketing-control font-extrabold uppercase text-brand-pink after:absolute after:-bottom-3 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-brand-pink after:content-['']">
          {MARKETING_CONTACT.company}
        </h2>
        <div className="grid gap-3.5">
          {map(FOOTER_CONTACT_ROWS, (item) => (
            <p
              key={item.text}
              className="m-0 grid grid-cols-footer-contact items-start gap-3.5 text-lg font-normal leading-normal text-brand-pink phone:text-brand-caption"
            >
              <Image
                src={item.icon}
                width={22}
                height={22}
                alt=""
                className="h-5 w-5 object-contain"
              />
              {item.href ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-brand-pink-hover"
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
