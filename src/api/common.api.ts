import { saveAs } from 'file-saver';
import { FILE_NAME_DOWNLOAD } from 'constants/file.const';
import { isEmpty, size } from 'lodash';

export async function downloadFile(
  fileUrl: string | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (fileUrl) {
    try {
      await fetch(fileUrl, {
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

export async function downloadFiles(
  fileUrl: string[] | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!isEmpty(fileUrl)) {
    try {
      for (let index = 0; index < size(fileUrl); index++) {
        // eslint-disable-next-line no-continue
        if (!fileUrl?.[index]) continue;

        // eslint-disable-next-line no-await-in-loop
        await fetch(fileUrl?.[index], {
          headers: {
            responseType: 'blob',
            'Cache-Control': 'no-cache, no-store, max-age=0',
          },
        })
          .then((res) => res.blob())
          .then((blob) => {
            saveAs(blob, displayName + Date.now());
          });
      }
    } catch (err) {
      //
    }
  }
}

export async function shareLink(fileUrl: string) {
  if (fileUrl) {
    try {
      navigator.share({
        url: fileUrl,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
