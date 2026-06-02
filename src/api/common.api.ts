import { saveAs } from 'file-saver';
import { FILE_NAME_DOWNLOAD } from 'constants/file.const';
import { isEmpty, size } from 'lodash';

export async function downloadFile(
  fileUrl: string | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!fileUrl) return;
  try {
    await fetch(fileUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, max-age=0',
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, displayName);
      });
  } catch {
    //
  }
}

export async function downloadSequential(
  urls: string[],
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!size(urls)) return;

  const files: File[] = await Promise.all(
    urls.map(async (url, i) => {
      try {
        const res = await fetch(url, {
          headers: { 'Cache-Control': 'no-cache, no-store, max-age=0' },
        });
        const blob = await res.blob();
        const ext = url.split('?')[0].split('.').pop() || 'jpg';
        const mimeType = blob.type || `resource/${ext}`;
        const safeName = (displayName || FILE_NAME_DOWNLOAD).replace(
          /\.[^/.]+$/,
          '',
        );
        const uniqueSuffix = `${Date.now()}_${i + 1}_${Math.random()
          .toString(36)
          .slice(2, 8)}`;
        const fileName = `${safeName}_${uniqueSuffix}.${ext}`;
        return new File([blob], fileName, { type: mimeType });
      } catch {
        return null;
      }
    }),
  ).then((results) => results.filter((f): f is File => f !== null));

  if (!size(files)) return;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS && navigator.canShare && navigator.canShare({ files })) {
    try {
      await navigator.share({ files, title: displayName });
      return;
    } catch {
      //
    }
  }

  // Fallback: download each image individually
  files.forEach((file) => saveAs(file, file.name));
}

export async function downloadFiles(
  fileUrl: string[] | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!isEmpty(fileUrl)) {
    try {
      for (let index = 0; index < size(fileUrl); index++) {
        if (!fileUrl?.[index]) continue;

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
