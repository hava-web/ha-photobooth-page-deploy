import { apiGet } from 'api/request/adminRequest';
import {
  ListFaqRequestModel,
  ListFaqResponseModel,
} from 'models/faq/faq.model';

export function listFaq(payload: ListFaqRequestModel) {
  return apiGet<ListFaqResponseModel>('/general/fa-questions', {
    params: payload,
  });
}
