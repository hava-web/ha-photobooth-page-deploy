import { apiGet } from 'api/request/adminRequest';
import { buildApiAssetUrl } from 'api/request/apiUrl';
import { lowerFirst, mapKeys } from 'lodash';
import {
  GetUiTemplateBoothOfflineResponseModel,
  GetUiTemplateRequestModel,
  GetUiTemplateResponseModel,
} from 'models/ui-template/ui-template.model';

export function getUiTemplate(payload: GetUiTemplateRequestModel) {
  return apiGet<GetUiTemplateResponseModel>(
    `/general/ui-template-booths/${payload?.id}/page-download`,
  );
}

export function getUiTemplateBoothOffline() {
  return apiGet<GetUiTemplateBoothOfflineResponseModel>(
    '/api/ui-template-booths/page-download',
  ).then((res) => ({
    data: {
      ...mapKeys(res?.response, (value, key) => lowerFirst(key)),
      logoImageUrl: buildApiAssetUrl(res?.response?.LogoImageUrl),
      backgroundImageUrl: buildApiAssetUrl(res?.response?.BackgroundImageUrl),
      backgroundPageDownload: buildApiAssetUrl(
        res?.response?.BackgroundPageDownload,
      ),
    },
  }));
}
