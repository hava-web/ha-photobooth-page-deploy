import downloadRequest from 'api/request/downloadRequest';
import {
  GetUiTemplateRequestModel,
  GetUiTemplateResponseModel,
} from 'models/ui-template/ui-template.model';

export function getUiTemplate(payload: GetUiTemplateRequestModel) {
  return downloadRequest.get<
    GetUiTemplateResponseModel,
    GetUiTemplateResponseModel
  >(`/general/ui-template-booths/${payload?.id}/page-download`);
}
