import { DObject } from 'models/common.model';

export type DownloadModel = {
  isExpired: boolean;
  hasVideo: boolean;
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
  loading: boolean;
}
