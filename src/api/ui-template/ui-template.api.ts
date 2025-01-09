import adminRequest from 'api/request/adminRequest';
import {
  GetUiTemplateRequestModel,
  GetUiTemplateResponseModel,
} from 'models/ui-template/ui-template.model';

export function getUiTemplate(payload: GetUiTemplateRequestModel) {
  return adminRequest.get<
    GetUiTemplateResponseModel,
    GetUiTemplateResponseModel
  >(`/general/ui-template-booths/${payload?.id}/page-download`);
}
