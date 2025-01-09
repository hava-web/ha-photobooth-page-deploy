import { DListResponse } from 'models/common.model';

export type FaqModel = {
  id: number;
  question: string;
  answer: string;
  orderNo?: string;
  isActive?: boolean;
};

export type ListFaqRequestModel = {
  pageIndex?: number;
  pageSize?: number;
  name?: string;
  isActive?: boolean | null;
  faqCategoryId?: number;
  orderByName?: string;
  orderByType?: string;
};
export type ListFaqResponseModel = DListResponse<FaqModel>;

export interface FaqStateModel {
  faqListData: DListResponse<FaqModel> | null;
  faqDetail: FaqModel | null;

  loadingList: boolean;
  loadingDetail: boolean;
}
