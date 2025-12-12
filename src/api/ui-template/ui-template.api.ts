import adminRequest from 'api/request/adminRequest';
import { lowerFirst, mapKeys } from 'lodash';
import {
  GetUiTemplateBoothOfflineResponseModel,
  GetUiTemplateRequestModel,
  GetUiTemplateResponseModel,
} from 'models/ui-template/ui-template.model';

export function getUiTemplate(payload: GetUiTemplateRequestModel) {
  return adminRequest.get<
    GetUiTemplateResponseModel,
    GetUiTemplateResponseModel
  >(`/general/ui-template-booths/${payload?.id}/page-download`);
}

export function getUiTemplateBoothOffline() {
  return adminRequest
    .get<GetUiTemplateResponseModel, GetUiTemplateBoothOfflineResponseModel>(
      `/api/ui-template-booths/page-download`,
    )
    .then((res) => ({
      data: {
        ...mapKeys(res?.response, (value, key) => lowerFirst(key)),
        logoImageUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}${res?.response?.LogoImageUrl}`,
        backgroundImageUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}${res?.response?.BackgroundImageUrl}`,
        backgroundPageDownload: `${process.env.NEXT_PUBLIC_BASE_API_URL}${res?.response?.BackgroundPageDownload}`,
      },
    }));
}
