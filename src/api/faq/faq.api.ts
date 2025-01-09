import adminRequest from 'api/request/adminRequest';
import { PREFIX_API } from 'constants/api.const';
import { preprocessGetQuery } from 'helpers/api.helper';
import {
  ListFaqRequestModel,
  ListFaqResponseModel,
} from 'models/faq/faq.model';

export function listFaq(payload: ListFaqRequestModel) {
  return adminRequest.get<ListFaqResponseModel, ListFaqResponseModel>(
    `${PREFIX_API.API}/fa-questions?${preprocessGetQuery(payload)}`,
  );
}
