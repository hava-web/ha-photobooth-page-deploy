import adminRequest from 'api/request/adminRequest';
import { map } from 'lodash';
import { preprocessGetQuery } from 'helpers/api.helper';

import {
  GetDownloadDataBoothOfflineResponseModel,
  GetDownloadDataRequestModel,
  GetDownloadDataResponseModel,
  GetLanguageDataRequestModel,
} from 'models/download.model';

export function getDownloadData(payload: GetDownloadDataRequestModel) {
  return adminRequest.get<
    GetDownloadDataResponseModel,
    GetDownloadDataResponseModel
  >(`/general/transactions/${payload?.id}/resources`, {
    params: {
      transactionId: payload?.id,
      pinCodeDownload: payload?.pinCodeDownload,
    },
  });
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

export function getLanguagesData(payload: GetLanguageDataRequestModel) {
  return adminRequest.get<
    GetDownloadDataResponseModel,
    GetDownloadDataResponseModel
  >(`/general/languages?${preprocessGetQuery(payload)}`);
}
