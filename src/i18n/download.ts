import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import đúng theo cấu trúc locales/{lang}/{namespace}.json
import viCommon from '../../locales/vi/common.json';
import viDownload from '../../locales/vi/download.json';

import enCommon from '../../locales/en/common.json';
import enDownload from '../../locales/en/download.json';

const downloadI18n = i18n.createInstance();

downloadI18n.use(initReactI18next).init({
  resources: {
    vi: {
      common: viCommon,
      download: viDownload,
    },
    en: {
      common: enCommon,
      download: enDownload,
    },
  },

  lng: 'vi', // ngôn ngữ mặc định cho trang download
  fallbackLng: 'vi',

  ns: ['common', 'download'], // khai báo namespace
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
});

export default downloadI18n;
