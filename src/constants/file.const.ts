export const MAX_UPLOAD_SIZE_BYTE = 5242880;
export const FILE_NAME_DOWNLOAD = 'File download';
export const FILE_IMAGE_DOWNLOAD = 'fun_image';
export const FILE_VIDEO_DOWNLOAD = 'fun_video';
export const FILE_GIF_DOWNLOAD = 'fun_gif';
export const CONTENT_TYPES = {
  PNG: 'image/png',
  MP4: 'video/mp4',
  GIF: 'image/gif',
};
export enum VALIDATE_TYPES {
  OK = 'OK',
  EXCEED_SIZE_FILE = 'EXCEED_SIZE_FILE',
  INVALID_MIME_FILE = 'INVALID_MIME_FILE',
}
