import React, { FC, ReactElement } from 'react';
import { NextRouter } from 'next/router';
import useWow from 'hooks/useWow';
import FloatingSocialButtons from 'containers/common/FloatingSocialButtons';
import MasterLoading from 'containers/common/MasterLoading';
import Footer from './footer/Footer';
import AppHeader from './header/AppHeader';
import './app-layout.module.css';

interface AppLayoutProps {
  headerScroll?: boolean;
  children: ReactElement;
  router?: NextRouter;
  isHome?: boolean;
  isMarketing?: boolean;
}

const AppLayout: FC<AppLayoutProps> = ({
  children,
  isHome,
  isMarketing,
  ...rest
}) => {
  // eslint-disable-next-line no-console
  console.log('>>> AppLayout', rest);
  useWow();

  return (
    <>
      <AppHeader showNav={!!isMarketing || !!isHome} />
      {isHome && <FloatingSocialButtons />}
      {children}
      {(isHome || isMarketing) && <Footer />}
      <MasterLoading />
    </>
  );
};

export function renderMainLayout({
  children,
  router,
  ...other
}: AppLayoutProps) {
  return (
    <AppLayout router={router} {...other}>
      {children}
    </AppLayout>
  );
}

export function renderMarketingLayout({ children, router }: AppLayoutProps) {
  return (
    <AppLayout router={router} isMarketing>
      {children}
    </AppLayout>
  );
}
