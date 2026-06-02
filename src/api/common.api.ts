import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { FILE_NAME_DOWNLOAD } from 'constants/file.const';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, max-age=0',
};

async function fetchNoCacheBlob(fileUrl: string) {
  const response = await fetch(fileUrl, {
    headers: NO_CACHE_HEADERS,
  });

  return response.blob();
}

function getFileExtension(fileUrl: string) {
  return fileUrl.split('?')[0].split('.').pop() || 'jpg';
}

export async function downloadFile(
  fileUrl: string | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!fileUrl) return;

  try {
    const blob = await fetchNoCacheBlob(fileUrl);
    saveAs(blob, displayName);
  } catch {
    //
  }
}

export async function downloadSequential(
  urls: string[],
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!urls.length) return;

  const zip = new JSZip();
  const folder = zip.folder(displayName) ?? zip;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const blob = await fetchNoCacheBlob(url);
      folder.file(`photo_${i + 1}.${getFileExtension(url)}`, blob);
    } catch {
      //
    }
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, `${displayName}.zip`);
}

export async function downloadFiles(
  fileUrl: string[] | undefined,
  displayName: string = FILE_NAME_DOWNLOAD,
) {
  if (!fileUrl?.length) return;

  try {
    for (let index = 0; index < fileUrl.length; index++) {
      const url = fileUrl[index];
      if (url) {
        const blob = await fetchNoCacheBlob(url);
        saveAs(blob, displayName + Date.now());
      }
    }
  } catch {
    //
  }
}

export async function shareLink(fileUrl: string) {
  if (!fileUrl || !navigator.share) return;

  try {
    await navigator.share({
      url: fileUrl,
    });
  } catch {
    //
  }
}
