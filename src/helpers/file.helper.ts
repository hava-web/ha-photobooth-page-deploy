import { MAX_UPLOAD_SIZE_BYTE, VALIDATE_TYPES } from 'constants/file.const';
import { round, toLower, toUpper } from 'lodash';
import { DragEvent } from 'react';
import { isNumberable } from './math.helper';

interface Data {
  [key: string]: any;
}

export function convertToFormData(
  formData: FormData,
  data: Data,
  parentKey: any = undefined,
) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      let dataKey = !isNumberable(key as any)
        ? `${parentKey}.${key}`
        : `${parentKey}[${key}]`;
      if (data[key] instanceof File) {
        dataKey = parentKey;
      }
      convertToFormData(formData, data[key], parentKey ? dataKey : key);
    });
  } else {
    const value: any = data ?? '';

    formData.append(parentKey, value);
  }
}

export function getFormData(data: Data) {
  const formData = new FormData();
  convertToFormData(formData, data);

  return formData;
}

function getFileSizeToString(fileSize: number) {
  if (fileSize / 1024 / 1024 > 0.1) {
    return `${round(fileSize / 1024 / 1024, 2)} MB`;
  }
  if (fileSize / 1024 > 0.1) {
    return `${round(fileSize / 1024, 2)} KB`;
  }
  return `${fileSize} B`;
}

function checkFileSize(
  file: File | Array<File> | null,
  maxSizeByte = MAX_UPLOAD_SIZE_BYTE,
): VALIDATE_TYPES {
  if (Array.isArray(file)) {
    for (let i = 0; i < file.length; i++) {
      if (file[i].size > maxSizeByte) {
        return VALIDATE_TYPES.EXCEED_SIZE_FILE;
      }
    }
  } else if (file && file?.size > maxSizeByte) {
    return VALIDATE_TYPES.EXCEED_SIZE_FILE;
  }

  return VALIDATE_TYPES.OK;
}

function getFileExtension(name: string = '') {
  const index = name.lastIndexOf('.');
  if (index > 0) {
    return name.slice(index);
  }
  return '';
}

/**
 * Check valid file extension
 *
 * @category string, number
 * @param Event e => event of file input change
 * @param string accept => image/* | .xlsx,.xls,.csv
 */
function checkValidExtensionOfFileEvent(
  e: DragEvent,
  accept: string = '*',
): VALIDATE_TYPES {
  const file: File = e.dataTransfer
    ? e.dataTransfer.files[0]
    : (e.target as any)?.files?.[0];
  if (file) {
    if (accept && accept !== '*') {
      const acceptTypes = accept.split(/\s*,\s*/).map((item) => {
        const index = item.lastIndexOf('/');
        if (index > 0) {
          return item.slice(index).replace('/', '.');
        }
        return item;
      });
      const testReg = new RegExp(
        `^${acceptTypes
          .map((item) => `(${item.replace('+', '\\+').replace('*', '.+')})`)
          .join('|')}$`,
        'g',
      );
      const fileExtension = ((name: string) => {
        const index = name.lastIndexOf('.');
        if (index > 0) {
          return toLower(name.slice(index));
        }
        return '';
      })(file.name);
      if (
        !testReg.test(file.type) &&
        !acceptTypes.find((type) =>
          toUpper(type).includes(toUpper(fileExtension)),
        )
      ) {
        return VALIDATE_TYPES.INVALID_MIME_FILE;
      }
    }
  }

  return VALIDATE_TYPES.OK;
}

/**
 * Check valid file extension
 *
 * @category string, number
 * @param Event e => event of file input change
 * @param string accept => image/* | .xlsx,.xls,.csv
 */
function checkValidExtensionOfMultiFileEvent(
  e: DragEvent,
  accept: string = '*',
): VALIDATE_TYPES {
  const list: FileList = e.dataTransfer
    ? e.dataTransfer.files
    : (e.target as any)?.files;
  const file: Array<File> = [];
  for (let i = 0; i < list.length; i++) {
    file.push(list[i]);
  }
  if (file && file.length) {
    if (accept && !accept.includes('*')) {
      const acceptTypes = accept.split(/\s*,\s*/).map((item) => {
        const index = item.lastIndexOf('/');
        if (index > 0) {
          return item.slice(index).replace('/', '.');
        }
        return item;
      });
      const testReg = new RegExp(
        `^${acceptTypes
          .map((item) => `(${item.replace('+', '\\+').replace('*', '.+')})`)
          .join('|')}$`,
        'g',
      );

      for (let i = 0; i < file.length; i++) {
        const fileExtension = getFileExtension(file[i].name);
        if (
          !testReg.test(file[i].type) &&
          !acceptTypes.find((type) =>
            toUpper(type).includes(toUpper(fileExtension)),
          )
        ) {
          return VALIDATE_TYPES.INVALID_MIME_FILE;
        }
      }
    }
  }

  return VALIDATE_TYPES.OK;
}

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  // eslint-disable-next-line no-bitwise
  for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

function downloadFileByBase64(
  text: string | undefined,
  fileName: string = 'fileName',
) {
  if (!text) return;

  const blob = new Blob([s2ab(atob(text))], {
    type: '',
  });

  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ['', a.download, a.href].join(':');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

export {
  downloadFileByBase64,
  getFileSizeToString,
  checkFileSize,
  checkValidExtensionOfFileEvent,
  checkValidExtensionOfMultiFileEvent,
};
