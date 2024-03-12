import React, { ReactElement } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { StaticImageData } from 'next/image';

declare function appGetInitialProps({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps>;

export interface ComponentStatic {
  getInitialProps: typeof appGetInitialProps;
}

export interface PageWithLayout {
  renderLayout?: ({ children }: { children: ReactElement }) => ReactElement;
}

export interface MenuItemProps {
  id?: number;
  name: string;
  href: string;
  badge?: number;
  icon?: string;
  props?: any;
}

export interface DListResponse<Data = any> {
  code: number;
  message: string;
  response?: {
    data?: Data;
    totalRecord?: number;
  };
  [key: string]: any;
}

export interface DObjectResponse<Data = any> {
  code: number;
  message: string;
  response?: Data;
  [key: string]: any;
}
export interface DList<Data = any> {
  data?: Data[];
  totalRecord?: number;
}
export interface DObject<Data = any> {
  data?: Data;
  totalRecord?: number;
}

export interface OptionProps {
  value: string | number;
  id?: string | number;
  avatar?: string;
  color?: string;
  icon?: string | React.FC<React.SVGProps<SVGSVGElement>>;
  [key: string]: any;
}

// Trigger types
export interface TriggerTypes {
  id: string;
  targetId?: number;
  actionName?: string;
  [key: string]: any;
}

export type ObjectOfString<T = string> = {
  [key: string]: T;
};

export type CustomizeUIModel = {
  appContainerClass?: string;
  downloadUI: {
    logoImage?: StaticImageData;
    sloganImage?: StaticImageData;
  };
};
