import { apiGet } from 'api/request/adminRequest';
import { buildApiAssetUrl } from 'api/request/apiUrl';
import { map } from 'lodash';

import {
  GetDownloadDataBoothOfflineResponseModel,
  GetDownloadDataRequestModel,
  GetDownloadDataResponseModel,
  GetLanguageDataRequestModel,
  LanguageResponse,
} from 'models/download.model';

export function getDownloadData(payload: GetDownloadDataRequestModel) {
  return apiGet<GetDownloadDataResponseModel>(
    `/general/transactions/${payload?.id}/resources`,
    {
      params: {
        pinCodeDownload: payload?.pinCodeDownload,
      },
    },
  );
}

export function getDownloadDataBoothOffline(
  payload: GetDownloadDataRequestModel,
) {
  return apiGet<GetDownloadDataBoothOfflineResponseModel>(
    '/api/transaction/get-resource',
    {
      params: {
        transactionId: payload?.id,
      },
    },
  ).then((res) => ({
    data: {
      isExpired: false,
      hasVideo: false,
      resources: map(res?.Data, (o) => ({
        contentType: o?.ContentType,
        url: buildApiAssetUrl(o?.Url),
      })),
    },
  }));
}

export function getLanguagesData(payload: GetLanguageDataRequestModel) {
  return apiGet<{ data: LanguageResponse }>('/general/languages', {
    params: {
      ...payload,
    },
  });
}
