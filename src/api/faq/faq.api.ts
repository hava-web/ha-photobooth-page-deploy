import adminRequest from 'api/request/adminRequest';
import { preprocessGetQuery } from 'helpers/api.helper';
import {
  ListFaqRequestModel,
  ListFaqResponseModel,
} from 'models/faq/faq.model';

export function listFaq(payload: ListFaqRequestModel) {
  return adminRequest.get<ListFaqResponseModel, ListFaqResponseModel>(
    `/general/fa-questions?${preprocessGetQuery(payload)}`,
  );
}
