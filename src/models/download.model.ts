import { CustomizeUIModel } from './common.model';

export type ItemResource = {
  contentType: string;
  url: string;
};

export type DownloadModel = {
  device: string;
  isExpired: boolean;
  hasVideo: boolean;
  recordAt: string;
  resources: ItemResource[];
};

export type LanguageModel = {
  id: number;
  code: string;
  imageUrl: string;
  name: string;
  isActive: boolean;
};

export type LanguageResponse = {
  items: LanguageModel[];
  totalItems: number;
};

export type GetDownloadDataRequestModel = {
  id: string;
  pinCodeDownload: string;
};
export type GetLanguageDataRequestModel = {
  pageSize?: number;
  pageIndex?: number;
};
export type GetDownloadDataResponseModel = {
  data: DownloadModel;
};
export type GetDownloadDataBoothOfflineResponseModel = {
  Code: number;
  Data: {
    ContentType: string;
    Url: string;
  }[];
};

export interface DownloadDataStateModel {
  transactionId: string;
  downloadData: DownloadModel | null;
  errorData: any;
  appTheme: CustomizeUIModel;
  loading: boolean;
}
