import { saveAs } from 'file-saver';
import { FILE_NAME_DOWNLOAD } from 'constants/file.const';

export function downloadFile(
  fileUrl: string | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (fileUrl) {
    try {
      fetch(fileUrl, {
        headers: {
          responseType: 'blob',
        },
      })
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, displayName);
        });
    } catch (err) {
      //
    }
  }
}
