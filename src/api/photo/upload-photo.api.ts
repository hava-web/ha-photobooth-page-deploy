import downloadRequest from 'api/request/downloadRequest';
import { getFormData } from 'helpers/file.helper';
import {
  UploadPrintingPhotoRequestModel,
  UploadPrintingPhotoResponseModel,
} from 'models/upload-photo.model';

export function uploadPrintingPhoto(payload: UploadPrintingPhotoRequestModel) {
  const formDataPayload = getFormData(payload);

  return downloadRequest.post<
    UploadPrintingPhotoResponseModel,
    UploadPrintingPhotoResponseModel
  >(`/general/printing`, formDataPayload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
