import { DObject } from 'models/common.model';

export type DownloadModel = [
  {
    contentType: string;
    url: string;
  },
  {
    contentType: string;
    url: string;
  },
];

export type GetDownloadDataRequestModel = {
  id: string;
};
export type GetDownloadDataResponseModel = {
  data: DownloadModel;
};

export interface DownloadDataStateModel {
  downloadData: DObject<DownloadModel | null>;
  errorData: any;
  loading: boolean;
}
