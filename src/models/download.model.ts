import { CustomizeUIModel } from './common.model';

export type DownloadModel = {
  device: string;
  isExpired: boolean;
  hasVideo: boolean;
  recordAt: string;
  resources: [
    {
      contentType: string;
      url: string;
    },
    {
      contentType: string;
      url: string;
    },
  ];
};

export type GetDownloadDataRequestModel = {
  id: string;
};
export type GetDownloadDataResponseModel = {
  data: DownloadModel;
};

export interface DownloadDataStateModel {
  downloadData: DownloadModel | null;
  errorData: any;
  appTheme: CustomizeUIModel;
  loading: boolean;
}
