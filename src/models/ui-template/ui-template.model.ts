import { CapitalizedKeys } from 'types/global';

export type UiTemplateModel = {
  backgroundImageUrl: string;
  backgroundPageDownload: string;
  borderTitleColor1: string;
  borderTitleColor2: string;
  buttonBorderColor: string;
  buttonTextColor: string;
  customCss: string;
  customCssPageDownload: string;
  description: string;
  downloadUrl: string;
  expiredTextPageDownload: string;
  id: number;
  boothId: number;
  inputBackgroundColor: string;
  isActive: true;
  isAllowEarnPoint: boolean;
  logoImageUrl: string;
  name: string;
  noDataTextPageDownload: string;
  primaryColor: string;
  printMascotImage: string;
  screenType: number;
  secondaryColor: string;
  sloganTextPageDownload: string;
  startMascotImage: string;
  startScreenImageUrl: string;
  textColor: string;
  titleColor: string;
  uploadingTextPageDownload: string;
  seoMetaDataJsonPageDownload: string;
  paymentSuccessTextPageDownload: string;
  paymentFailedTextPageDownload: string;
  Type: string;
  languageCode: string;
  isEncycom: boolean;
  isPinCodeDownload: boolean;
};

export type GetUiTemplateRequestModel = {
  id: string;
};
export type GetUiTemplateResponseModel = {
  data: UiTemplateModel;
};
export type GetUiTemplateBoothOfflineResponseModel = {
  response: CapitalizedKeys<UiTemplateModel>;
};

export interface UiTemplateStateModel {
  uiTemplate: UiTemplateModel | null;
  loading: boolean;
}
