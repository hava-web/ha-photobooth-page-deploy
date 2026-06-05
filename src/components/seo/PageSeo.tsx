import React from 'react';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import { getBreadcrumbItems, getNoIndexSeo, getPageSeo } from 'seo/seo.config';
import type { NextSeoProps } from 'next-seo';

type PageSeoProps = {
  path: string;
  overrides?: NextSeoProps;
  breadcrumb?: boolean;
};

export const PageSeo: React.FC<PageSeoProps> = ({
  path,
  overrides,
  breadcrumb = true,
}) => {
  const breadcrumbItems = breadcrumb ? getBreadcrumbItems(path) : [];

  return (
    <>
      <NextSeo {...getPageSeo(path, overrides)} />
      {!!breadcrumbItems.length && (
        <BreadcrumbJsonLd itemListElements={breadcrumbItems} />
      )}
    </>
  );
};

export const NoIndexPageSeo: React.FC<PageSeoProps> = ({ path, overrides }) => (
  <NextSeo {...getNoIndexSeo(path, overrides)} />
);
