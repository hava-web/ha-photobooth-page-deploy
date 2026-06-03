import { saveAs } from 'file-saver';
import { FILE_NAME_DOWNLOAD } from 'constants/file.const';
import { isEmpty, size } from 'lodash';

function isShareCancelled(error: unknown) {
  if (!error || typeof error !== 'object') return false;

  const shareError = error as { name?: string; message?: string };
  const name = (shareError.name || '').toLowerCase();
  const message = (shareError.message || '').toLowerCase();

  return (
    name === 'aborterror' ||
    name === 'notallowederror' ||
    message.includes('cancel') ||
    message.includes('dismiss')
  );
}

export async function downloadFile(
  fileUrl: string | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!fileUrl) return;
  try {
    const response = await fetch(fileUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, max-age=0',
      },
    });

    const blob = await response.blob();
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const canUseShareApi =
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      typeof navigator.canShare === 'function';

    if (isIOS && canUseShareApi) {
      const ext =
        blob.type.split('/')[1]?.split(';')[0] ||
        fileUrl.split('?')[0].split('.').pop() ||
        'jpg';
      const safeName =
        displayName.replace(/\.[^/.]+$/, '') || FILE_NAME_DOWNLOAD;
      const file = new File([blob], `${safeName}.${ext}`, {
        type: blob.type || `image/${ext}`,
      });

      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: displayName });
          return;
        } catch (error) {
          // User cancelled share sheet: do not fallback to auto download.
          if (isShareCancelled(error)) return;
        }
      }
    }

    saveAs(blob, displayName);
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
    } catch (error) {
      // User cancelled share sheet: stop here to avoid triggering many downloads.
      if (isShareCancelled(error)) return;
    }
  }

  // Fallback: pace downloads and pause after each batch of 10 files.
  const FILES_PER_BATCH = 10;
  const BETWEEN_FILE_DELAY_MS = 220;
  const BETWEEN_BATCH_DELAY_MS = 1800;

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    saveAs(file, file.name);

    const isLastFile = index === files.length - 1;
    const isBatchBoundary = (index + 1) % FILES_PER_BATCH === 0;

    if (!isLastFile) {
      if (isBatchBoundary) {
        await new Promise((resolve) =>
          setTimeout(resolve, BETWEEN_BATCH_DELAY_MS),
        );
      } else {
        await new Promise((resolve) =>
          setTimeout(resolve, BETWEEN_FILE_DELAY_MS),
        );
      }
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
