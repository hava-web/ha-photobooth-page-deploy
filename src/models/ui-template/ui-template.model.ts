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
  inputBackgroundColor: string;
  isActive: true;
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
  Type: string;
};

export type GetUiTemplateRequestModel = {
  id: string;
};
export type GetUiTemplateResponseModel = {
  data: UiTemplateModel;
};

export interface UiTemplateStateModel {
  uiTemplate: UiTemplateModel | null;
  loading: boolean;
}
