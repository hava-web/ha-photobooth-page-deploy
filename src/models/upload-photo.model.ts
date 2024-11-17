export type UploadPrintingPhotoRequestModel = {
  boothCode: string;
  transaction: string;
  images: Array<File>;
};
export type UploadPrintingPhotoResponseModel = {
  data: boolean;
};

export interface DownloadDataStateModel {
  loading: boolean;
}
