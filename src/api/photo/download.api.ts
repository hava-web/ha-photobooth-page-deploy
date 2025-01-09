import adminRequest from 'api/request/adminRequest';
import {
  GetDownloadDataRequestModel,
  GetDownloadDataResponseModel,
} from 'models/download.model';

export function getDownloadData(payload: GetDownloadDataRequestModel) {
  return adminRequest.get<
    GetDownloadDataResponseModel,
    GetDownloadDataResponseModel
  >(`/general/transactions/${payload?.id}/resources`);
}
