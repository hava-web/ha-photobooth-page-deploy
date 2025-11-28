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

export type GetDownloadDataRequestModel = {
  id: string;
};
export type GetDownloadDataResponseModel = {
  data: DownloadModel;
};

export interface DownloadDataStateModel {
  transactionId: string;
  downloadData: DownloadModel | null;
  errorData: any;
  appTheme: CustomizeUIModel;
  loading: boolean;
}
