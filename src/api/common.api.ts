import { saveAs } from 'file-saver';
import {
  BETWEEN_BATCH_DELAY_MS,
  BETWEEN_FILE_DELAY_MS,
  FILES_PER_BATCH,
  IOS_IMAGE_BATCH_SIZE,
  MAX_FETCH_RETRY,
  FETCH_RETRY_DELAY_MS,
} from 'constants/api.const';
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

/** Fetch a single URL into a named File, retrying on transient failures. */
async function fetchFileWithRetry(
  url: string,
  index: number,
  displayName: string,
): Promise<File | null> {
  for (let attempt = 0; attempt < MAX_FETCH_RETRY; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'Cache-Control': 'no-cache, no-store, max-age=0' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const ext =
        (blob.type && blob.type !== 'application/octet-stream'
          ? blob.type.split('/')[1]?.split(';')[0]
          : undefined) ||
        url.split('?')[0].split('.').pop() ||
        'jpg';
      const mimeType = blob.type || `resource/${ext}`;
      const safeName = (displayName || FILE_NAME_DOWNLOAD).replace(
        /\.[^/.]+$/,
        '',
      );
      const uniqueSuffix = `${Date.now()}_${index + 1}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      return new File([blob], `${safeName}_${uniqueSuffix}.${ext}`, {
        type: mimeType,
      });
    } catch {
      if (attempt < MAX_FETCH_RETRY - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, FETCH_RETRY_DELAY_MS * (attempt + 1)),
        );
      }
    }
  }
  return null;
}

/** iOS-specific: share videos 1-at-a-time and images in batches of IOS_IMAGE_BATCH_SIZE. */
async function downloadSequentialIOS(
  urls: string[],
  displayName: string,
): Promise<void> {
  const videoExtensions = new Set(['mp4', 'mov', 'avi', 'webm', 'm4v']);

  const isVideoUrl = (url: string) => {
    const ext = (url.split('?')[0].split('.').pop() || '').toLowerCase();
    return videoExtensions.has(ext);
  };

  // Build batches: videos are always alone; images are grouped up to IOS_IMAGE_BATCH_SIZE
  const batches: string[][] = [];
  let imageBatch: string[] = [];

  for (const url of urls) {
    if (isVideoUrl(url)) {
      if (imageBatch.length > 0) {
        for (let i = 0; i < imageBatch.length; i += IOS_IMAGE_BATCH_SIZE) {
          batches.push(imageBatch.slice(i, i + IOS_IMAGE_BATCH_SIZE));
        }
        imageBatch = [];
      }
      batches.push([url]);
    } else {
      imageBatch.push(url);
    }
  }
  if (imageBatch.length > 0) {
    for (let i = 0; i < imageBatch.length; i += IOS_IMAGE_BATCH_SIZE) {
      batches.push(imageBatch.slice(i, i + IOS_IMAGE_BATCH_SIZE));
    }
  }

  let baseIndex = 0;
  for (const batch of batches) {
    const files: File[] = [];

    for (let i = 0; i < batch.length; i++) {
      const file = await fetchFileWithRetry(
        batch[i],
        baseIndex + i,
        displayName,
      );
      if (file) files.push(file);
    }
    baseIndex += batch.length;

    if (files.length === 0) continue;

    if (navigator.canShare({ files })) {
      try {
        await navigator.share({ files, title: displayName });
      } catch (error) {
        if (isShareCancelled(error)) return;
        // Share failed (e.g. batch still too large) — fall back to one file at a time
        for (const file of files) {
          if (!navigator.canShare({ files: [file] })) continue;
          try {
            await navigator.share({ files: [file], title: displayName });
          } catch (err) {
            if (isShareCancelled(err)) return;
          }
        }
      }
    }
  }
}

export async function downloadSequential(
  urls: string[],
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!size(urls)) return;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const canShare =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function';

  // iOS: use type-aware sequential sharing instead of one giant share call
  if (isIOS && canShare) {
    await downloadSequentialIOS(urls, displayName);
    return;
  }

  // Non-iOS: fetch sequentially (avoids Cloudflare rate-limiting from parallel requests)
  // and save with staggered delays so the browser doesn't drop downloads.
  for (let index = 0; index < urls.length; index++) {
    const file = await fetchFileWithRetry(urls[index], index, displayName);
    if (!file) continue;

    saveAs(file, file.name);

    const isLastFile = index === urls.length - 1;
    const isBatchBoundary = (index + 1) % FILES_PER_BATCH === 0;

    if (!isLastFile) {
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          isBatchBoundary ? BETWEEN_BATCH_DELAY_MS : BETWEEN_FILE_DELAY_MS,
        ),
      );
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
