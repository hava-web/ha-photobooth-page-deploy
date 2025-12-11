import adminRequest from 'api/request/adminRequest';
import { map } from 'lodash';
import {
  GetDownloadDataBoothOfflineResponseModel,
  GetDownloadDataRequestModel,
  GetDownloadDataResponseModel,
} from 'models/download.model';

export function getDownloadData(payload: GetDownloadDataRequestModel) {
  return adminRequest.get<
    GetDownloadDataResponseModel,
    GetDownloadDataResponseModel
  >(`/general/transactions/${payload?.id}/resources`);
}

export function getDownloadDataBoothOffline(
  payload: GetDownloadDataRequestModel,
) {
  return adminRequest
    .get<
      GetDownloadDataResponseModel,
      GetDownloadDataBoothOfflineResponseModel
    >(`/api/transaction/get-resource?transactionId=${payload?.id}`)
    .then((res) => ({
      data: {
        isExpired: false,
        hasVideo: false,
        resources: map(res?.Data, (o) => ({
          contentType: o?.ContentType,
          url: `${process.env.NEXT_PUBLIC_BASE_API_URL}${o?.Url}`,
        })),
      },
    }));
}
