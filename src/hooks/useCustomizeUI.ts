import { APP_THEME } from 'assets/styles/theme';
import { CustomizeUIModel } from 'models/common.model';
import dianaLogoImage from 'assets/diana/images/logo.png';
import dianaSloganImage from 'assets/diana/images/slogan.png';
import funLogoImage from 'assets/images/fun_studio_logo.png';

export const useCustomizeUI = (): CustomizeUIModel => {
  if (process.env.NEXT_PUBLIC_THEME_KEY === APP_THEME.DIANA) {
    return {
      appContainerClass: 'theme-diana',
      downloadUI: {
        logoImage: dianaLogoImage,
        sloganImage: dianaSloganImage,
      },
    } as CustomizeUIModel;
  }

  return {
    appContainerClass: 'default-app-container',
    downloadUI: {
      logoImage: funLogoImage,
    },
  };
};
