import {
  GetDownloadDataRequestModel,
  GetDownloadDataResponseModel,
} from 'models/download.model';
import downloadRequest from 'api/request/downloadRequest';

export function getDownloadData(payload: GetDownloadDataRequestModel) {
  return downloadRequest.get<
    GetDownloadDataResponseModel,
    GetDownloadDataResponseModel
  >(`/general/transaction/${payload?.id}/resources`);
}
