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
          'Cache-Control': 'no-cache, no-store, max-age=0',
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
